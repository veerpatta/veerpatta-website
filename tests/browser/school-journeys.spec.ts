import {test,expect} from '@playwright/test';

for (const lang of ['en','hi']) {
  test(`${lang}: from the homepage to all 15 class enquiries without JavaScript`, async ({browser,baseURL}) => {
    const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:812}});
    const page = await context.newPage();
    const outside:string[]=[];
    await context.route('**/*', route => {
      if (new URL(route.request().url()).origin !== new URL(baseURL!).origin || route.request().method() !== 'GET') {
        outside.push(route.request().method()); return route.abort();
      }
      return route.continue();
    });
    await page.goto(`${baseURL}/${lang}/`);
    await page.locator('.amet-actions .cover-main').click();
    await expect(page).toHaveURL(new RegExp('/'+lang+'/admissions/#choose-class$'));
    const options=page.locator('.class-option');
    const labels=[lang==='hi'?'नर्सरी':'Nursery','JKG','SKG',...Array.from({length:12},(_,i)=>(lang==='hi'?'कक्षा ':'Class ')+(i+1))];
    await expect(options).toHaveCount(labels.length);
    for (const [i,label] of labels.entries()) {
      const option=options.nth(i),summary=option.locator('summary');
      await expect(summary).toHaveText(label);
      await summary.focus(); await page.keyboard.press('Enter');
      const link=option.locator('[data-class-enquiry]');
      await expect(link).toBeVisible();
      await expect(page.locator('.class-option[open]')).toHaveCount(1);
      const url=new URL((await link.getAttribute('href'))!);
      expect(url.origin+url.pathname).toBe('https://wa.me/918302207823');
      expect(url.searchParams.get('text')).toBe((lang==='hi'?'प्रवेश पूछताछ':'Admission enquiry')+' · '+label);
    }
    await expect(page.locator('.chooser-fallback a')).toHaveAttribute('href','tel:+917976199548');
    await expect(page.locator('#budget')).toBeAttached();
    expect(outside).toEqual([]);
    await context.close();
  });
}
