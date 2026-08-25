import { mongo } from '~~/server/utils/mongo'
import { ObjectId } from 'mongodb'
import type { Message } from '~/types/Message'

type Cursor = { orderTs: string; id: string }
const pageSize = 100
const pageHalf = pageSize / 2

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
  const isAnchor = Boolean(targetOrderTs && !before && !after)
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
      : {}),
  }
  const rootResult = isAnchor
    ? Promise.all([
        db.collection<Message>('messages')
          .find({ channel, isThreadReply: false, orderTs: { $lte: targetOrderTs } })
          .sort({ orderTs: -1, _id: -1 })
          .limit(pageHalf + 1)
          .toArray(),
        db.collection<Message>('messages')
          .find({ channel, isThreadReply: false, orderTs: { $gt: targetOrderTs } })
          .sort({ orderTs: 1, _id: 1 })
          .limit(pageHalf + 1)
          .toArray(),
      ])
    : db.collection<Message>('messages')
      .find(filter)
      .sort(after ? { orderTs: 1, _id: 1 } : { orderTs: -1, _id: -1 })
      .limit(pageSize + 1)
      .toArray()
  const [rootData, metadata] = await Promise.all([
    rootResult,
    before || after
      ? undefined
      : Promise.all([
          db.collection<Message>('messages').countDocuments({ channel }),
          db.collection<Message>('messages').find({ channel }).sort({ orderTs: 1 }).limit(1).next(),
          db.collection<Message>('messages').find({ channel }).sort({ orderTs: -1 }).limit(1).next(),
        ]),
  ])

  const [olderRoots, newerRoots] = isAnchor ? rootData as [Message[], Message[]] : [undefined, undefined]
  const roots = isAnchor
    ? [...olderRoots!.slice(0, pageHalf).reverse(), ...newerRoots!.slice(0, pageHalf)]
    : rootData as Message[]
  const hasOlder = isAnchor ? olderRoots!.length > pageHalf : after ? true : roots.length > pageSize
  const hasNewer = isAnchor ? newerRoots!.length > pageHalf : before ? true : roots.length > pageSize
  if (!isAnchor) {
    roots.splice(pageSize)
    if (!after)
      roots.reverse()
  }
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
    focusTs: isAnchor ? olderRoots![0]?.ts ?? newerRoots![0]?.ts : undefined,
    olderCursor: hasOlder ? encodeCursor(roots[0]) : undefined,
    newerCursor: hasNewer ? encodeCursor(roots.at(-1)!) : undefined,
  }
})
