import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

/// <reference types="vitest" />

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'common-kit',
      fileName: 'common-kit',
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {},
});
