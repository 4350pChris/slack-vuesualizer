import { Client } from "minio";

let client: Client | null;

export const storage = () => {
  if (!client) {
    const development = process.env.NODE_ENV === "development";
    const { s3Uri, s3AccessKey, s3SecretKey } = useRuntimeConfig();
    client = new Client({
      endPoint: s3Uri,
      useSSL: !development,
      port: development ? 9000 : undefined,
      accessKey: s3AccessKey,
      secretKey: s3SecretKey,
    });
  }
  return client;
};
