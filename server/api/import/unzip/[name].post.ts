import { Parse, type Entry } from "unzipper";
import { randomUUID } from "crypto";
import { mongo } from "~/server/utils/mongo";
import { storage } from "~~/server/utils/storage";
import type { ApiMessage } from "~~/types/Message";

const createDb = async () => {
  const uuid = randomUUID();
  const db = await mongo(uuid);

  const msgCol = db.collection<ApiMessage>("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await msgCol.createIndex({ user: 1, ts: 1 });

  return uuid;
};

export default defineEventHandler(async (event) => {
  console.log("unzipping");
  const { name } = event.context.params;
  const { s3BucketName } = useRuntimeConfig();
  const zipStream = await storage().getObject(s3BucketName, name);
  const zip = zipStream.pipe(Parse({ forceStream: true }));

  for await (const e of zip) {
    const entry = e as Entry;
    const fileName = entry.path;
    const fileType = entry.type;
    const content = await entry.buffer();
    console.log(fileType, fileName);
    entry.autodrain();
  }
});
