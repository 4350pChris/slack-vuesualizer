import { mongo } from '~/server/utils/mongo'
import normalizeMessages from '~/server/utils/normalizeMessages'
import type { Message } from '~/types/Message'

export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params!.name)
  const db = await mongo(event.context.mongouuid)
  const messages = await db
    .collection<Message>('messages')
    .find({ channel })
    .sort({ ts: 1 })
    .toArray()

  return normalizeMessages(messages)
})
