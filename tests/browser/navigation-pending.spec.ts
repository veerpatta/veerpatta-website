import {test,expect} from '@playwright/test';
test('a delayed language change announces, native Back clears it, same-page anchors never trigger it',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/hi/');
 const notices:string[]=[];page.on('console',m=>{if(m.text().startsWith('NAV-NOTICE:'))notices.push(m.text());});
 await page.evaluate(()=>{const bar=document.querySelector<HTMLElement>('[data-nav-pending]')!,live=document.querySelector('[data-nav-announcement]')!;new MutationObserver(()=>{if(!bar.hidden)console.info('NAV-NOTICE:'+live.textContent);}).observe(bar,{attributes:true,attributeFilter:['hidden']});});
 await page.route('**/en/',async r=>{await new Promise(resolve=>setTimeout(resolve,900));await r.continue();});
 await page.locator('.header-actions .language-link').click();await expect(page).toHaveURL(/\/en\/$/);expect(notices.some(s=>s.includes('खुल रहा'))).toBe(true);await expect(page.locator('[data-nav-pending]')).not.toBeVisible();await page.goBack();await expect(page.locator('[data-nav-pending]')).not.toBeVisible();await page.locator('.cover-film').click();await page.waitForTimeout(370);await expect(page.locator('[data-nav-pending]')).not.toBeVisible();
});
