import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

import { siteRoutes } from './routes';

for (const route of siteRoutes) {
  test(`${route.name} route has no critical browser, overflow, or accessibility failures`, async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(route.path, { waitUntil: 'networkidle' });

    expect(response?.ok()).toBe(true);
    await expect(page.locator('main')).toBeVisible();

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    const seriousViolations = accessibility.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    );

    expect(seriousViolations).toEqual([]);
    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
}

test('the unconfigured master identifies itself without requiring project content', async ({
  page,
}) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { level: 1, name: 'Showcase Website Factory' }),
  ).toBeVisible();
  await expect(
    page.getByText('TEMPLATE_NOT_CONFIGURED', { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Configure the project' }),
  ).toHaveAttribute('href', '#configuration');
});

const reviewViewports = [
  { name: 'small-mobile', width: 320, height: 568 },
  { name: 'modern-mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1440, height: 1000 },
  { name: 'large-desktop', width: 1920, height: 1080 },
] as const;

test('@visual capture the five default review viewports', async ({ page }) => {
  const screenshotRoot = path.resolve('artifacts/qa/screenshots');
  await mkdir(screenshotRoot, { recursive: true });

  for (const viewport of reviewViewports) {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });

    for (const route of siteRoutes) {
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await page.screenshot({
        path: path.join(screenshotRoot, `${route.name}-${viewport.name}.png`),
        fullPage: true,
      });
    }
  }
});
