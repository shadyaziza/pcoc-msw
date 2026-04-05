import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts', 'src/vite-plugin.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
  };
});
