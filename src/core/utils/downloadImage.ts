import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { rejects } from 'assert';
import { filesBasePath } from './constants';

export const downloadImage = (url: string) => {
  const request = url.startsWith('https') ? https : http;
  const fileName = `${new Date().getTime()}.png`;
  const filePath = path.join(filesBasePath, `${fileName}`);
  return new Promise<string>((resolve, reject) => {
    request
      .get(url, (res) => {
        if (res.statusCode === 200) {
          res
            .pipe(fs.createWriteStream(filePath))
            .on('error', reject)
            .on('close', () => resolve(fileName));
        } else {
          res.resume();
          reject(
            new Error('Request Failed.\n' + `Status Code: ${res.statusCode}`),
          );
        }
      })
      .on('timeout', reject)
      .on('error', rejects);
  });
};
