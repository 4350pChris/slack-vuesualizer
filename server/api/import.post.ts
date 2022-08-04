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

const processPath = async (path: string, topLevel = false): Promise<void> => {
  const fileName = path.split("/").at(topLevel ? -1 : -2);
  if (path.endsWith(".json")) {
    const withoutExtension = fileName.split(".json")[0];
    const data = await readFromFile(path);
    await saveToDb(withoutExtension, data);
  } else {
    const db = await mongo();
    try {
      await db.dropCollection(fileName);
      console.log("Dropping " + fileName);
    } catch (e) {}
    (await listDir(path)).map((p) => processPath(join(path, p)));
  }
};

export default defineEventHandler(async (event) => {
  const files = await getFilesFromRequest(event.req);
  const file = files.file;
  if (!("filepath" in file)) {
    throw new Error("File not found");
  }
  const unzippedFilePath = await unzipUpload(file.filepath);
  await processPath(unzippedFilePath, true);

  return "";
});
