import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root = new URL('../', import.meta.url);
test('Astro bilingual build preserves routes and does not publish tooling',()=>{
 const pkg=JSON.parse(fs.readFileSync(new URL('package.json',root),'utf8'));
 assert.equal(pkg.type,'module');
 for(const lang of ['en','hi']) for(const page of ['', 'about','academics','admissions','admissions/pre-primary','admissions/class-11','beyond','digital','contact','faq','gallery','news','privacy']) {
  const route=new URL(`_site/${lang}/${page ? page+'/' : ''}index.html`,root);
  const html=fs.readFileSync(route,'utf8');
  assert.match(html,/name="generator" content="Astro/);
  assert.match(html,new RegExp(`<html[^>]*lang="${lang}"`));
  assert.match(html,/name="site-release" content="photo-story-20261121"/);
 }
 for(const path of ['worker.js','wrangler.jsonc','src','scripts','tests','package.json','docs','agents.md']) assert.equal(fs.existsSync(new URL('_site/'+path,root)),false,path+' must not publish');
});
