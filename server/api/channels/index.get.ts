import mongo from "~/server/utils/mongo";
import { Channel } from "~~/types/Channel";

export default defineEventHandler(async () => {
  const db = await mongo();
  const channelsCursor = db.collection<Channel>("channels").find();
  const channels = channelsCursor
    .project<Pick<Channel, "id" | "name">>({ id: true, name: true })
    .toArray();

  return channels;
});
