import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

export const extractZipTo = (zipPath, destDir) => {
  const zip = new AdmZip(zipPath);
  zip.extractAllTo(destDir, true);
  // Return list of extracted files
  const walk = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        filelist = walk(filepath, filelist);
      } else {
        filelist.push(filepath);
      }
    });
    return filelist;
  };
  return walk(destDir);
};
