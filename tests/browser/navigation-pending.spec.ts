import { test, expect } from '@playwright/test';

for (const reduced of [false, true]) {
  test(`native navigation gives delayed logo feedback and clears on Back (reduced motion: ${reduced})`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const requests: string[] = [];
    page.on('request', r => requests.push(r.url()));
    await page.goto('/hi/');
    const pending = page.locator('[data-nav-pending]');
    await expect(pending).toBeHidden();
    expect(requests.some(url => url.endsWith('emblem-wait.gif'))).toBe(false);
    await page.locator('.skip-link').focus();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(550);
    await expect(pending).toBeHidden();

    const notices: string[] = [];
    page.on('console', m => { if (m.text().startsWith('NAV-WAIT')) notices.push(m.text()); });
    await page.evaluate(() => {
      const bar = document.querySelector<HTMLElement>('[data-nav-pending]')!;
      new MutationObserver(() => {
        if (!bar.hidden) console.info('NAV-WAIT', bar.querySelector('img')?.getAttribute('src'), document.querySelector('[data-nav-announcement]')?.textContent);
      }).observe(bar, { attributes:true, attributeFilter:['hidden'] });
    });
    await page.route('**/en/', async route => {
      await new Promise(resolve => setTimeout(resolve, 950));
      await route.continue();
    });
    await page.locator('.header-actions .language-link').click();
    await expect(page).toHaveURL(/\/en\/$/);
    expect(notices.some(s => s.includes(reduced ? 'vpps-emblem-48.png' : 'vpps-emblem-wait.gif') && s.includes('खुल रहा'))).toBe(true);
    await expect(pending).toBeHidden();
    await page.goBack();
    await expect(pending).toBeHidden();
    if (reduced) expect(requests.some(url => url.endsWith('emblem-wait.gif'))).toBe(false);
  });
}
