import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // Allows using self-signed certificates to run the dev server using HTTPS.
    // https://www.npmjs.com/package/@vitejs/plugin-basic-ssl
    // basicSsl(),
  ],
  publicDir: './public',
  server: {
    open: true,
    port: 3000,
    // Uncomment this line if you want to expose your dev server and access it from the devices
    // in the same network.
    // host: true,
  },
  // test: {
  //   alias: {
  //     '@/': new URL('./src/', import.meta.url).pathname,
  //   },
  //   environment: 'jsdom',
  //   include: ['**/*.test.*', '**/*.spec.*'],
  //   globals: true,
  //   setupFiles: ['./setup-tests.ts'],
  //},
});
