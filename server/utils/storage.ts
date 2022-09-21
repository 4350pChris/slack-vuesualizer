import { Client } from "minio";

let client: Client | null;

export const storage = () => {
  if (!client) {
    const { s3Url, s3Port, s3Region, s3UseSsl, s3AccessKey, s3SecretKey } =
      useRuntimeConfig();

    client = new Client({
      endPoint: s3Url,
      region: s3Region,
      useSSL: s3UseSsl,
      port: s3Port,
      accessKey: s3AccessKey,
      secretKey: s3SecretKey,
    });
  }
  return client;
};
