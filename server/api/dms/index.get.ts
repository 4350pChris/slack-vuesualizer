import { mongo } from '~/server/utils/mongo'
import type { Dm } from '~~/types/Dm'

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid)
  const dms = await db
    .collection<Dm>('dms')
    .find()
    .map(dm => ({
      ...dm,
      name: dm.id
    }))
    .toArray()

  return dms
})
