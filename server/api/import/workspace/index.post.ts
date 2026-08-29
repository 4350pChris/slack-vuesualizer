import { randomUUID } from 'node:crypto'
import { mongo } from '~~/server/utils/mongo'
import { createMessageIndexes } from '~~/server/utils/importMessages'

interface DataIn {
  name: string
  data: any[]
}

export default defineEventHandler(async (event) => {
  // prepare by creating db and indices
  const uuid = randomUUID()
  const db = await mongo(uuid)

  try {
    await createMessageIndexes(db)
  } catch (e) {
    console.error('Error creating database:', e)
    // collections are full
    throw createError({
      statusCode: 409,
      statusMessage: 'Database is full',
      cause: e,
    })
  }

  const { data } = await readBody<{ data: DataIn[] }>(event)

  await Promise.all(
    data.map(({ name, data }) => data.length > 0 && db.collection(name).insertMany(data)),
  )

  setCookie(event, 'mongouuid', uuid)

  event.node.res.statusCode = 201
  return {
    uuid,
  }
})
