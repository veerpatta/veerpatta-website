import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://vpps.co.in',
  output: 'static',
  outDir: './_site',
  trailingSlash: 'always',
  // Stylesheets under 10 KB (the per-page one) go inline in the HTML, so a
  // first visit on a slow connection waits for one CSS file instead of two.
  // The large shared sheet stays a separate file, cached for a year.
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { build: { cssMinify: true, assetsInlineLimit: 10240 } }
});
