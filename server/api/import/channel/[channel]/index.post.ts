import { mongo } from '~~/server/utils/mongo'

export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params.channel)
  const db = await mongo(event.context.mongouuid)
  const { data } = await readBody(event)

  await db
    .collection('messages')
    .insertMany(data.map(entry => ({ ...entry, channel })))

  event.res.statusCode = 201
  return 'ok'
})
