import { writeFile, writeJSON } from 'fs-extra';
import { join } from 'path';
import { EnvVal, IExtendedConfig } from './types';

export interface IEnv {
  [key: string]: EnvVal;
}

/**
 * Set the env files
 */
const setFiles = (env: IEnv, configs: IExtendedConfig[]) => Promise.all(
  configs.map(({ envSyncPath, keys, file }) => {
    const destPath = join(envSyncPath, '../', file);

    if (file.includes('json')) {
      const strippedData = keys.reduce((acc, key) => {
        const val = env[key];

        if (val === undefined) {
          return acc;
        }

        return {
          ...acc,
          [key]: val,
        };
      }, {});

      return writeJSON(destPath, strippedData, { spaces: 2 });
    }

    const contents = keys.reduce((acc, key) => {
      const val = env[key];

      if (val === undefined) {
        return acc;
      }

      let newAcc = acc;

      if (acc !== '') newAcc = `${newAcc}\n`;

      newAcc = `${newAcc}${key}=${String(val)}`;

      return newAcc;
    }, '');

    return writeFile(destPath, contents);
  })
);

export default setFiles;
