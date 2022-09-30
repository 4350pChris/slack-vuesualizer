import { mongo } from "~/server/utils/mongo";
import type { User } from "~~/types/User";

export default defineEventHandler(async (event) => {
  const db = await mongo(event.context.mongouuid);
  const users = await db
    .collection<User>("users")
    .find()
    .sort({ is_bot: 1, "profile.display_name": 1, "profile.real_name": 1 })
    .toArray();
  return users;
});
