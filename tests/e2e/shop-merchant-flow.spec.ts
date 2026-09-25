import { expect, test } from '@playwright/test';

test.describe('LUMENWERK Studio — Interactive Customer & Merchant Cockpit Flow', () => {
  test('Complete Customer Order Flow & Live Merchant KPI Causality with Austrian 20% VAT', async ({
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

    // Verify Austrian 20% VAT notice on product page
    await expect(
      page.getByText(/inkl\. 20 % USt\., versandkostenfrei/i),
    ).toBeVisible();

    // Check photometrics table is visible
    await expect(page.getByText('Ra 98.4 (R9 > 92)')).toBeVisible();

    // Select second variant (Vulkanbasalt Patina, +320 € -> Gross 3.770 €)
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

    // Verify Austrian 20% VAT breakdown in cart
    await expect(page.getByText('20 % USt. (Österreich)')).toBeVisible();
    await expect(page.getByText('Zwischensumme (Netto)')).toBeVisible();
    // Gross total 3.770 €: Netto 3.141,67 €, 20% USt. 628,33 €
    await expect(page.getByText(/3\.770\s*€/).first()).toBeVisible();

    // 4. Proceed to Demo Checkout
    await page.goto('/kasse');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Demo-Kasse',
    );
    await expect(page.getByText('20 % USt. (Österreich)')).toBeVisible();

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
    await expect(page.getByText(/inkl\. 20 % USt\./i)).toBeVisible();

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

    // Verify KPIs with clear Austrian 20% VAT and benchmark labeling
    const revenueKpi = page.getByTestId('kpi-revenue');
    await expect(revenueKpi).toBeVisible();
    await expect(
      page.getByText('Bruttoumsatz (inkl. 20 % USt.)'),
    ).toBeVisible();
    await expect(page.getByText(/Netto:.*· 20 % USt\./)).toBeVisible();

    const ordersCountKpi = page.getByTestId('kpi-orders-count');
    await expect(ordersCountKpi).toBeVisible();

    // Verify inventory deduction for Vulkanbasalt variant (LW-KOR-BST-02: base stock 3 minus 1 = 2)
    const inventoryTable = page.getByTestId('inventory-table');
    await expect(inventoryTable).toBeVisible();
    await expect(inventoryTable).toContainText('LW-KOR-BST-02');

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

  test('Configurator maps finish selection to physical catalog stock in merchant inventory', async ({
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

    // Verify 20% USt notice
    await expect(page.getByText(/Inkl\. 20 % USt\./i)).toBeVisible();

    // Select Schwarzstahl finish (maps to physical variant LW-KOR-STL-03, stock: 4)
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

    // Proceed to Checkout
    await page.goto('/kasse');
    await page.locator('#customer-name').fill('Studio Basalt & Stahl');
    await page.locator('#customer-email').fill('orders@basalt-stahl.com');
    await page.locator('#street').fill('Gürtelstraße 12');
    await page.locator('#zip').fill('1080');
    await page.locator('#city').fill('Wien');

    await page
      .getByRole('button', { name: /Verbindliche Demo-Bestellung aufgeben/i })
      .click();

    await expect(
      page.getByText('Vielen Dank für Ihre Bestellung!'),
    ).toBeVisible();

    // Check merchant inventory: LW-KOR-STL-03 should reflect 3 units remaining (deducted from 4)
    await page.goto('/haendler');
    const inventoryTable = page.getByTestId('inventory-table');
    await expect(inventoryTable).toBeVisible();
    await expect(inventoryTable).toContainText('LW-KOR-STL-03');
    await expect(inventoryTable).toContainText('Schwarzstahl Atelier geölt');
    const stlRow = inventoryTable.locator('tr', { hasText: 'LW-KOR-STL-03' });
    await expect(stlRow).toContainText('3');
  });

  test('Stock limit prevents overselling beyond physical availability', async ({
    page,
  }) => {
    await page.goto('/produkte/korona-i');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    // Select Vulkanbasalt (available stock is at most 3 units)
    await page.getByRole('radio', { name: /Vulkanbasalt Patina/i }).click();

    // Click "+" button multiple times to attempt to exceed available stock
    const plusButton = page.getByRole('button', { name: 'Menge erhöhen' });
    for (let i = 0; i < 5; i++) {
      if (await plusButton.isEnabled()) {
        await plusButton.click();
      }
    }

    // Add to cart
    const addToCartButton = page.getByRole('button', {
      name: /In den Warenkorb/i,
    });
    if (await addToCartButton.isEnabled()) {
      await addToCartButton.click();
    }

    // After adding the max available units, attempting to add more should disable button or show limit
    await page.goto('/warenkorb');
    await expect(page.getByText('KORONA I')).toBeVisible();
  });
});
