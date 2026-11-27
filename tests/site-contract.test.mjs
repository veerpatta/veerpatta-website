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
  assert.match(html,/name="site-release" content="amet-families-20261127"/);
 }
 for(const path of ['worker.js','wrangler.jsonc','src','scripts','tests','package.json','docs','agents.md']) assert.equal(fs.existsSync(new URL('_site/'+path,root)),false,path+' must not publish');
});
test('admissions are WhatsApp-first in both languages: no public form, Call School kept',()=>{
 const pages=['', 'about','academics','admissions','admissions/pre-primary','admissions/class-11','beyond','digital','contact','faq','gallery','news','privacy'];
 for(const lang of ['en','hi']){
  const words=lang==='hi'?'%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A5%87%E0%A4%B6%20%E0%A4%AA%E0%A5%82%E0%A4%9B%E0%A4%A4%E0%A4%BE%E0%A4%9B':'Admission%20enquiry';
  for(const page of pages){
   const html=fs.readFileSync(new URL(`_site/${lang}/${page ? page+'/' : ''}index.html`,root),'utf8');
   assert.doesNotMatch(html,/formspree/i,`${lang}/${page} must not post to Formspree`);
   assert.doesNotMatch(html,/data-admission-form|data-campaign-form|enquiry-dialog/,`${lang}/${page} must not carry the old enquiry form`);
   assert.match(html,new RegExp(`href="https://wa.me/918302207823\\?text=${words}"`),`${lang}/${page} quick bar opens the school WhatsApp`);
   assert.match(html,/href="tel:\+917976199548"/,`${lang}/${page} keeps Call School`);
  }
  for(const page of ['admissions','admissions/pre-primary','admissions/class-11']){
   const html=fs.readFileSync(new URL(`_site/${lang}/${page}/index.html`,root),'utf8');
   assert.match(html,/id="enquiry"/,`${lang}/${page} keeps the #enquiry anchor`);
   assert.match(html,/\+91 83022 07823/,`${lang}/${page} shows the WhatsApp number`);
  }
 }
});
