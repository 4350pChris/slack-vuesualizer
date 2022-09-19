import mongo from "~/server/utils/mongo";
import type { User } from "~~/types/User";

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid);
  const users = await db.collection<User>("users").find().toArray();

  return users;
});
