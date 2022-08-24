import mongo from "~/server/utils/mongo";
import type { Message } from "~/types/Message";
import normalizeMessages from "~~/server/utils/normalizeMessages";
export default defineEventHandler(async (event) => {
  const channel = decodeURIComponent(event.context.params.name);
  const db = await mongo();
  const messages = await db
    .collection<Message>("messages")
    .find({ channel })
    .toArray();

  return normalizeMessages(messages);
});
