import fs from 'fs';
import path from 'path';

export default async function findFiles(baseDir: string, ext: string): Promise<string[]> {
  const res: string[] = [];

  const dirents = fs.readdirSync(baseDir, {withFileTypes: true});
  for (const dirent of dirents) {
    const direntPath = path.join(baseDir, dirent.name);

    if (dirent.isDirectory()) {
      res.push(...(await findFiles(direntPath, ext)));
    } else if (dirent.isFile() && (!ext || dirent.name.split('.').pop() === ext)) {
      res.push(direntPath);
    }
  }

  return res;
}