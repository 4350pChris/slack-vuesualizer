import mongo from "~/server/utils/mongo";
import type { Channel } from "~/types/Channel";

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);
  const db = await mongo();
  const channel = await db.collection<Channel>("channels").findOne({ name });

  if (!channel) {
    event.res.statusCode = 404;
    event.res.end();
  }

  return channel;
});
