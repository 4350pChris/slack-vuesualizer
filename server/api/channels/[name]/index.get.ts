import { mongo } from '~~/server/utils/mongo'
import type { Channel } from '~/types/Channel'

export default defineEventHandler(async (event) => {
  const nameParam = event.context.params?.name
  if (!nameParam)
    throw createError({ statusCode: 400, statusMessage: 'Channel name is required' })

  const name = decodeURIComponent(nameParam)
  const db = await mongo(event.context.mongouuid)
  const channel = await db.collection<Channel>('channels').findOne({ name })

  if (!channel)
    throw createError({ statusCode: 404, statusMessage: 'Channel not found' })

  return channel
})
