import { mongo } from "~~/server/utils/mongo";
import type { Message } from "~~/types/Message";

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid);

  const messages = await db
    .collection<Message>("messages")
    .find({ files: { $exists: true } })
    .project<Message>({ files: true })
    .toArray();

  const files = messages.flatMap(({ files }) => files);

  return files;
});
