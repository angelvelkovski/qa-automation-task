import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';
import type { TestOptions } from './src/fixtures';
import { authFile } from './src/utils/auth';

export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true, suiteTitle: false }],
  ],
  // actionTimeout < test timeout: a missing element fails fast as an ordinary error (so test.fail counts it).
  use: { actionTimeout: 5_000, launchOptions: { slowMo: Number(process.env.SLOWMO ?? 0) }, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [
    // Logs in once per user and saves storageState; UI projects reuse it.
    {
      name: 'setup',
      testDir: './tests/setup',
      testMatch: /.*\.setup\.ts/,
      use: { ...devices['Desktop Chrome'], baseURL: env.uiBaseUrl, testIdAttribute: 'data-test' },
    },
    {
      name: 'ui-standard',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.uiBaseUrl,
        testIdAttribute: 'data-test',
        userKey: 'standard',
        storageState: authFile('standard'),
      },
    },
    {
      name: 'ui-problem',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.uiBaseUrl,
        testIdAttribute: 'data-test',
        userKey: 'problem',
        storageState: authFile('problem'),
      },
    },
    { name: 'api', testDir: './tests/api', use: { baseURL: env.apiBaseUrl } },
  ],
});
