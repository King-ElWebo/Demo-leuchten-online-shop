import { expect, test } from '@playwright/test';

import { siteRoutes } from './routes';

for (const route of siteRoutes) {
  test(`${route.name} loads and reloads from the static export`, async ({
    page,
  }) => {
    const response = await page.goto(route.path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();

    const reloaded = await page.reload();
    expect(reloaded?.status()).toBe(200);
    await expect(page.locator('main')).toBeVisible();

    const images = page.locator('main img:visible');
    for (let index = 0; index < (await images.count()); index++) {
      const image = images.nth(index);
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((element: HTMLImageElement) => element.naturalWidth),
        )
        .toBeGreaterThan(0);
      const source = await image.getAttribute('src');
      if (source?.startsWith('/media/') && !source.endsWith('.svg')) {
        const sourceSet = await image.getAttribute('srcset');
        expect(sourceSet).toContain('/media/responsive/');
        expect(sourceSet?.split(',').length).toBeGreaterThan(1);
      }
    }
  });
}

test('the unconfigured template link works from the static export', async ({
  page,
}) => {
  await page.goto('/');
  const configure = page.getByRole('link', { name: 'Configure the project' });
  test.skip(
    (await configure.count()) === 0,
    'Configured projects replace this test with their key interactions.',
  );
  await configure.click();
  await expect(page).toHaveURL(/#configuration$/);
  await expect(page.locator('#configuration')).toBeInViewport();
});
