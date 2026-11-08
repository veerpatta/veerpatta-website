import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
const errors=[];
const routes=['','about','academics','admissions','beyond','digital','contact','faq','gallery','news','privacy'];
for(const lang of ['en','hi']) for(const slug of routes) {
 const file=`_site/${lang}/${slug?slug+'/':''}index.html`;
 if(!existsSync(file)) errors.push(`missing ${file}`);
 else {
  const html=readFileSync(file,'utf8');
  if(!html.includes('content="parent-first-20261108"')) errors.push(`old output ${file}`);
  if(!html.includes(`lang="${lang}"`)) errors.push(`language mismatch ${file}`);
  if(/\{%|\{\{/.test(html)) errors.push(`unrendered template ${file}`);
 }
}
for(const f of ['index.html','404.html','_headers','sitemap.xml','sw.js','manifest.webmanifest','news/2025-01-15-sports-day-en/index.html','news/2025-01-15-sports-day-hi/index.html']) if(!existsSync('_site/'+f)) errors.push('missing '+f);
for(const f of ['worker.js','wrangler.jsonc','src','scripts','tests','package.json','docs','agents.md']) if(existsSync('_site/'+f)) errors.push('private tool leaked: '+f);
function files(dir) {return readdirSync(dir).flatMap(n=>statSync(join(dir,n)).isDirectory()?files(join(dir,n)):[join(dir,n)]);}
for(const file of files('_site').filter(f=>f.endsWith('.html'))) {
 const html=readFileSync(file,'utf8');
 for(const [, attr, raw] of html.matchAll(/\b(href|src|poster)="([^"]+)"/g)) {
  if(/^(?:https?:|mailto:|tel:|data:|#)/.test(raw)) continue;
  const path=decodeURIComponent(raw.split(/[?#]/)[0]);
  if(!path) continue;
  const target=path.startsWith('/') ? resolve('_site','.'+path) : resolve(dirname(file),path);
  if(!existsSync(target) && !existsSync(join(target,'index.html'))) errors.push(`broken ${attr} in ${file}: ${raw}`);
 }
 if(/<img\b(?![^>]*\balt=)[^>]*>/g.test(html)) errors.push(`missing image alt in ${file}`);
}
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exit(1);}
console.log(`Verified ${routes.length*2} bilingual routes, news, metadata, local links and asset boundaries.`);
