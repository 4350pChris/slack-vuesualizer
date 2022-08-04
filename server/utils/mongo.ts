import { type Db, MongoClient } from "mongodb";

let db: Db | null = null;

export default async function () {
  if (db === null) {
    const uri = useRuntimeConfig().mongodbUri;
    try {
      const client = await MongoClient.connect(uri);
      db = client.db("slack");
    } catch (e) {
      console.error("Failed to connect to mongo", e);
      throw e;
    }
  }
  return db;
}
