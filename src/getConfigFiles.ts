import { readJSON } from 'fs-extra';
import * as glob from 'glob';
import { join } from 'path';
import { IConfig } from './types';

/**
 * Get the envSync config files
 */
const getConfigFiles = (globPattern: string) => new Promise((resolve, reject) => {
  const globPath = join(process.cwd(), globPattern);

  // options is optional
  glob(globPath, {}, (err, files) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(files);
  });
}).then((files: string[]) => Promise.all(
  files.map(filePath => readJSON(filePath).then((json: IConfig) => ({
    ...json,
    envSyncPath: filePath,
  })))
));

export default getConfigFiles;
