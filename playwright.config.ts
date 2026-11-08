import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/browser',timeout:45000,workers:2,fullyParallel:true,
 use:{baseURL:'http://127.0.0.1:4321',headless:true,serviceWorkers:'block',launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,args:['--no-sandbox']}},
 webServer:{command:'npm run preview -- --host 127.0.0.1 --port 4321',url:'http://127.0.0.1:4321/en/',reuseExistingServer:!process.env.CI,timeout:30000},
 reporter:[['list'],['html',{open:'never'}]]
});
