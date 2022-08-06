import mongo from "../utils/mongo";
import { getFilesFromRequest, listDir, unzipUpload } from "../utils/fileUpload";
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
  const fileName = path.split("/").at(level === 1 ? -1 : -2);
  const collection = level === 1 ? fileName.split(".json")[0] : fileName;
  if (path.endsWith(".json")) {
    const data = await readFromFile(path);
    await saveToDb(collection, data);
  } else {
    const db = await mongo();
    console.log("Importing " + collection);
    try {
      await db.dropCollection(collection);
    } catch (e) {}
    await db
      .collection(collection)
      .createIndex({ text: "text" }, { default_language: "german" });
    await Promise.all(
      (await listDir(path)).map((p) => processPath(join(path, p), level + 1))
    );
    console.log("Done importing " + collection);
  }
};

export default defineEventHandler(async (event) => {
  const files = await getFilesFromRequest(event.req);
  const file = files.file;
  if (!("filepath" in file)) {
    throw new Error("File not found");
  }
  const unzippedFilePath = await unzipUpload(file.filepath);
  await processPath(unzippedFilePath);

  console.log("--- Done ---");

  event.res.statusCode = 201;
  return {};
});
