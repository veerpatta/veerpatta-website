import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const publicInteriors = ['about','academics','beyond','digital','contact','faq','gallery','news','privacy'];

for (const lang of ['en','hi']) {
 test(`${lang}: interior pages are readable at 320px and all hero jump targets exist`,async({page})=>{
  await page.setViewportSize({width:320,height:760});
  for(const slug of publicInteriors){
   const response=await page.goto(`/${lang}/${slug}/`);
   expect(response?.status(),slug).toBe(200);
   await expect(page.locator('main h1')).toHaveCount(1);
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
   const badTargets=await page.locator('.inside-actions a[href^="#"]').evaluateAll(nodes=>nodes.map(a=>a.getAttribute('href')!.slice(1)).filter(id=>!document.getElementById(id)));
   expect(badTargets,slug).toEqual([]);
  }
 });
 test(`${lang}: parent paths connect class choices, gallery filters and the visit guide`,async({page})=>{
  await page.goto(`/${lang}/academics/`);
  await expect(page.locator('#early-years a')).toHaveAttribute('href',`/${lang}/admissions/pre-primary/`);
  await expect(page.locator('#senior-secondary a')).toHaveAttribute('href',`/${lang}/admissions/class-11/`);
  await page.goto(`/${lang}/beyond/`);
  await page.locator('a[href$="?category=sports#photos"]').click();
  await expect(page.locator('[data-gallery-filter=sports]')).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('[data-gallery-category=academic]').first()).toBeHidden();
  await page.locator('main a[href$="/contact/#visit"]').click();
  await expect(page.locator('#visit address')).toBeVisible();
  await expect(page.locator('#visit a[href^="https://maps.google.com/"]')).toHaveAttribute('rel',/noopener/);
  await expect(page.locator('main a[href^="tel:"]').first()).toHaveAttribute('href','tel:+917976199548');
  // Admissions go to the school's WhatsApp (the hub number), never the call number.
  await expect(page.locator('main a[href*="wa.me"]')).toHaveCount(1);
  await expect(page.locator('main a[href*="wa.me"]')).toHaveAttribute('href',/^https:\/\/wa\.me\/918302207823\?text=/);
  await expect(page.locator('a[href*="wa.me/917976199548"]')).toHaveCount(0);
 });
 test(`${lang}: plain navigation, FAQs and the dated archive work without JavaScript`,async({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:820}});
  const page=await context.newPage();
  await page.goto(`${baseURL}/${lang}/faq/`);
  const disclosure=page.locator('#admissions-and-fees summary').first();
  await disclosure.click();
  await expect(disclosure.locator('..')).toHaveAttribute('open','');
  await page.goto(`${baseURL}/${lang}/gallery/`);
  await expect(page.locator('[data-enhanced-gallery]')).toBeHidden();
  await expect(page.locator('#photos [data-photo-open]').first()).toBeVisible();
  await expect(page.locator('#videos [data-video-src]').first()).toHaveAttribute('href',/\.mp4$/);
  await page.goto(`${baseURL}/${lang}/news/`);
  await page.locator(`a[href="/news/2025-01-15-sports-day-${lang}/"]`).click();
  await expect(page.locator('main time')).toHaveAttribute('datetime','2025-02-10');
  await expect(page.locator(`main a[href="/${lang}/news/#archive"]`)).toBeVisible();
  await context.close();
 });
 test(`${lang}: other interior pages pass serious/critical axe checks`,async({page})=>{
  for(const slug of publicInteriors.filter(slug=>!['gallery','contact'].includes(slug))){
   await page.goto(`/${lang}/${slug}/`);
   const result=await new AxeBuilder({page}).analyze();
   expect(result.violations.filter(v=>['serious','critical'].includes(v.impact??'')).map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),slug).toEqual([]);
  }
 });
}
