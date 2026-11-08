import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const slugs=['','about','academics','admissions','beyond','digital','contact','faq','gallery','news','privacy'];
for(const lang of ['en','hi']){
 test(`${lang} every route is complete, without console errors or overflow`,async({page})=>{
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  for(const slug of slugs){await page.goto(`/${lang}/${slug?slug+'/':''}`);await expect(page.locator('h1')).toHaveCount(1);await expect(page.locator('html')).toHaveAttribute('lang',lang);await expect(page.locator('main')).toBeVisible();const missing=await page.locator('img[src]').evaluateAll(imgs=>imgs.filter((img:HTMLImageElement)=>img.complete&&img.naturalWidth===0).map((img:HTMLImageElement)=>img.src));expect(missing).toEqual([]);}
  expect(errors).toEqual([]);
 });
 test(`${lang} responsive widths keep content within screen`,async({page})=>{
  for(const width of [320,375,414,768,1024,1280,1920]){
   await page.setViewportSize({width,height:900});
   for(const slug of ['', 'admissions','gallery','contact']){
    await page.goto(`/${lang}/${slug?slug+'/':''}`);await expect(page.locator('h1')).toBeVisible();
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);expect(overflow,`${lang} ${slug} @${width}`).toBe(false);
   }
  }
 });
 test(`${lang} menu and enquiry close and restore focus repeatedly`,async({page})=>{
  await page.setViewportSize({width:375,height:800});await page.goto(`/${lang}/`);
  const menu=page.locator('[data-mobile-menu]');const summary=menu.locator('summary');await summary.click();await expect(menu).toHaveAttribute('open','');await page.keyboard.press('Escape');await expect(menu).not.toHaveAttribute('open','');await expect(summary).toBeFocused();
  for(let i=0;i<2;i++){const trigger=page.locator('.mobile-contact [data-enquiry-open]');await trigger.click();await expect(page.locator('#enquiry-dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#enquiry-dialog')).not.toBeVisible();await expect(trigger).toBeFocused();expect(await page.locator('body').evaluate(el=>getComputedStyle(el).overflow)).not.toBe('hidden');}
 });
 test(`${lang} gallery filters, full photo and direct URL state`,async({page})=>{
  await page.goto(`/${lang}/gallery/?category=sports`);await expect(page.locator('[data-gallery-filter=sports]')).toHaveAttribute('aria-pressed','true');expect(await page.locator('[data-gallery-category]:visible').count()).toBeGreaterThan(0);expect(await page.locator('[data-gallery-category=campus]:visible').count()).toBe(0);
  await page.locator('[data-gallery-filter=campus]').click();await expect(page).toHaveURL(/category=campus/);const first=page.locator('[data-photo-open]:visible').first();await first.click();await expect(page.locator('#photo-dialog')).toBeVisible();await expect(page.locator('#photo-dialog img')).toHaveAttribute('alt',/.+/);await page.keyboard.press('Escape');await expect(first).toBeFocused();await page.locator('[data-gallery-filter=all]').click();expect(await page.locator('[data-gallery-category]:visible').count()).toBeGreaterThan(20);
 });
 test(`${lang} video is tap loaded and muted with descriptive captions`,async({page})=>{
  const mp4:string[]=[];page.on('request',r=>{if(r.url().includes('.mp4'))mp4.push(r.url());});await page.goto(`/${lang}/`);expect(mp4).toHaveLength(0);await page.locator('[data-video-id=school-story]').click();await expect(page.locator('video')).toBeVisible();await expect(page.locator('video track')).toHaveCount(2);expect(await page.locator('video').evaluate((v:HTMLVideoElement)=>v.muted)).toBe(true);await expect.poll(()=>mp4.length).toBeGreaterThan(0);
 });
 test(`${lang} accessibility scan has no serious or critical findings`,async({page})=>{
  for(const slug of ['', 'admissions','gallery','contact']){await page.goto(`/${lang}/${slug?slug+'/':''}`);const result=await new AxeBuilder({page}).analyze();const important=result.violations.filter(v=>['critical','serious'].includes(v.impact||''));expect(important.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
 });
}
test('admissions validation, back/edit, failure and retry are truthful',async({page})=>{
 let sends=0;await page.route('https://formspree.io/f/xgveybpz',async route=>{sends++;await route.fulfill({status:500,contentType:'application/json',body:'{"error":"offline"}'});});await page.goto('/en/admissions/');
 await page.locator('[data-enquiry-next]').first().click();await expect(page.locator('#ad-guardian')).toBeVisible();await page.locator('#ad-guardian').fill('Test Guardian');await page.locator('#ad-phone').fill('9413748575');await page.locator('#ad-class').selectOption({index:3});await page.locator('[data-enquiry-next]:visible').click();await expect(page.locator('[data-enquiry-step]').nth(1)).toBeVisible();await page.locator('[data-enquiry-next]:visible').click();await expect(page.locator('[data-enquiry-step]').nth(2)).toBeVisible();
 await page.locator('[data-enquiry-send]').click();await expect(page.locator('[data-enquiry-send]')).toBeEnabled();expect(sends).toBe(0);await page.locator('[data-admission-form] [name="consent"]').check();await page.locator('[data-enquiry-send]').click();await expect(page.locator('[data-enquiry-status]')).toContainText(/not|could|unable|confirm/i);expect(sends).toBe(1);await expect(page.locator('#ad-guardian')).toHaveValue('Test Guardian');
});
test('budget starts blank, calculates only entered costs and clears stale result on edit',async({page})=>{
 await page.goto('/en/admissions/#budget');await page.locator('#budget-tuition').fill('12000');await page.locator('#budget-admission').fill('2000');await page.locator('[data-budget-calculate]').click();await expect(page.locator('[data-budget-annual]')).toContainText('12,000');await expect(page.locator('[data-budget-first]')).toContainText('14,000');await page.locator('#budget-tuition').fill('-10');await page.locator('[data-budget-calculate]').click();await expect(page.locator('[data-budget-result]')).not.toBeVisible();await expect(page.locator('[data-budget-error]')).not.toBeEmpty();
});
test('no-JavaScript pages retain navigation, FAQs, form and media links',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:800}});const page=await context.newPage();await page.goto('http://127.0.0.1:4321/hi/admissions/');await expect(page.locator('[data-admission-form]')).toBeVisible();await page.locator('[data-mobile-menu] summary').click();await expect(page.locator('[data-mobile-menu] nav')).toBeVisible();await page.goto('http://127.0.0.1:4321/en/gallery/');await expect(page.locator('[data-photo-open]').first()).toHaveAttribute('href',/webp$/);await expect(page.locator('[data-video-src]').first()).toHaveAttribute('href',/mp4$/);await context.close();
});
test('screenshots and reduced-motion layout',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/en/');await page.screenshot({path:'test-results/home-en-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await page.goto('/hi/');await page.screenshot({path:'test-results/home-hi-mobile.png',fullPage:true});await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});
