import { processZip } from "~~/server/utils/zip";

export default defineEventHandler(async (event) => {
  const { name } = event.context.params;

  const channels: string[] = [];

  await processZip(name, (name, type) => {
    if (type !== "Directory") {
      return;
    }
    channels.push(name.slice(0, -1));
  });

  return {
    channels,
  };
});
