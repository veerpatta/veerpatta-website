import { expect, test } from '@playwright/test';

for (const lang of ['en', 'hi']) {
  test(`${lang}: reading and maths activities work with a keyboard and no JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled:false, viewport:{width:375,height:812} });
    try {
      const page = await context.newPage();
      await page.goto(`${baseURL}/${lang}/academics/#elga`);
      for (const id of ['reading-practice','maths-practice']) {
        const activity = page.locator('#'+id);
        await activity.locator('summary').focus();
        await page.keyboard.press('Enter');
        await expect(activity.locator('p')).toBeVisible();
      }
      await expect(page.locator('#reading-practice p')).toContainText('A map is in my bag.');
      await expect(page.locator('#maths-practice p')).toContainText('24');
      await expect(page.locator('main a[href^="https://leadschool.in/"]')).toHaveCount(3);
    } finally {
      await context.close();
    }
  });
}
