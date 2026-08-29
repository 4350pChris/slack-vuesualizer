import { randomUUID } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import * as zip from '@zip.js/zip.js'
import type { Message } from '~/types/Message'
import { fullClient } from '~~/server/utils/mongo'
import { createMessageIndexes, prepareMessages } from '~~/server/utils/importMessages'

interface WorkspaceData {
  name: string
  data: unknown[]
}

const systemDatabases = new Set(['admin', 'config', 'local'])

const getEntryData = async (entry: zip.Entry): Promise<unknown[]> => {
  if (entry.directory || !('getData' in entry))
    return []

  const content = await entry.getData(new zip.TextWriter('utf-8'))
  return content ? JSON.parse(content) : []
}

const insertInBatches = async (collection: ReturnType<Awaited<ReturnType<typeof fullClient>>['db']>['collection'], data: unknown[]) => {
  const batchSize = 500
  for (let index = 0; index < data.length; index += batchSize)
    await collection.insertMany(data.slice(index, index + batchSize))
}

const findWorkspace = async (client: Awaited<ReturnType<typeof fullClient>>) => {
  const { databases } = await client.db().admin().listDatabases({ nameOnly: true })
  return databases.find(({ name }) => !systemDatabases.has(name))?.name
}

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const exportPath = config.startupExportPath

  if (!exportPath)
    return

  const client = await fullClient()
  const existingWorkspace = await findWorkspace(client)
  if (existingWorkspace) {
    console.info(`Startup Slack workspace: /?token=${existingWorkspace}`)
    return
  }

  const file = await stat(exportPath).catch(() => undefined)
  if (!file?.isFile())
    throw new Error(`Startup export is not a readable file: ${exportPath}`)

  const workspaceToken = randomUUID()
  const db = client.db(workspaceToken)

  const archive = await readFile(exportPath)
  const entries = await new zip.ZipReader(new zip.Uint8ArrayReader(archive)).getEntries({ filenameEncoding: 'utf-8' })
  if (!entries.some(entry => entry.filename === 'users.json'))
    throw new Error('Startup export is not a Slack export: users.json is missing.')

  const channels = entries
    .filter(entry => entry.directory)
    .map(entry => entry.filename.slice(0, -1))

  const workspaceEntries = entries.filter(entry => !entry.directory && !entry.filename.includes('/'))
  const workspaceData: WorkspaceData[] = []
  for (const entry of workspaceEntries) {
    const data = await getEntryData(entry)
    if (data.length === 0)
      continue

    const name = entry.filename.replace(/\.json$/, '')
    workspaceData.push({
      name,
      data: name === 'channels'
        ? data.filter((channel): channel is { name: string } => Boolean(channel && typeof channel === 'object' && 'name' in channel && channels.includes(String(channel.name))))
        : data,
    })
  }

  try {
    const messages = db.collection<Message>('messages')
    await Promise.all([
      createMessageIndexes(db),
      ...workspaceData.map(({ name, data }) => insertInBatches(db.collection(name), data)),
    ])

    for (const channel of channels) {
      const channelEntries = entries.filter(entry => !entry.directory && entry.filename.startsWith(`${channel}/`))
      const data = (await Promise.all(channelEntries.map(getEntryData))).flat()
      await insertInBatches(messages, prepareMessages(channel, data))
    }

    console.info(`Startup Slack workspace: /?token=${workspaceToken}`)
  }
  catch (error) {
    await db.dropDatabase().catch(() => undefined)
    console.error('Could not import startup Slack export:', error)
    throw error
  }
})
