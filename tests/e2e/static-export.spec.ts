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

test('static export cart, checkout and merchant cockpit integration under wrangler pages dev', async ({
  page,
}) => {
  // 1. Visit product page from static build
  await page.goto('/produkte/korona-i');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'KORONA I',
  );

  // 2. Add to cart
  await page.getByRole('button', { name: /In den Warenkorb/i }).click();
  await expect(page.getByText(/in den Warenkorb gelegt/i)).toBeVisible();
  await expect(page.getByTestId('header-cart-badge')).toHaveText('1');

  // 3. Navigate to Warenkorb
  await page.goto('/warenkorb');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Warenkorb',
  );
  await expect(page.getByText('KORONA I')).toBeVisible();

  // 4. Navigate to Kasse
  await page.goto('/kasse');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Demo-Kasse',
  );

  // 5. Fill customer details
  await page.locator('#customer-name').fill('Wrangler Static Test');
  await page.locator('#customer-email').fill('static@wrangler-test.at');
  await page.locator('#street').fill('Museumsplatz 1');
  await page.locator('#zip').fill('1070');
  await page.locator('#city').fill('Wien');

  // 6. Submit demo order
  await page
    .getByRole('button', { name: /Verbindliche Demo-Bestellung aufgeben/i })
    .click();
  await expect(
    page.getByText('Vielen Dank für Ihre Bestellung!'),
  ).toBeVisible();
  await expect(page.getByText(/Auftragsnummer: LW-2026-/i)).toBeVisible();

  // 7. Verify Merchant Dashboard under static export
  await page.goto('/haendler');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Kaufmännische Steuerung',
  );
  const ordersTable = page.getByTestId('orders-table');
  await expect(ordersTable).toContainText('Wrangler Static Test');
  await expect(ordersTable).toContainText(
    'Lokale Demo-Bestellung (Dieser Browser)',
  );
});
