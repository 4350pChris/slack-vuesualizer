import { storage } from "~/server/utils/storage";

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);
  const { s3BucketName } = useRuntimeConfig();

  await storage().removeObject(s3BucketName, name);
  return "ok";
});
