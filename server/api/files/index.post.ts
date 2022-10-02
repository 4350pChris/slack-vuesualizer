import { mongo } from "~~/server/utils/mongo";
import type { Filter } from "mongodb";
import { Sortable } from "~~/types/Sort";
import type { SearchResult } from "~~/types/File";
import type { Message } from "~~/types/Message";

interface Body {
  channels: string[];
  users: string[];
  sort: Sortable;
}

const mongoSortFromBody: (sort: Sortable) => Record<string, number> = (
  sort
) => {
  switch (sort) {
    case Sortable.AtoZ:
      return { "file.name": 1 };
    case Sortable.ZtoA:
      return { "file.name": -1 };
    case Sortable.Newest:
      return { "file.timestamp": -1 };
    case Sortable.Oldest:
      return { "file.timestamp": 1 };
    default:
      throw new Error("Unknown sorting");
  }
};

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid);

  const { users, channels, sort } = await useBody<Body>(event);

  const filters: Filter<Message>[] = [
    {
      "files.name": { $exists: true },
    },
  ];

  if (users?.length > 0) {
    filters.push({ user: { $in: users } });
  }

  if (channels?.length > 0) {
    filters.push({ channel: { $in: channels } });
  }

  const sorting = mongoSortFromBody(sort);

  const messages = await db
    .collection<Message>("messages")
    .aggregate<SearchResult>([
      {
        $unwind: "$files",
      },
      {
        $match: { $and: filters },
      },
      {
        $group: {
          _id: "$files.id",
          file: {
            $mergeObjects: "$files",
          },
          channel: {
            $first: "$channel",
          },
        },
      },
      {
        $sort: sorting,
      },
    ])
    .toArray();

  return messages;
});
