import mongo from "~/server/utils/mongo";
import {
  getFilesFromRequest,
  listDir,
  unzipUpload,
} from "~/server/utils/fileUpload";
import { readFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import type { ApiMessage } from "~~/types/Message";

const readFromFile = async (dir: string) => {
  const contents = await readFile(dir, { encoding: "utf-8" });
  return JSON.parse(contents);
};

const processPath = async (
  db: Awaited<ReturnType<typeof mongo>>,
  path: string,
  level = 0
): Promise<void> => {
  if (path.endsWith(".json")) {
    const data = (await readFromFile(path)) as any[];
    if (level < 2) {
      const collection = path.split("/").at(-1).split(".json")[0];
      await db.collection(collection).insertMany(data);
    } else {
      const channel = path.split("/").at(-2);
      await db
        .collection("messages")
        .insertMany(data.map((d) => ({ ...d, channel })));
    }
  } else {
    const contents = await listDir(path);
    await Promise.all(
      contents.map((p) => processPath(db, join(path, p), level + 1))
    );
  }
};

export default defineEventHandler(async (event) => {
  const files = await getFilesFromRequest(event.req);
  const file = files.file;
  if (!("filepath" in file)) {
    throw new Error("File not found");
  }
  const unzippedFilePath = await unzipUpload(file.filepath);

  const uuid = randomUUID();
  const db = await mongo(uuid);

  const msgCol = db.collection<ApiMessage>("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await msgCol.createIndex({ user: 1, ts: 1 });

  await processPath(db, unzippedFilePath);

  console.log("--- Done ---");

  setCookie(event, "mongouuid", uuid);

  event.res.statusCode = 201;
  return {
    uuid,
  };
});
