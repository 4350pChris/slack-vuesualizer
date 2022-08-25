import mongo from "~/server/utils/mongo";
import type { Filter } from "mongodb";
import type { Message } from "~/types/Message";

export default defineEventHandler(async (event) => {
  const { query, channel } = useQuery(event);

  const db = await mongo();

  const filter: Filter<Message> = {
    $and: [{ $text: { $search: query.toString() } }],
  };

  if (channel) {
    filter.$and.push({ channel: decodeURIComponent(channel.toString()) });
  }

  const messages = await db
    .collection<Message>("messages")
    .find(filter)
    .project({ score: { $meta: "textScore" } })
    .limit(30)
    .sort({ score: { $meta: "textScore" } })
    .toArray();

  return messages;
});
