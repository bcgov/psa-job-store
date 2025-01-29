import react from '@vitejs/plugin-react-swc';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ tsDecorators: true }),
    svgr({
      svgrOptions: {
        icon: true,
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
      include: '**/*.svg?react',
    }),
    {
      name: 'version-generator',
      writeBundle: () => {
        // Generate version.json during build
        const versionInfo = {
          version: process.env.npm_package_version,
          gitSha: process.env.GITHUB_SHA || 'development',
          buildTime: new Date().toISOString(),
        };

        writeFileSync(path.resolve(__dirname, 'dist/version.json'), JSON.stringify(versionInfo, null, 2));
      },
    },
  ],
  base: '/',
  define: {
    // Make version info available in app code
    __VERSION__: JSON.stringify({
      version: process.env.npm_package_version,
      gitSha: process.env.GITHUB_SHA || 'development',
    }),
  },
  // build: {
  //   sourcemap: true,
  //   rollupOptions: {
  //     output: {
  //       sourcemapExcludeSources: true,
  //     },
  //   },
  // },
  server: {
    host: true,
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    port: 3000,
  },
});
