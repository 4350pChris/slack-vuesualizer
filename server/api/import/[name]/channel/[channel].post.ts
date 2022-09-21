import { mongo } from "~/server/utils/mongo";
import { processZip } from "~~/server/utils/zip";

export default defineEventHandler(async (event) => {
  const {
    mongouuid,
    params: { channel, name },
  } = event.context;

  const db = await mongo(mongouuid);
  const docs = [];

  await processZip(name, async (entry) => {
    if (!(entry.type === "File" && entry.path.endsWith(".json"))) {
      return;
    }

    const nameParts = entry.path.split("/");

    if (channel === nameParts.at(-2)) {
      const content = await entry.buffer();
      const data = JSON.parse(content.toString());
      docs.push(...data);
    }
  });

  await db
    .collection("messages")
    .insertMany(docs.map((d) => ({ ...d, channel })));

  event.res.statusCode = 201;
  return "ok";
});
