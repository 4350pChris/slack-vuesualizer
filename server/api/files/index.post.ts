import type { Filter } from 'mongodb'
import { mongo } from '~~/server/utils/mongo'
import { Sortable } from '~~/types/Sort'
import type { SearchResult } from '~~/types/File'
import type { Message } from '~~/types/Message'

interface Body {
  channels: string[]
  users: string[]
  sort: Sortable
  page: number
  size: number
}

const mongoSortFromBody = (
  sort: Sortable,
): Record<`files.${string}`, number> => {
  switch (sort) {
    case Sortable.AtoZ:
      return { 'files.name': 1 }
    case Sortable.ZtoA:
      return { 'files.name': -1 }
    case Sortable.Newest:
      return { 'files.timestamp': -1 }
    case Sortable.Oldest:
      return { 'files.timestamp': 1 }
    default:
      throw createError({ statusCode: 400, statusMessage: 'Unknown sorting' })
  }
}

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid)

  const { users, channels, sort, page, size } = await readBody<Body>(event)

  const filter: Filter<Message> = {
    'files.name': { $exists: true },
  }

  if (users?.length > 0)
    filter.user = { $in: users }

  if (channels?.length > 0)
    filter.channel = { $in: channels }

  const sorting = mongoSortFromBody(sort)

  const coll = db.collection<Message>('messages')

  const messages = await coll
    .aggregate<SearchResult>([
      {
        $unwind: '$files',
      },
      {
        $match: filter,
      },
      {
        $sort: sorting,
      },
    ])
    .skip(page * size)
    .limit(size)
    .toArray()

  const count = await coll.countDocuments(filter)

  return { count: Math.ceil(count / size), messages }
})
