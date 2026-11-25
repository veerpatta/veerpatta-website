import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const errors = new Set();
const routes = ['', 'about', 'academics', 'admissions', 'admissions/pre-primary', 'admissions/class-11', 'beyond', 'digital', 'contact', 'faq', 'gallery', 'news', 'privacy'];
const output = resolve('_site');
const origin = 'https://vpps.co.in';
function files(dir) {
  return readdirSync(dir, { withFileTypes:true }).flatMap(entry =>
    entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)]);
}
const documents = new Map(files(output).filter(file => file.endsWith('.html')).map(file => [file, readFileSync(file, 'utf8')]));
function checkUrl(raw, page) {
  const url = new URL(raw.replaceAll('&amp;', '&'), page);
  if (url.origin !== origin) return;
  let file = resolve(output, '.' + decodeURIComponent(url.pathname));
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) {
    errors.add(`Missing target in ${page.pathname}: ${raw}`);
  } else if (url.hash && documents.has(file)) {
    const anchor = decodeURIComponent(url.hash.slice(1));
    if (anchor && !documents.get(file).includes(`id="${anchor}"`)) errors.add(`Missing anchor in ${page.pathname}: ${raw}`);
  }
}
for (const lang of ['en', 'hi']) {
  for (const slug of routes) {
    const file = join(output, lang, slug, 'index.html');
    const html = documents.get(file) || '';
    if (!html.includes('content="amet-students-20261125"')) errors.add(`Stale or missing route ${file}`);
    if (!html.includes(`<html lang="${lang}"`)) errors.add(`Wrong language ${file}`);
    if (/\{%|\{\{/.test(html)) errors.add(`Unrendered template ${file}`);
  }
}
for (const file of ['index.html','404.html','_headers','sitemap.xml','sw.js','manifest.webmanifest','news/2025-01-15-sports-day-en/index.html','news/2025-01-15-sports-day-hi/index.html']) {
  if (!existsSync(join(output, file))) errors.add('Missing ' + file);
}
for (const file of ['worker.js','wrangler.jsonc','src','scripts','tests','package.json','docs','agents.md']) {
  if (existsSync(join(output, file))) errors.add('Private tool in output: ' + file);
}
for (const [file, html] of documents) {
  const page = new URL(file.slice(output.length).replace(/index\.html$/, ''), origin);
  for (const [, raw] of html.matchAll(/<meta property="og:image" content="([^"]+)"/g)) checkUrl(raw, page);
  for (const [, raw] of html.matchAll(/\b(?:href|src|poster)="([^"]+)"/g)) checkUrl(raw, page);
  for (const [, set] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const item of set.split(',')) checkUrl(item.trim().split(/\s+/)[0], page);
  }
  if (/<img\b(?![^>]*\balt=)[^>]*>/.test(html)) errors.add(`Missing image alt in ${file}`);
}
if (errors.size) { console.error([...errors].join('\n')); process.exit(1); }
console.log(`Verified ${documents.size} pages, metadata, links, anchors, responsive image sources and public asset boundaries.`);
