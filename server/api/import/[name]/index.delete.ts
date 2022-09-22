import { storage } from "~~/server/utils/storage";

export default defineEventHandler((event) => {
  const { name } = event.context.params;
  const { s3BucketName } = useRuntimeConfig();

  return storage().removeObject(s3BucketName, name);
});
