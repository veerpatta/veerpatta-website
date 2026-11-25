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
 test(`${lang} menu closes and restores focus; the quick bar opens WhatsApp and keeps Call school`,async({page})=>{
  await page.setViewportSize({width:375,height:800});await page.goto(`/${lang}/`);
  const menu=page.locator('[data-mobile-menu]');const summary=menu.locator('summary');await summary.click();await expect(menu).toHaveAttribute('open','');await page.keyboard.press('Escape');await expect(menu).not.toHaveAttribute('open','');await expect(summary).toBeFocused();
  const bar=page.locator('.mobile-contact');await expect(bar).toBeVisible();await expect(bar.locator('a[href^="tel:"]')).toHaveAttribute('href','tel:+917976199548');
  const wa=bar.locator('[data-whatsapp-enquiry]');await expect(wa).toBeVisible();const url=new URL((await wa.getAttribute('href'))!);
  expect(url.origin+url.pathname).toBe('https://wa.me/918302207823');expect(url.searchParams.get('text')).toBe(lang==='hi'?'प्रवेश पूछताछ':'Admission enquiry');
  await expect(wa).toHaveAttribute('target','_blank');await expect(wa).toHaveAttribute('rel',/noopener/);await expect(page.locator('#enquiry-dialog')).toHaveCount(0);
 });
 test(`${lang} gallery filters, full photo and direct URL state`,async({page})=>{
  await page.goto(`/${lang}/gallery/?category=sports`);await expect(page.locator('[data-gallery-filter=sports]')).toHaveAttribute('aria-pressed','true');expect(await page.locator('[data-gallery-category]:visible').count()).toBeGreaterThan(0);expect(await page.locator('[data-gallery-category=campus]:visible').count()).toBe(0);
  await page.locator('[data-gallery-filter=campus]').click();await expect(page).toHaveURL(/category=campus/);const first=page.locator('[data-photo-open]:visible').first();await first.click();await expect(page.locator('#photo-dialog')).toBeVisible();await expect(page.locator('#photo-dialog img')).toHaveAttribute('alt',/.+/);await page.keyboard.press('Escape');await expect(first).toBeFocused();await page.locator('[data-gallery-filter=all]').click();expect(await page.locator('[data-gallery-category]:visible').count()).toBeGreaterThan(20);
 });
 test(`${lang} video is tap loaded and muted with descriptive captions`,async({page})=>{
  const mp4:string[]=[];page.on('request',r=>{if(r.url().includes('.mp4'))mp4.push(r.url());});await page.goto(`/${lang}/`);expect(mp4).toHaveLength(0);await page.locator('[data-video-id=campus-spaces]').click();await expect(page.locator('video')).toBeVisible();await expect(page.locator('video track')).toHaveCount(2);expect(await page.locator('video').evaluate((v:HTMLVideoElement)=>v.muted)).toBe(true);await expect.poll(()=>mp4.length).toBeGreaterThan(0);
 });
 test(`${lang} accessibility scan has no serious or critical findings`,async({page})=>{
  for(const slug of ['', 'admissions','gallery','contact']){await page.goto(`/${lang}/${slug?slug+'/':''}`);const result=await new AxeBuilder({page}).analyze();const important=result.violations.filter(v=>['critical','serious'].includes(v.impact||''));expect(important.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
 });
}
test('admissions enquiry opens the school WhatsApp in a new tab and the page itself sends nothing',async({page,context})=>{
 const posts:string[]=[];page.on('request',r=>{if(r.method()!=='GET')posts.push(r.url());});
 await context.route('https://wa.me/**',r=>r.fulfill({status:200,contentType:'text/html',body:'<title>WhatsApp</title>'}));
 for(const lang of ['en','hi']){
  await page.goto(`/${lang}/admissions/`);const card=page.locator('#enquiry');await expect(card.locator('form')).toHaveCount(0);
  await expect(card).toContainText('+91 83022 07823');await expect(card.locator('a[href^="tel:"]')).toHaveAttribute('href','tel:+917976199548');
  const [popup]=await Promise.all([page.waitForEvent('popup'),card.locator('[data-whatsapp-enquiry]').click()]);
  expect(popup.url()).toBe(lang==='hi'?'https://wa.me/918302207823?text=%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A5%87%E0%A4%B6%20%E0%A4%AA%E0%A5%82%E0%A4%9B%E0%A4%A4%E0%A4%BE%E0%A4%9B':'https://wa.me/918302207823?text=Admission%20enquiry');await popup.close();
 }
 expect(posts).toEqual([]);
});
test('budget starts blank, calculates only entered costs and clears stale result on edit',async({page})=>{
 await page.goto('/en/admissions/#budget');await page.locator('#budget-tuition').fill('12000');await page.locator('#budget-admission').fill('2000');await page.locator('[data-budget-calculate]').click();await expect(page.locator('[data-budget-annual]')).toContainText('12,000');await expect(page.locator('[data-budget-first]')).toContainText('14,000');await page.locator('#budget-tuition').fill('-10');await page.locator('[data-budget-calculate]').click();await expect(page.locator('[data-budget-result]')).not.toBeVisible();await expect(page.locator('[data-budget-error]')).not.toBeEmpty();
});
test('no-JavaScript pages retain navigation, FAQs, the WhatsApp enquiry and media links',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:800}});const page=await context.newPage();await page.goto('http://127.0.0.1:4321/hi/admissions/');await expect(page.locator('#enquiry [data-whatsapp-enquiry]')).toHaveAttribute('href',/^https:\/\/wa\.me\/918302207823\?text=/);await page.locator('[data-mobile-menu] summary').click();await expect(page.locator('[data-mobile-menu] nav')).toBeVisible();await page.goto('http://127.0.0.1:4321/en/gallery/');await expect(page.locator('[data-photo-open]').first()).toHaveAttribute('href',/webp$/);await expect(page.locator('[data-video-src]').first()).toHaveAttribute('href',/mp4$/);await context.close();
});
test('screenshots and reduced-motion layout',async({page})=>{
 const loadPhotos=async()=>{await page.locator('img[src]').evaluateAll(imgs=>{for(const img of imgs as HTMLImageElement[])img.loading='eager';});await expect.poll(()=>page.locator('img[src]').evaluateAll(imgs=>imgs.every((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0))).toBe(true);};
 await page.setViewportSize({width:1440,height:1000});await page.goto('/en/');await loadPhotos();await page.screenshot({path:'test-results/home-en-desktop.png',fullPage:true});
 await page.setViewportSize({width:375,height:812});await page.goto('/hi/');await loadPhotos();await page.screenshot({path:'test-results/home-hi-mobile.png',fullPage:true});await page.emulateMedia({reducedMotion:'reduce'});expect(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('high-density phones load the smaller homepage photographs', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ viewport: { width: 412, height: 839 }, deviceScaleFactor: 3, isMobile: true });
  const page = await context.newPage();
  await page.goto(`${baseURL}/hi/`);
  const photos = [
    { selector: '.front-photo img', file: /amet-campus-wide-(480|800)\.(?:avif|webp)$/ },
    { selector: '.project-spread figure img', file: /circulatory-model-(480|640)\.(?:avif|webp)$/ },
    { selector: '#school-film [data-video-src] img', file: /campus-spaces-poster-(480|640)\.(?:avif|webp)$/ },
  ];
  for (const photo of photos) {
    const image = page.locator(photo.selector);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0 ? img.currentSrc : '')).toMatch(photo.file);
  }
  await context.close();
});
