export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid)

  await db.dropDatabase()

  event.node.res.statusCode = 204

  return ''
})
