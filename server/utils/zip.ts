import { Open, type File } from "unzipper";
import { storage } from "~~/server/utils/storage";
import request from "request";

export type Processor = (entry: File) => void | Promise<void>;

export const processZip = async (name: string, cb: Processor) => {
  const { s3BucketName, s3UseSsl } = useRuntimeConfig();
  const url = await storage().presignedGetObject(s3BucketName, name);

  // typings are incorrect here - ClientRequest is expected according to the typings, but the right type would be () => ClientRequest
  const dir = await Open.url(request as any, url);

  for (const file of dir.files) {
    await cb(file);
  }
};
