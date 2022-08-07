import mongo from "~/server/utils/mongo";
import type { User } from "~~/types/User";

export default defineEventHandler(async () => {
  const db = await mongo();
  const users = await db.collection<User>("users").find().toArray();

  return users;
});
