import * as https from 'https';
import sizeOf from 'image-size';

export const getImageSize = (url: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const chunks: any[] = [];
    https.get(url, (res) => {
      res
        .on('data', (chunk) => {
          chunks.push(chunk);
        })
        .on('end', () => {
          const buffer = Buffer.concat(chunks);
          const { width, height } = sizeOf(buffer);
          resolve({
            width: width || 0,
            height: height || 0,
          });
        })
        .on('error', (e) => {
          reject(e);
        });
    });
  });
};
