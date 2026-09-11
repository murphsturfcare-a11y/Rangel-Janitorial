import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  workers: 3,
  reporter: [['list']],
  use: {baseURL: 'http://localhost:4173', trace: 'retain-on-failure', screenshot: 'only-on-failure', reducedMotion: 'reduce'},
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
  webServer: {
    command: "GHL_API_KEY=qa-disabled GHL_LOCATION_ID=qa-disabled CI=true netlify dev --offline --framework '#static' --dir out --port 4173 --no-open",
    url: 'http://localhost:4173', reuseExistingServer: !process.env.CI, timeout: 60_000,
  },
});
