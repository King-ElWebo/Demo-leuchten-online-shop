import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'static-export.spec.ts',
  outputDir: 'artifacts/qa/static-test-results',
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:3101',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'export-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'export-mobile',
      use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } },
    },
  ],
  webServer: {
    command: 'pnpm preview:pages',
    url: 'http://127.0.0.1:3101',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
