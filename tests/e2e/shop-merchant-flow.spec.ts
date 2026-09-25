import { expect, test } from '@playwright/test';

test.describe('LUMENWERK Studio — Interactive Customer & Merchant Cockpit Flow', () => {
  test('Complete Customer Order Flow & Live Merchant KPI Causality', async ({
    page,
  }) => {
    // 1. Visit Catalog
    await page.goto('/katalog');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Architektonische Lichtinstrumente',
    );

    // Filter by material Messing
    await page.getByRole('button', { name: 'Messing', exact: true }).click();
    await expect(page.getByTestId('catalog-count')).toContainText('Modelle');

    // Reset filter
    await page.getByRole('button', { name: 'Filter zurücksetzen' }).click();

    // 2. Select product KORONA I
    await page.goto('/produkte/korona-i');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'KORONA I',
    );

    // Check photometrics table is visible
    await expect(page.getByText('Ra 98.4 (R9 > 92)')).toBeVisible();

    // Select second variant (Vulkanbasalt)
    await page.getByRole('radio', { name: /Vulkanbasalt Patina/i }).click();

    // Add to cart
    await page.getByRole('button', { name: /In den Warenkorb/i }).click();
    await expect(page.getByText(/in den Warenkorb gelegt/i)).toBeVisible();

    // Verify cart badge in header
    await expect(page.getByTestId('header-cart-badge')).toHaveText('1');

    // 3. Go to Warenkorb
    await page.goto('/warenkorb');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Warenkorb',
    );
    await expect(page.getByText('KORONA I')).toBeVisible();

    // 4. Proceed to Demo Checkout
    await page.goto('/kasse');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Demo-Kasse',
    );

    // Fill form
    await page.locator('#customer-name').fill('Architekturbüro Test & Partner');
    await page.locator('#customer-email').fill('test@architektur-wien.at');
    await page.locator('#street').fill('Mariahilfer Straße 100');
    await page.locator('#zip').fill('1070');
    await page.locator('#city').fill('Wien');

    // Submit order
    await page
      .getByRole('button', { name: /Verbindliche Demo-Bestellung aufgeben/i })
      .click();

    // Verify confirmation screen
    await expect(
      page.getByText('Vielen Dank für Ihre Bestellung!'),
    ).toBeVisible();
    await expect(page.getByText(/Auftragsnummer: LW-2026-/i)).toBeVisible();

    // 5. Navigate to Merchant Cockpit to verify causal reflection
    await page.goto('/haendler');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Kaufmännische Steuerung',
    );

    // Verify order is present in the table with browser demo badge
    const ordersTable = page.getByTestId('orders-table');
    await expect(ordersTable).toContainText('Architekturbüro Test & Partner');
    await expect(ordersTable).toContainText(
      'Lokale Demo-Bestellung (Dieser Browser)',
    );

    // Verify KPIs
    const revenueKpi = page.getByTestId('kpi-revenue');
    await expect(revenueKpi).toBeVisible();
    const ordersCountKpi = page.getByTestId('kpi-orders-count');
    await expect(ordersCountKpi).toBeVisible();

    // 6. Test Timeframe Switching
    await page.getByRole('button', { name: 'Letzte 7 Tage' }).click();
    await expect(
      page.getByRole('button', { name: 'Letzte 7 Tage' }),
    ).toHaveAttribute('aria-pressed', 'true');

    await page.getByRole('button', { name: 'Letzte 90 Tage' }).click();
    await expect(
      page.getByRole('button', { name: 'Letzte 90 Tage' }),
    ).toHaveAttribute('aria-pressed', 'true');

    // 7. Click on order to open detail modal
    await page.getByText('Architekturbüro Test & Partner').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText(
      'Lokale Demo-Bestellung aus diesem Browser',
    );
    await page.getByRole('button', { name: 'Schließen', exact: true }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('Interactive Konfigurator allows Kelvin manipulation and cart integration', async ({
    page,
  }) => {
    await page.goto('/konfigurator');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Leuchten-Konfigurator',
    );

    // Change Kelvin slider
    const slider = page.locator('#kelvin-slider');
    await slider.waitFor({ state: 'visible' });
    await slider.evaluate((node: HTMLInputElement) => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      setter?.call(node, '2200');
      node.dispatchEvent(new Event('input', { bubbles: true }));
      node.dispatchEvent(new Event('change', { bubbles: true }));
    });
    await expect(page.getByText('2200 K', { exact: true })).toBeVisible();

    // Change ambient mode to night
    await page.getByRole('button', { name: 'Nacht' }).click();

    // Select different finish
    await page.getByRole('radio', { name: /Schwarzstahl/i }).click();

    // Add configuration to cart
    await page
      .getByRole('button', {
        name: /Konfiguration in den Warenkorb übernehmen/i,
      })
      .click();
    await expect(
      page.getByText(/wurde dem Warenkorb hinzugefügt/i),
    ).toBeVisible();
  });
});
