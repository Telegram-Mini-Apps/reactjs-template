// import { readFileSync } from 'node:fs';
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/reactjs-template',
  plugins: [
    // Allows using React dev server along with building a React application with Vite.
    // https://npmjs.com/package/@vitejs/plugin-react-swc
    react(),
    // Allows using the compilerOptions.paths property in tsconfig.json.
    // https://www.npmjs.com/package/vite-tsconfig-paths
    tsconfigPaths(),
    // Allows using self-signed certificates to run the dev server using HTTPS.
    // In case, you have a trusted SSL certificate with a key, you could use the server.https
    // option not to proceed to the untrusted SSL certificate warning.
    // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
    basicSsl({
      certDir: resolve('certificates'),
      domains: ['tma.internal'],
    }),
  ],
  server: {
    port: 443,
    host: 'tma.internal',
    // Uncomment the next lines in case, you would like to run Vite dev server using HTTPS and in
    // case, you have trusted key and certificate. You retrieve your certificate and key
    // using mkcert.
    // Learn more: https://docs.telegram-mini-apps.com/platform/getting-app-link#mkcert
    // https: {
    //   cert: readFileSync(resolve('certificates/tma.internal.pem')),
    //   key: readFileSync(resolve('certificates/tma.internal-key.pem')),
    // },
  },
  publicDir: './public',
});

