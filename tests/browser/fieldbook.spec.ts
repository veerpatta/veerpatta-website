import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const classes = ['Nursery', 'JKG', 'SKG', ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)];
function expectedDraft(lang: string, grade: string | null) {
  if (!grade) return lang === 'en' ? 'Admission enquiry' : 'प्रवेश पूछताछ';
  const earlyHindi: Record<string, string> = { Nursery: 'नर्सरी', JKG: 'जूनियर केजी', SKG: 'सीनियर केजी' };
  const translated = earlyHindi[grade] ?? grade.replace('Class ', 'कक्षा ');
  return lang === 'en' ? `Admission enquiry for ${grade}` : `${translated} के लिए प्रवेश पूछताछ`;
}

for (const lang of ['en', 'hi']) {
  test(`${lang} has 15 native class drafts with JavaScript disabled`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    const external: string[] = [];
    await context.route('**/*', route => {
      if (new URL(route.request().url()).origin === 'http://127.0.0.1:4321') return route.continue();
      external.push(route.request().url());
      return route.abort();
    });
    await page.goto(`http://127.0.0.1:4321/${lang}/admissions/#classes`);
    const choices = page.locator('#classes [data-admission-class]');
    await expect(choices).toHaveCount(15);
    for (const [i, grade] of classes.entries()) {
      const choice = choices.nth(i);
      await expect(choice).toBeVisible();
      await expect(choice).toHaveAttribute('data-admission-class', grade);
      const url = new URL((await choice.getAttribute('href'))!);
      expect(url.origin + url.pathname).toBe('https://wa.me/918302207823');
      expect([...url.searchParams.keys()]).toEqual(['text']);
      expect(url.searchParams.get('text')).toBe(expectedDraft(lang, grade));
      await expect(choice).toHaveAttribute('target', '_blank');
      await expect(choice).toHaveAttribute('rel', /noopener/);
    }
    await expect(page.locator('#enquiry form')).toHaveCount(0);
    await expect(page.locator('#enquiry a[href^="tel:"]')).toHaveAttribute('href', 'tel:+917976199548');
    expect(external).toEqual([]);
    await context.close();
  });
}

for (const lang of ['hi', 'en']) for (const stage of ['pre-primary', 'class-11']) {
  test(`${lang}/${stage} opens a draft for each named class and offers a separate office call`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const outside: string[] = [], posts: string[] = [];
    await page.route('**/*', route => {
      const url = route.request().url();
      if (route.request().method() !== 'GET') posts.push(url);
      if (!url.startsWith('http://127.0.0.1:4321/')) { outside.push(url); return route.abort(); }
      return route.continue();
    });
    await page.goto(`/${lang}/admissions/${stage}/?utm_source=mock`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `https://vpps.co.in/${lang}/admissions/${stage}/`);
    const actions = page.locator('.stage-actions [data-admission-class]');
    expect(await actions.evaluateAll(links => links.map(link => link.getAttribute('data-admission-class'))))
      .toEqual(stage === 'pre-primary' ? ['Nursery', 'JKG', 'SKG'] : ['Class 11']);
    await expect(actions.first()).toBeInViewport();
    for (const link of await page.locator('[data-whatsapp-enquiry]').all()) {
      const grade = await link.getAttribute('data-admission-class');
      const url = new URL((await link.getAttribute('href'))!);
      expect(url.origin + url.pathname).toBe('https://wa.me/918302207823');
      expect(url.searchParams.get('text')).toBe(expectedDraft(lang, grade));
      await expect(link).toHaveAttribute('target', '_blank');
    }
    await expect(page.locator('.stage-actions a[href^="tel:"]')).toHaveAttribute('href', 'tel:+917976199548');
    await expect(page.locator('#enquiry form')).toHaveCount(0);
    await expect(page.locator('#enquiry')).toContainText('+91 83022 07823');
    expect(posts).toEqual([]);
    expect(outside).toEqual([]);
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
