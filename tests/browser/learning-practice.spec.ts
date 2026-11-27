import { expect, test } from '@playwright/test';

for (const lang of ['en', 'hi']) {
  const other = lang === 'en' ? 'hi' : 'en';

  test(`${lang}: switching languages keeps the class group and gallery selection`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto(`/${lang}/academics/#middle`);
    await page.locator('#middle .stage-enquiry').click();
    const languageLink = page.locator('.header-actions [data-language-switch]');
    await expect(languageLink).toHaveAttribute('href', `/${other}/admissions/#middle-classes`);
    await languageLink.click();
    await expect(page).toHaveURL(new RegExp(`/${other}/admissions/#middle-classes$`));
    await expect(page.locator('#middle-classes [data-admission-class]')).toHaveCount(3);
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`/${lang}/admissions/#middle-classes$`));

    await page.goto(`/${lang}/gallery/?category=sports&utm_source=example#photos`);
    await page.getByRole('button').and(page.locator('[data-gallery-filter=ncc]')).click();
    await expect(languageLink).toHaveAttribute('href', `/${other}/gallery/?category=ncc#photos`);
    await languageLink.click();
    await expect(page.locator('[data-gallery-filter=ncc]')).toHaveAttribute('aria-pressed','true');
  });

  test(`${lang}: the smallest portrait phone has all three parent actions on the first screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto(`/${lang}/`);
    const actions = page.locator('.mobile-contact');
    await expect(actions.locator('a')).toHaveCount(3);
    for (const action of await actions.locator('a').all()) {
      await expect(action).toBeInViewport({ ratio: 1 });
      const size = await action.boundingBox();
      expect(size?.height).toBeGreaterThanOrEqual(44);
      expect(size?.width).toBeGreaterThanOrEqual(44);
    }
    await expect(actions.locator('.mobile-call')).toHaveAttribute('href','tel:+917976199548');
    await actions.locator('.mobile-admission').click();
    await expect(page).toHaveURL(new RegExp(`/${lang}/admissions/#classes$`));
    await expect(page.locator('#classes [data-admission-class]')).toHaveCount(15);
  });

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
