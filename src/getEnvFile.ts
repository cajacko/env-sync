import { readFile } from 'fs-extra';
import { EnvVal } from './types';

/**
 * Get the env file as an object
 */
const getEnvFile = (envPath: string) => readFile(envPath).then((contents) => {
  const lines = contents.toString().split('\n');

  const data = {};

  lines.forEach((line) => {
    if (!line) return;

    const text = line.trim();

    if (!text) return;
    if (text === '') return;
    if (text.startsWith('#')) return;

    const [key, val] = text.split('=');

    if (!key || !val) return;
    if (key === '') return;

    let finalVal: EnvVal = val;

    if (finalVal === 'true') finalVal = true;
    if (finalVal === 'false') finalVal = false;

    data[key] = finalVal;
  });

  return data;
});

export default getEnvFile;
