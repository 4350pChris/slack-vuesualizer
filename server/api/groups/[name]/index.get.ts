import { mongo } from '~/server/utils/mongo'
import type { Channel } from '~/types/Channel'

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params!.name)
  const db = await mongo(event.context.mongouuid)
  const channel = await db.collection<Channel>('groups').findOne({ name })

  if (!channel)
    throw createError({ statusCode: 404, statusMessage: 'Group not found' })

  return channel
})
