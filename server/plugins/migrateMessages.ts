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
        const messages = db.collection('messages')
        await Promise.all([
          messages.createIndex({ channel: 1, orderTs: 1 }),
          messages.createIndex({ channel: 1, ts: 1 }),
          messages.createIndex({ channel: 1, isThreadReply: 1, orderTs: 1, _id: 1 }),
          messages.createIndex({ channel: 1, threadRootTs: 1, orderTs: 1 }),
          ...['channel_1', 'user_1_ts_1', 'channel_1_isThreadReply_1_ts_1__id_1', 'channel_1_threadRootTs_1_ts_1']
            .map(index => messages.dropIndex(index).catch(() => undefined)),
        ])

        if (await migrations.findOne({ _id: 'message-order-key-v1' }))
          return

        await messages.updateMany(
          {
            $or: [
              { threadRootTs: { $exists: false } },
              { isThreadReply: { $exists: false } },
              { orderTs: { $exists: false } },
            ],
          },
          [
            {
              $set: {
                threadRootTs: { $ifNull: ['$thread_ts', '$ts'] },
                isThreadReply: { $ne: [{ $ifNull: ['$thread_ts', '$ts'] }, '$ts'] },
                orderTs: {
                  $let: {
                    vars: { parts: { $split: ['$ts', '.'] } },
                    in: {
                      $concat: [
                        {
                          $substrCP: [
                            '000000000000',
                            0,
                            { $subtract: [12, { $strLenCP: { $arrayElemAt: ['$$parts', 0] } }] },
                          ],
                        },
                        { $arrayElemAt: ['$$parts', 0] },
                        {
                          $substrCP: [
                            { $concat: [{ $ifNull: [{ $arrayElemAt: ['$$parts', 1] }, ''] }, '000000'] },
                            0,
                            6,
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
        )
        await migrations.insertOne({ _id: 'message-order-key-v1', completedAt: new Date() })
      }),
  )
})
