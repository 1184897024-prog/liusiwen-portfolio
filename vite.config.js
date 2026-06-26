import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public-optimized',
  build: {
    assetsInlineLimit: 0,
  },
});
