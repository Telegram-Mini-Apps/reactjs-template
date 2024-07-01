export const IS_SERVER = typeof window === 'undefined';
export const IS_BROWSER = typeof window !== 'undefined' && typeof window?.document !== 'undefined';
export const IS_WEBWORKER =
  typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope';

/**
 * Returns the value of the environment variable with the given name, raises an error if it is required and not set.
 * Note: My not work with Next.js on client-side code.
 * @param {string} name - The name of the environment variable to get: e.g. XXX_YYY_PUBLIC_URL
 * @param {boolean} [isRequired] - Whether the environment variable is required or not.
 * @param {string} [defaultValue] - The default value to return if the environment variable is not set.
 * @returns {string} The value of the environment variable with the given name.
 */
export function envGet(
  name: string,
  isRequired = false,
  defaultValue: string | undefined = undefined,
): string | undefined {
  // let variable = process.env[name]; // Classic way
  let variable = import.meta.env[name]; // Vite way

  if (typeof variable === 'undefined') {
    if (isRequired) {
      throw new Error(`Missing process.env.${name} variable`);
    }
    variable = defaultValue;
  }
  return variable;
}

/**
 * Verifies existence of environment variables, raises an error if it is required and not set.
 * @example const MY_VARIABLE = requireEnv(process.env.MY_VARIABLE);
 * @param {string} [passProcessDotEnvDotValueNameHere] - Pass a value of process.env.MY_VARIABLE here, not just a name!
 * @returns {string} The value of incoming parameter.
 * @throws Error "Missing .env variable!"
 */
export function envRequired(passProcessDotEnvDotValueNameHere: string | undefined): string {
  if (typeof passProcessDotEnvDotValueNameHere === 'undefined') {
    throw new Error('Missing .env variable!');
  }
  return passProcessDotEnvDotValueNameHere;
}

export function getCurrentVersion(): string {
  return import.meta.env.npm_package_version ?? import.meta.env.VITE_VERSION ?? 'unknown';
}

export function getCurrentEnvironment(): string {
  return import.meta.env.VITE_ENV ?? 'development';
}
