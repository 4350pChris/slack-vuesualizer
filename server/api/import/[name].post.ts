import { mongo } from "~/server/utils/mongo";
import { randomUUID } from "crypto";
import type { ApiMessage } from "~~/types/Message";
import { Parse, type Entry } from "unzipper";
import { storage } from "~~/server/utils/storage";
import type { Db } from "mongodb";

const createDb = async (db: Db) => {
  const msgCol = db.collection<ApiMessage>("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await msgCol.createIndex({ user: 1, ts: 1 });
};

const makeFileProcessor = (db: Db) => async (entry: Entry) => {
  const fileName = entry.path;
  const fileType = entry.type;
  const content = await entry.buffer();

  if (fileType === "Directory" || !fileName.endsWith(".json")) {
    return;
  }

  const doc = JSON.parse(content.toString());
  const nameParts = fileName.split("/");
  const channel = nameParts.at(-2);

  if (channel) {
    await db
      .collection("messages")
      .insertMany(doc.map((d) => ({ ...d, channel })));
  } else {
    const collection = nameParts.at(-1).split(".json")[0];
    await db.collection(collection).insertMany(doc);
  }
};

export default defineEventHandler(async (event) => {
  const { name } = event.context.params;

  // prepare by creating db and indices
  const uuid = randomUUID();
  const db = await mongo(uuid);

  await createDb(db);

  // unzip file from bucket on the fly
  const { s3BucketName } = useRuntimeConfig();
  const zipStream = await storage().getObject(s3BucketName, name);
  const zip = zipStream.pipe(Parse({ forceStream: true }));

  const processor = makeFileProcessor(db);

  for await (const e of zip) {
    const entry = e as Entry;
    await processor(entry);
    entry.autodrain();
  }

  await storage().removeObject(s3BucketName, name);

  console.log("--- Done ---");

  setCookie(event, "mongouuid", uuid);

  event.res.statusCode = 201;
  return {
    uuid,
  };
});
