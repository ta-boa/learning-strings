const tsconfig = require("./tsconfig.json");
const path = require("path");
/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */
// export default (config, env, helpers, options) => {
export default (config, env, helpers, options) => {
  const alias = config.resolve.alias;
  const { paths } = tsconfig.compilerOptions;
  const newAlias = Object.keys(paths).reduce((acc, aliasName) => {
    acc[aliasName.replace("/*", "")] = path.resolve(
      __dirname,
      paths[aliasName].join("").replace("/*","/")
    );
    return acc;
  }, {});
  config.resolve.alias = Object.assign(newAlias, alias);
  return config;
};
