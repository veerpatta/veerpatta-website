import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://veerpatta-website.raj-39e.workers.dev',
  output: 'static',
  outDir: './_site',
  trailingSlash: 'always',
  build: { format: 'directory' },
  vite: { build: { cssMinify: true } }
});
