import { mongo } from '~/server/utils/mongo'
import type { Channel } from '~/types/Channel'

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name)
  const db = await mongo(event.context.mongouuid)
  const channel = await db.collection<Channel>('channels').findOne({ name })

  if (!channel)
    createError({ statusCode: 404, statusMessage: 'Channel not found' })

  return channel
})
