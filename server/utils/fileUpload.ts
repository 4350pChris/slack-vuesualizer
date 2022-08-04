import Zip from "adm-zip";
import { mkdtemp, readdir } from "fs/promises";
import path from "path";
import os from "os";
import formidable from "formidable";
import type { IncomingMessage } from "h3";

export async function unzipUpload(filePath: string): Promise<string> {
  const zip = new Zip(filePath);
  const dir = await mkdtemp(path.join(os.tmpdir(), "slack-import"));
  zip.extractAllTo(dir, true);
  return dir;
}

export async function listDir(dir: string): Promise<string[]> {
  return readdir(dir);
}

export async function getFilesFromRequest(req: IncomingMessage) {
  const form = formidable({ multiples: true });

  return new Promise<formidable.Files>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}
