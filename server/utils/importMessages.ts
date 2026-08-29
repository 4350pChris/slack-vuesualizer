import type { Db } from 'mongodb'
import type { ApiMessage, Message } from '~/types/Message'

export const createMessageIndexes = (db: Db) => {
  const messages = db.collection<ApiMessage>('messages')
  return Promise.all([
    messages.createIndex({ text: 'text' }, { default_language: 'german', language_override: 'language_override' }),
    messages.createIndex({ channel: 1, orderTs: 1 }),
    messages.createIndex({ channel: 1, ts: 1 }),
    messages.createIndex({ channel: 1, isThreadReply: 1, orderTs: 1, _id: 1 }),
    messages.createIndex({ channel: 1, threadRootTs: 1, orderTs: 1 }),
  ])
}

const toOrderTs = (ts: string) => {
  const [seconds = '', fraction = ''] = ts.split('.')
  return `${seconds.padStart(12, '0')}${fraction.padEnd(6, '0').slice(0, 6)}`
}

export const prepareMessages = (channel: string, data: any[]): Message[] => data.map((entry) => {
  const message = { ...entry, channel } as ApiMessage
  const threadRootTs = message.thread_ts ?? message.ts
  return {
    ...message,
    threadRootTs,
    isThreadReply: threadRootTs !== message.ts,
    orderTs: toOrderTs(message.ts),
  }
})
