import * as fs from 'fs';
import * as path from 'path';

interface Config {
  type: 'mysql';
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
  origin: string[];
}

export const readConfig = (): Config => {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'config.json')).toString(),
  );
};
