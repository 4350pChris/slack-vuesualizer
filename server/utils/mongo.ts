import { type Db, MongoClient } from "mongodb";

let client: MongoClient | null = null;

export default async function (dbUuid: string): Promise<Db> {
  if (client === null) {
    const uri = useRuntimeConfig().mongodbUri;
    try {
      client = await MongoClient.connect(uri);
    } catch (e) {
      console.error("Failed to connect to mongo", e);
      throw e;
    }
  }
  return client.db(dbUuid);
}
