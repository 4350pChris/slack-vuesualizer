import { mongo } from '~~/server/utils/mongo'
import type { Channel } from '~/types/Channel'

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id
  if (!idParam)
    throw createError({ statusCode: 400, statusMessage: 'Private messaging group ID is required' })

  const id = decodeURIComponent(idParam)
  const db = await mongo(event.context.mongouuid)
  const channel = await db.collection<Channel>('mpims').findOne({ id })

  if (!channel)
    throw createError({ statusCode: 404, statusMessage: 'Private messageing group not found' })

  return channel
})
