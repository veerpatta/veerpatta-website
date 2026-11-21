import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for(const lang of ['hi','en'])for(const stage of ['pre-primary','class-11']){
 test(`${lang}/${stage}: WhatsApp is the first action, Call School stays and the page posts nothing`,async({page})=>{
  await page.setViewportSize({width:390,height:844});const outside:string[]=[],posts:string[]=[];
  await page.route('**/*',async r=>{const u=r.request().url();if(r.request().method()!=='GET')posts.push(u);if(!u.startsWith('http://127.0.0.1:4321/')){outside.push(u);return r.abort();}return r.continue();});
  await page.goto(`/${lang}/admissions/${stage}/?utm_source=mock`);
  const h=page.getByRole('heading',{level:1});await expect(h).toHaveCount(1);
  expect(await page.locator('link[rel=canonical]').getAttribute('href')).toBe(`https://vpps.co.in/${lang}/admissions/${stage}/`);
  const first=page.locator('.camp-buttons a').first();await expect(first).toBeInViewport();await expect(first).toHaveAttribute('data-whatsapp-enquiry','');
  const links=page.locator('[data-whatsapp-enquiry]');expect(await links.count()).toBe(3);
  for(const link of await links.all()){const url=new URL((await link.getAttribute('href'))!);expect(url.origin+url.pathname).toBe('https://wa.me/918302207823');expect(url.searchParams.get('text')).toBe(lang==='hi'?'प्रवेश पूछताछ':'Admission enquiry');await expect(link).toHaveAttribute('target','_blank');}
  await expect(page.locator('.camp-buttons a[href^="tel:"]')).toHaveAttribute('href','tel:+917976199548');
  await expect(page.locator('#enquiry form')).toHaveCount(0);await expect(page.locator('#enquiry')).toContainText('+91 83022 07823');
  expect(posts).toEqual([]);expect(outside).toEqual([]);
 });
 test(`${lang}/${stage}: seven widths, native fallbacks, serious/critical axe`,async({page,browser})=>{
  await page.goto(`/${lang}/admissions/${stage}/`);for(const width of [320,375,414,768,1024,1280,1920]){await page.setViewportSize({width,height:800});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width}px`).toBe(true);}
  await page.setViewportSize({width:390,height:844});const a=await new AxeBuilder({page}).analyze();expect(a.violations.filter(x=>x.impact==='critical'||x.impact==='serious').map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
  const c=await browser.newContext({javaScriptEnabled:false});const p=await c.newPage();await p.goto(`http://127.0.0.1:4321/${lang}/admissions/${stage}/`);await expect(p.locator('#enquiry [data-whatsapp-enquiry]')).toBeVisible();await expect(p.locator('a[href^="tel:"]').first()).toHaveAttribute('href','tel:+917976199548');expect(await p.locator('a[href^="https://wa.me/918302207823"]').count()).toBeGreaterThan(0);await expect(p.locator('form')).toHaveCount(0);await c.close();
 });
}
test('Parent guide works as native HTML; the quick enquiry is the school WhatsApp, not a form',async({page})=>{
 await page.setViewportSize({width:375,height:812});const posts:string[]=[];page.on('request',r=>{if(r.method()!=='GET')posts.push(r.url());});await page.goto('/hi/');await page.locator('.pg-panel>summary').click();await page.locator('.pg-answers summary').nth(2).click();await expect(page.locator('.pg-answers details').nth(2).locator('a')).toHaveAttribute('href','/hi/contact/#visit');
 const wa=page.locator('.mobile-contact [data-whatsapp-enquiry]');await expect(wa).toBeVisible();await expect(wa).toContainText('WhatsApp');await expect(wa).toHaveAttribute('href','https://wa.me/918302207823?text=%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A5%87%E0%A4%B6%20%E0%A4%AA%E0%A5%82%E0%A4%9B%E0%A4%A4%E0%A4%BE%E0%A4%9B');await expect(page.locator('#enquiry-dialog')).toHaveCount(0);expect(posts).toEqual([]);
});
