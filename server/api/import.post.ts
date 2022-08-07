import mongo from "~/server/utils/mongo";
import {
  getFilesFromRequest,
  listDir,
  unzipUpload,
} from "~/server/utils/fileUpload";
import { readFile } from "fs/promises";
import { join } from "path";

const readFromFile = async (dir: string) => {
  const contents = await readFile(dir, { encoding: "utf-8" });
  return JSON.parse(contents);
};

const saveToDb = async (coll: string, docs: any[]) => {
  const db = await mongo();
  await db.collection(coll).insertMany(docs);
};

const processPath = async (path: string, level = 0): Promise<void> => {
  if (path.endsWith(".json")) {
    const data = (await readFromFile(path)) as any[];
    if (level < 2) {
      const collection = path.split("/").at(-1).split(".json")[0];
      await saveToDb(collection, data);
    } else {
      const channel = path.split("/").at(-2);
      await saveToDb(
        "messages",
        data.map((d) => ({ ...d, channel }))
      );
    }
  } else {
    await Promise.all(
      (await listDir(path)).map((p) => processPath(join(path, p), level + 1))
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

  const db = await mongo();
  await db.dropDatabase();
  const msgCol = db.collection("messages");
  await msgCol.createIndex({ text: "text" }, { default_language: "german" });
  await msgCol.createIndex({ channel: 1 });
  await processPath(unzippedFilePath);

  console.log("--- Done ---");

  event.res.statusCode = 201;
  return {};
});
