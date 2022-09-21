import { mongo } from "~/server/utils/mongo";
import type { Db } from "mongodb";
import { processZip, type Processor } from "~~/server/utils/zip";

const makeFileProcessor =
  (db: Db, channel: string): Processor =>
  async (name, type, content) => {
    if (!(type === "File" && name.endsWith(".json"))) {
      return;
    }

    const nameParts = name.split("/");

    if (channel === nameParts.at(-2)) {
      const doc = JSON.parse(content.toString());
      await db
        .collection("messages")
        .insertMany(doc.map((d) => ({ ...d, channel })));
    }
  };

export default defineEventHandler(async (event) => {
  const {
    mongouuid,
    params: { channel, name },
  } = event.context;

  const db = await mongo(mongouuid);

  const processor = makeFileProcessor(db, channel);

  await processZip(name, processor);

  event.res.statusCode = 201;
  return "ok";
});
