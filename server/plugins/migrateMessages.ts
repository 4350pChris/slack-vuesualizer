import { fullClient } from '~/server/utils/mongo'

const systemDatabases = new Set(['admin', 'config', 'local'])

export default defineNitroPlugin(async () => {
  const client = await fullClient()
  const { databases } = await client.db().admin().listDatabases({ nameOnly: true })
  await Promise.all(
    databases
      .filter(({ name }) => !systemDatabases.has(name))
      .map(async ({ name }) => {
        const db = client.db(name)
        const migrations = db.collection('migrations')
        if (await migrations.findOne({ _id: 'message-thread-fields-v1' }))
          return

        const messages = db.collection('messages')
        await messages.updateMany(
          {
            $or: [
              { threadRootTs: { $exists: false } },
              { isThreadReply: { $exists: false } },
            ],
          },
          [
            {
              $set: {
                threadRootTs: { $ifNull: ['$thread_ts', '$ts'] },
                isThreadReply: { $ne: [{ $ifNull: ['$thread_ts', '$ts'] }, '$ts'] },
              },
            },
          ],
        )
        await Promise.all([
          messages.createIndex({ channel: 1, ts: 1 }),
          messages.createIndex({ channel: 1, isThreadReply: 1, ts: 1, _id: 1 }),
          messages.createIndex({ channel: 1, threadRootTs: 1, ts: 1 }),
        ])
        await migrations.insertOne({ _id: 'message-thread-fields-v1', completedAt: new Date() })
      }),
  )
})
