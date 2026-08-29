import { mongo } from '~~/server/utils/mongo'
import { prepareMessages } from '~~/server/utils/importMessages'
import type { Message } from '~/types/Message'

export default defineEventHandler(async (event) => {
  const channelParam = event.context.params?.channel
  if (!channelParam)
    throw createError({ statusCode: 400, statusMessage: 'Channel name is required' })

  const channel = decodeURIComponent(channelParam)
  const db = await mongo(event.context.mongouuid)
  const { data } = await readBody<{ data: any[] }>(event)

  await db
    .collection<Message>('messages')
    .insertMany(prepareMessages(channel, data))

  event.node.res.statusCode = 201
  return 'ok'
})
