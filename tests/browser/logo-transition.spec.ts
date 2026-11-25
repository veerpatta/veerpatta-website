import { test, expect } from '@playwright/test';

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(`a slow native navigation displays the exact ${reducedMotion === 'reduce' ? 'still' : 'animated'} school mark`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto('/en/');
    const pending = page.locator('[data-nav-pending]');
    await expect(pending.locator('img')).toHaveCount(0);
    await page.locator('.cover-film').click();
    await expect(pending).toBeHidden();
    expect(await page.evaluate(() => performance.getEntriesByType('resource').some(r => r.name.includes('vpps-book.gif')))).toBe(false);

    // A locator waits for a cross-document navigation. Observe the outgoing document before it leaves.
    const shown: {file:string; message:string; width:number}[] = [];
    page.on('console', msg => {
      if (msg.text().startsWith('School mark ')) shown.push(JSON.parse(msg.text().slice(12)));
    });
    await page.evaluate(() => {
      const bar = document.querySelector<HTMLElement>('[data-nav-pending]')!;
      new MutationObserver(() => {
        if (bar.hidden) return;
        const image = bar.querySelector('img')!;
        const report = () => console.info('School mark '+JSON.stringify({
          file: image.currentSrc.split('/').pop(),
          message: document.querySelector('[data-nav-announcement]')?.textContent,
          width: image.naturalWidth
        }));
        if (image.complete && image.naturalWidth) report();
        else image.addEventListener('load', report, { once:true });
      }).observe(bar, { attributes:true, attributeFilter:['hidden'] });
    });
    await page.route('**/hi/', async route => {
      await new Promise(resolve => setTimeout(resolve, 1800));
      await route.continue();
    });
    await page.locator('.header-actions .language-link').click();
    await expect(page).toHaveURL(/\/hi\/$/);
    const expected = reducedMotion === 'reduce' ? 'school-mark-48.png' : 'vpps-book.gif';
    expect(shown.some(s => s.file === expected && s.width > 0 && s.message.startsWith('Opening the next page'))).toBe(true);
    await expect(page.locator('[data-nav-pending]')).toBeHidden();
    await page.goBack();
    await expect(page.locator('[data-nav-pending]')).toBeHidden();
  });
}
