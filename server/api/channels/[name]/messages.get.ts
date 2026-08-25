import { mongo } from '~/server/utils/mongo'
import { ObjectId } from 'mongodb'
import type { Message } from '~/types/Message'

type Cursor = { orderTs: string; id: string }
const pageSize = 100

const decodeCursor = (value: string): Cursor | undefined => {
  try {
    const cursor = JSON.parse(Buffer.from(value, 'base64url').toString()) as Cursor
    return cursor.orderTs && cursor.id ? cursor : undefined
  }
  catch {
    return undefined
  }
}

const encodeCursor = (message: Message) =>
  Buffer.from(JSON.stringify({ orderTs: message.orderTs, id: message._id.toString() })).toString('base64url')

export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params!.name)
  const { before, after, around, at } = getQuery(event)
  if (before && after)
    throw createError({ statusCode: 400, statusMessage: 'Use one cursor direction' })

  const db = await mongo(event.context.mongouuid)
  const cursor = before ? decodeCursor(before.toString()) : undefined
  const afterCursor = after ? decodeCursor(after.toString()) : undefined
  const cursorId = cursor && (ObjectId.isValid(cursor.id) ? new ObjectId(cursor.id) : cursor.id)
  const afterCursorId = afterCursor && (ObjectId.isValid(afterCursor.id) ? new ObjectId(afterCursor.id) : afterCursor.id)
  const target = around ?? at
  const targetMessage = around
    ? await db.collection<Message>('messages').findOne({ channel, ts: around.toString() })
    : undefined
  const targetRootTs = targetMessage?.threadRootTs ?? target?.toString()
  const targetOrderTs = targetRootTs && `${targetRootTs.split('.')[0].padStart(12, '0')}${(targetRootTs.split('.')[1] ?? '').padEnd(6, '0').slice(0, 6)}`
  const filter = {
    channel,
    isThreadReply: false,
    ...(afterCursor
      ? {
          $or: [
            { orderTs: { $gt: afterCursor.orderTs } },
            { orderTs: afterCursor.orderTs, _id: { $gt: afterCursorId } },
          ],
        }
      : cursor
      ? {
          $or: [
            { orderTs: { $lt: cursor.orderTs } },
            { orderTs: cursor.orderTs, _id: { $lt: cursorId } },
          ],
        }
      : targetOrderTs ? { orderTs: { $lte: targetOrderTs } } : {}),
  }
  const [roots, metadata, targetHasNewer] = await Promise.all([
    db
      .collection<Message>('messages')
      .find(filter)
      .sort(after ? { orderTs: 1, _id: 1 } : { orderTs: -1, _id: -1 })
      .limit(pageSize + 1)
      .toArray(),
    before || after
      ? undefined
      : Promise.all([
          db.collection<Message>('messages').countDocuments({ channel }),
          db.collection<Message>('messages').find({ channel }).sort({ orderTs: 1 }).limit(1).next(),
          db.collection<Message>('messages').find({ channel }).sort({ orderTs: -1 }).limit(1).next(),
        ]),
    targetRootTs && !before && !after
      ? db.collection<Message>('messages').find({
          channel,
          isThreadReply: false,
          orderTs: { $gt: targetOrderTs },
        }).hasNext()
      : false,
  ])

  const hasOlder = after ? true : roots.length > pageSize
  const hasNewer = before ? true : after ? roots.length > pageSize : targetHasNewer
  roots.splice(pageSize)
  if (!after)
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
      .sort({ orderTs: 1 })
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
    olderCursor: hasOlder ? encodeCursor(roots[0]) : undefined,
    newerCursor: hasNewer ? encodeCursor(roots.at(-1)!) : undefined,
  }
})
