import { mongo } from "~/server/utils/mongo";
import { randomUUID } from "crypto";
import type { Db } from "mongodb";
import type { ApiMessage } from "~~/types/Message";

const createDb = async (db: Db) => {
  const msgCol = db.collection<ApiMessage>("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await msgCol.createIndex({ user: 1, ts: 1 });
};

export default defineEventHandler(async (event) => {
  // prepare by creating db and indices
  const uuid = randomUUID();
  const db = await mongo(uuid);

  await createDb(db);

  const { data } = await useBody(event);

  await Promise.all(
    data.map(({ name, data }) => db.collection(name).insertMany(data))
  );

  setCookie(event, "mongouuid", uuid);

  event.res.statusCode = 201;
  return {
    uuid,
  };
});
