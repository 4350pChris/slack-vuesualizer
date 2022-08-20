import mongo from "~/server/utils/mongo";

export default defineEventHandler(async (event) => {
  const db = await mongo();

  const count = await db.collection("messages").countDocuments();

  return count;
});
