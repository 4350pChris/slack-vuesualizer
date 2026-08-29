import { mongo } from '~~/server/utils/mongo'
import type { ApiMessage, Message } from '~/types/Message'

const orderTs = (ts: string) => {
  const [seconds = '', fraction = ''] = ts.split('.')
  return `${seconds.padStart(12, '0')}${fraction.padEnd(6, '0').slice(0, 6)}`
}

export default defineEventHandler(async (event) => {
  const channelParam = event.context.params?.channel
  if (!channelParam)
    throw createError({ statusCode: 400, statusMessage: 'Channel name is required' })

  const channel = decodeURIComponent(channelParam)
  const db = await mongo(event.context.mongouuid)
  const { data } = await readBody<{ data: any[] }>(event)

  await db
    .collection<Message>('messages')
    .insertMany(data.map((entry) => {
      const message = { ...entry, channel } as ApiMessage
      const threadRootTs = message.thread_ts ?? message.ts
      return {
        ...message,
        threadRootTs,
        isThreadReply: threadRootTs !== message.ts,
        orderTs: orderTs(message.ts),
      }
    }))

  event.node.res.statusCode = 201
  return 'ok'
})
