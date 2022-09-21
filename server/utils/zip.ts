import { Parse, type Entry } from "unzipper";
import { storage } from "~~/server/utils/storage";

export type Processor = (entry: Entry) => void | Promise<void>;

export const processZip = async (name: string, cb: Processor) => {
  const { s3BucketName } = useRuntimeConfig();

  console.time("S3 download");
  // unzip file from bucket on the fly
  const zipStream = await storage().getObject(s3BucketName, name);
  const zip = zipStream.pipe(Parse({ forceStream: true }));
  console.timeEnd("S3 download");

  console.time("processing");
  for await (const e of zip) {
    const entry = e as Entry;
    await cb(entry);
    entry.autodrain();
  }
  console.timeEnd("processing");

  // await storage().removeObject(s3BucketName, name);
};
