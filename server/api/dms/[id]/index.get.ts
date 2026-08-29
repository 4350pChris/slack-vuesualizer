import { mongo } from '~~/server/utils/mongo'
import type { Dm } from '~/types/Dm'

export default defineEventHandler(async (event) => {
  const idParam = event.context.params?.id
  if (!idParam)
    throw createError({ statusCode: 400, statusMessage: 'Direct message ID is required' })

  const _id = decodeURIComponent(idParam)
  const db = await mongo(event.context.mongouuid)
  const dm = await db.collection<Dm>('dms').findOne({ _id })

  if (!dm)
    throw createError({ statusCode: 404, statusMessage: 'Dm not found' })

  return { ...dm, name: dm.id }
})
