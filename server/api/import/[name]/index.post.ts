import { mongo } from "~/server/utils/mongo";
import { randomUUID } from "crypto";
import type { Db } from "mongodb";
import type { ApiMessage } from "~~/types/Message";
import { processZip, type Processor } from "~~/server/utils/zip";

const makeFileProcessor =
  (db: Db): Processor =>
  async (name, type, content) => {
    if (
      !(
        type === "File" &&
        name.endsWith(".json") &&
        name.split("/").length === 1
      )
    ) {
      return;
    }
    const collection = name.split(".json")[0];
    const doc = JSON.parse(content.toString());
    await db.collection(collection).insertMany(doc);
  };

const createDb = async (db: Db) => {
  const msgCol = db.collection<ApiMessage>("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await msgCol.createIndex({ user: 1, ts: 1 });
};

export default defineEventHandler(async (event) => {
  const { name } = event.context.params;

  // prepare by creating db and indices
  const uuid = randomUUID();
  const db = await mongo(uuid);

  await createDb(db);

  await processZip(name, makeFileProcessor(db));

  setCookie(event, "mongouuid", uuid);

  event.res.statusCode = 201;
  return {
    uuid,
  };
});
