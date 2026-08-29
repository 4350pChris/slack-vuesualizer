import { mongo } from '~~/server/utils/mongo'
import type { Channel } from '~/types/Channel'

export default defineEventHandler(async (event) => {
  const nameParam = event.context.params?.name
  if (!nameParam)
    throw createError({ statusCode: 400, statusMessage: 'Group name is required' })

  const name = decodeURIComponent(nameParam)
  const db = await mongo(event.context.mongouuid)
  const channel = await db.collection<Channel>('groups').findOne({ name })

  if (!channel)
    throw createError({ statusCode: 404, statusMessage: 'Group not found' })

  return channel
})
