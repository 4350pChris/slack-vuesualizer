import { mongo } from "~~/server/utils/mongo";
import { getZipFiles } from "~~/server/utils/zip";

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);
  const channel = decodeURIComponent(event.context.params.channel);
  const db = await mongo(event.context.mongouuid);

  const files = await getZipFiles(name);

  const fits = files.filter((entry) => {
    const nameParts = entry.path.split("/");
    const isJson = entry.path.endsWith(".json");
    const fitsChannel = channel === nameParts.at(-2);
    return isJson && fitsChannel;
  });

  const docs = await Promise.all(
    fits.map(async (entry) => {
      const content = await entry.buffer();
      return JSON.parse(content.toString()) as any[];
    })
  );

  await db
    .collection("messages")
    .insertMany(docs.flatMap((d) => d.map((entry) => ({ ...entry, channel }))));

  event.res.statusCode = 201;
  return "ok";
});
