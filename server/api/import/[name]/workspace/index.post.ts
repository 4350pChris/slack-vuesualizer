import { mongo } from "~/server/utils/mongo";
import { randomUUID } from "crypto";
import type { Db } from "mongodb";
import type { ApiMessage } from "~~/types/Message";
import { getZipFiles } from "~~/server/utils/zip";

const createDb = async (db: Db) => {
  const msgCol = db.collection<ApiMessage>("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await msgCol.createIndex({ user: 1, ts: 1 });
};

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);

  // prepare by creating db and indices
  const uuid = randomUUID();
  const db = await mongo(uuid);

  await createDb(db);

  const files = await getZipFiles(name);

  const fits = files.filter(
    (entry) =>
      entry.path.endsWith(".json") && entry.path.split("/").length === 1
  );

  await Promise.all(
    fits.map(async (entry) => {
      const collection = entry.path.split(".json")[0];
      const content = await entry.buffer();
      const doc = JSON.parse(content.toString());
      await db.collection(collection).insertMany(doc);
    })
  );

  setCookie(event, "mongouuid", uuid);

  event.res.statusCode = 201;
  return {
    uuid,
  };
});
