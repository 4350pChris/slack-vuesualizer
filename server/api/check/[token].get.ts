import { mongo } from "~/server/utils/mongo";

export default defineEventHandler(async (event) => {
  const { token } = event.context.params;
  const db = await mongo(token);
  const { databases } = await db.admin().listDatabases();
  const found = databases.some(({ name }) => name === token);
  if (!found) {
    throw createError({
      statusCode: 400,
      statusMessage: "invalid token",
    });
  }
  setCookie(event, "mongouuid", token);
  return "ok";
});
