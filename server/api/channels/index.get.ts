import mongo from "~/server/utils/mongo";
import { Channel } from "~~/types/Channel";

export default defineEventHandler(async () => {
  const db = await mongo();
  const channels = db.collection<Channel>("channels").find();

  return channels.toArray();
});
