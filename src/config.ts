// export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;
export const URL_GRAPHQL = import.meta.env.VITE_URL_GRAPHQL;

export const IS_DEBUG = import.meta.env.VITE_DEBUG === 'true'; // Enables logging, etc.

export const IS_PRODUCTION = import.meta.env.PROD; // Enables analytics, etc.

IS_DEBUG &&
  console.log('@/config', {
    // PUBLIC_URL,
    URL_GRAPHQL,
    IS_DEBUG,
    IS_PRODUCTION,
  });
