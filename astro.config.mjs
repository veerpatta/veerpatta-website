import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://vpps.co.in',
  output: 'static',
  outDir: './_site',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { build: { cssMinify: true } }
});
