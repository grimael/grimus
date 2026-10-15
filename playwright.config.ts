import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: [['list']],
  use: { baseURL: 'http://127.0.0.1:4322', channel: process.env.CI ? undefined : 'chrome', trace: 'retain-on-failure' },
  webServer: { command: 'node scripts/qa-server.mjs', url: 'http://127.0.0.1:4322', reuseExistingServer: false, timeout: 15000 }
});
