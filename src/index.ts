#!/usr/bin/env node

import * as chokidar from 'chokidar';
import getArgs from './getArgs';
import getConfigFiles from './getConfigFiles';
import getEnvFile from './getEnvFile';
import getEnvPath from './getEnvPath';
import setFiles from './setFiles';

const { envPath, globArg, watch } = getArgs();

const fullEnvPath = getEnvPath(envPath);

/**
 * Sync the master env with the children
 */
const sync = () => {
  // eslint-disable-next-line no-console
  console.log('Sync env');

  return Promise.all([getEnvFile(fullEnvPath), getConfigFiles(globArg)]).then(
    ([env, configs]) => setFiles(env, configs)
  );
};

sync().then(() => {
  if (!watch) return;

  chokidar.watch(fullEnvPath).on('change', () => {
    sync();
  });
});
