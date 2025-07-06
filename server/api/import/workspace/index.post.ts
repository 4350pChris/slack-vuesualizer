import { randomUUID } from 'node:crypto'
import type { Db } from 'mongodb'
import { mongo } from '~/server/utils/mongo'
import type { ApiMessage } from '~~/types/Message'

interface DataIn {
  name: string
  data: any[]
}

const createDb = async (db: Db) => {
  const msgCol = db.collection<ApiMessage>('messages')
  await msgCol.createIndex({ text: 'text' }, { default_language: 'german', language_override: 'language_override' })
  await msgCol.createIndex({ channel: 1 })
  await msgCol.createIndex({ user: 1, ts: 1 })
}

export default defineEventHandler(async (event) => {
  // prepare by creating db and indices
  const uuid = randomUUID()
  const db = await mongo(uuid)

  try {
    await createDb(db)
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
