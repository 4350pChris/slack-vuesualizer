import { mongo } from '~/server/utils/mongo'
import type { Message } from '~/types/Message'

export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params!.name)
  const { before, around, at } = getQuery(event)
  const db = await mongo(event.context.mongouuid)
  const target = around ?? at
  const targetMessage = around
    ? await db.collection<Message>('messages').findOne({ channel, ts: around.toString() })
    : undefined
  const targetRootTs = targetMessage?.threadRootTs ?? targetMessage?.thread_ts ?? target?.toString()
  const filter = {
    channel,
    isThreadReply: false,
    ...(before ? { ts: { $lt: before.toString() } } : targetRootTs ? { ts: { $lte: targetRootTs } } : {}),
  }
  const [roots, metadata] = await Promise.all([
    db
      .collection<Message>('messages')
      .find(filter)
      .sort({ ts: -1 })
      .limit(100)
      .toArray(),
    before
      ? undefined
      : Promise.all([
          db.collection<Message>('messages').countDocuments({ channel }),
          db.collection<Message>('messages').find({ channel }).sort({ ts: 1 }).limit(1).next(),
          db.collection<Message>('messages').find({ channel }).sort({ ts: -1 }).limit(1).next(),
        ]),
  ])

  roots.reverse()
  const replies = roots.length === 0
    ? []
    : await db
      .collection<Message>('messages')
      .find({
        channel,
        isThreadReply: true,
        threadRootTs: { $in: roots.map(message => message.ts) },
      })
      .sort({ ts: 1 })
      .toArray()
  const repliesByRoot = Map.groupBy(replies, reply => reply.threadRootTs!)
  const messages = roots.flatMap((root) => {
    const threadReplies = repliesByRoot.get(root.ts) ?? []
    return [
      root,
      ...threadReplies.map((reply, index) => ({
        ...reply,
        reply: true,
        last_reply: index === threadReplies.length - 1,
      })),
    ]
  })

  return {
    messages,
    count: metadata?.[0],
    minTs: metadata?.[1]?.ts,
    maxTs: metadata?.[2]?.ts,
    nextCursor: roots.length === 100 ? roots[0].ts : undefined,
  }
})
