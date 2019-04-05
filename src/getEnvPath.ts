import { join } from 'path';

/**
 * Get the main env path
 */
const getEnvPath = (envPath: string) => join(process.cwd(), envPath);

export default getEnvPath;
