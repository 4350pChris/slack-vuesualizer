import { processZip } from "~~/server/utils/zip";

export default defineEventHandler(async (event) => {
  const { name } = event.context.params;

  const channels: string[] = [];

  await processZip(name, (entry) => {
    if (entry.type !== "Directory") {
      return;
    }
    channels.push(entry.path.slice(0, -1));
  });

  return {
    channels: channels.sort(),
  };
});
