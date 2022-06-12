import * as fs from 'fs';

export const readFile = (path: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
