import { mongo } from "~~/server/utils/mongo";
import type { Filter } from "mongodb";
import type { SearchResult } from "~~/types/File";
import type { Message } from "~~/types/Message";

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid);

  const { users, channels } = await useBody(event);

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
        $sort: {
          "file.timestamp": 1,
        },
      },
    ])
    .toArray();

  return messages;
});
