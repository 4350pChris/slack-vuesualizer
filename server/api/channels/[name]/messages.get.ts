import mongo from "~/server/utils/mongo";
import type { Message } from "~/types/Message";
export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params.name);
  const db = await mongo();
  const messages = await db
    .collection<Message>("messages")
    .find({ channel })
    .toArray();

  return messages;
});
