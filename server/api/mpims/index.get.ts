import { mongo } from '~/server/utils/mongo'
import type { Channel } from '~~/types/Channel'

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid)
  const channels = await db
    .collection<Channel>('mpims')
    .find()
    .sort({ name: 1 })
    .toArray()

  return channels
})
