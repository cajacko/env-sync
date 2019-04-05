/**
 * Get the args from the cli
 */
const getArgs = () => {
  const [, , envPath, globArg] = process.argv;

  const watch = process.argv.includes('--watch') || process.argv.includes('-w');

  return {
    envPath,
    globArg,
    watch,
  };
};

export default getArgs;
