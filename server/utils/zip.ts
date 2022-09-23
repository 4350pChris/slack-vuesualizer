import { Open, type File } from "unzipper";
import { storage } from "~~/server/utils/storage";
import request from "request";

export const getZipFiles = async (name: string) => {
  const { s3BucketName } = useRuntimeConfig();
  const url = await storage().presignedGetObject(s3BucketName, name);

  // typings are incorrect here - ClientRequest is expected according to the typings, but the right type would be () => ClientRequest
  const { files } = await Open.url(request as any, url);
  return files;
};
