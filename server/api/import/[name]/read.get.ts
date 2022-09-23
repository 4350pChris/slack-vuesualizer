import { getZipFiles } from "~~/server/utils/zip";

export default defineEventHandler(async (event) => {
  const name = decodeURIComponent(event.context.params.name);

  const files = await getZipFiles(name);

  const channels = files
    .filter((entry) => entry.type === "Directory")
    .map((entry) => entry.path.slice(0, -1))
    .sort();

  return {
    channels,
  };
});
