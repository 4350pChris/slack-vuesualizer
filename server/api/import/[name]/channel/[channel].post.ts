import { mongo } from "~/server/utils/mongo";
import { processZip } from "~~/server/utils/zip";

export default defineEventHandler(async (event) => {
  const name = event.context.params.name;
  const channel = decodeURIComponent(event.context.params.channel);

  const db = await mongo(event.context.mongouuid);
  const docs = [];

  console.time("processing zip");

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
  console.timeEnd("processing zip");

  console.time("inserting");
  await db
    .collection("messages")
    .insertMany(docs.map((d) => ({ ...d, channel })));
  console.timeEnd("inserting");

  event.res.statusCode = 201;
  return "ok";
});
