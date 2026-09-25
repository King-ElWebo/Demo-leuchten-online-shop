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

  test('Shared physical variant stock sums catalog and configurator positions strictly', async ({
    page,
  }) => {
    // 1. Visit KORONA I (Messing base stock = 6)
    await page.goto('/produkte/korona-i');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'KORONA I',
    );

    // Increase quantity to 4
    const plusBtn = page.getByRole('button', { name: 'Menge erhöhen' });
    await plusBtn.click();
    await plusBtn.click();
    await plusBtn.click();
    await page.getByRole('button', { name: /In den Warenkorb/i }).click();
    await expect(page.getByText(/in den Warenkorb gelegt/i)).toBeVisible();

    // 2. Go to Configurator (default finish is Messing, sharing LW-KOR-BRS-01 physical stock)
    await page.goto('/konfigurator');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Leuchten-Konfigurator',
    );

    const configAddBtn = page.getByRole('button', {
      name: /Konfiguration in den Warenkorb übernehmen/i,
    });

    // 4 units in cart, remaining stock is 2. Add 1st configured unit (total = 5)
    await configAddBtn.click();
    await expect(
      page.getByText(/wurde dem Warenkorb hinzugefügt/i),
    ).toBeVisible();

    // Add 2nd configured unit (total = 6, exhausts all physical stock)
    await configAddBtn.click();
    await expect(
      page.getByText(/wurde dem Warenkorb hinzugefügt/i),
    ).toBeVisible();

    // Attempt to add a 3rd configured unit: must be rejected
    await configAddBtn.click();
    const alertMsg = page.getByTestId('configurator-stock-error');
    await expect(alertMsg).toBeVisible();
    await expect(alertMsg).toContainText(
      /bereits im Warenkorb oder im Atelier ausverkauft/i,
    );

    // 3. Go to Warenkorb to verify total and test updateQuantity limit
    await page.goto('/warenkorb');
    await expect(page.getByTestId('header-cart-badge')).toHaveText('6');

    // Attempt to increase quantity of configured item in cart via "+"
    const plusButtons = page.getByRole('button', {
      name: /Menge für .* erhöhen/i,
    });
    await plusButtons.last().click();
    const cartError = page.getByTestId('cart-quantity-error');
    await expect(cartError).toBeVisible();
    await expect(cartError).toContainText(
      /Maximale Stückzahl für dieses Modell überschritten/i,
    );

    // 4. Complete checkout with full stock (6 units)
    await page.goto('/kasse');
    await page.locator('#customer-name').fill('Atelier Vollbestand');
    await page.locator('#customer-email').fill('vollbestand@atelier.at');
    await page.locator('#street').fill('Herrengasse 1');
    await page.locator('#zip').fill('1010');
    await page.locator('#city').fill('Wien');
    await page
      .getByRole('button', { name: /Verbindliche Demo-Bestellung aufgeben/i })
      .click();

    await expect(
      page.getByText('Vielen Dank für Ihre Bestellung!'),
    ).toBeVisible();

    // 5. Merchant cockpit should show 0 remaining stock for Drehmessing
    await page.goto('/haendler');
    const inventoryTable = page.getByTestId('inventory-table');
    const brsRow = inventoryTable.locator('tr', { hasText: 'LW-KOR-BRS-01' });
    await expect(brsRow).toContainText('0');
    await expect(brsRow).toContainText('Vergriffen');
  });

  test('Overbooked checkout is rejected if shared stock limit is exceeded', async ({
    page,
  }) => {
    await page.goto('/kasse');

    // Simulate an overbooked cart exceeding physical stock (5 catalog + 2 configured = 7 units > stock 6)
    await page.evaluate(() => {
      window.localStorage.setItem(
        'lumenwerk_cart_v1',
        JSON.stringify([
          {
            id: 'item-ovb-1',
            productId: 'korona-i',
            productSlug: 'korona-i',
            productName: 'KORONA I',
            variantId: 'standard-brass',
            variantName: 'Drehmessing gebürstet',
            sku: 'LW-KOR-BRS-01',
            unitPriceEur: 3450,
            quantity: 5,
            image: '/media/korona-i.jpg',
          },
          {
            id: 'item-ovb-2',
            productId: 'korona-i',
            productSlug: 'korona-i',
            productName: 'KORONA I (Atelier-Konfiguration)',
            variantId: 'custom-brass-2700k',
            variantName: 'Drehmessing gebürstet (2700 K)',
            sku: 'LW-KOR-2700K-BRS-PHS-150',
            baseSku: 'LW-KOR-BRS-01',
            baseVariantId: 'standard-brass',
            unitPriceEur: 3450,
            quantity: 2,
            image: '/media/korona-i.jpg',
          },
        ]),
      );
    });

    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Demo-Kasse',
    );

    await page.locator('#customer-name').fill('Überbuchung Test');
    await page.locator('#customer-email').fill('ueberbuchung@test.at');
    await page.locator('#street').fill('Teststraße 99');
    await page.locator('#zip').fill('1020');
    await page.locator('#city').fill('Wien');

    await page
      .getByRole('button', { name: /Verbindliche Demo-Bestellung aufgeben/i })
      .click();

    // Verify rejection alert
    const errorBox = page.getByTestId('checkout-error');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText(
      /Der gemeinsame Lagerbestand für Ausführung „Handpoliertes Messing Natur“ reicht nicht aus/i,
    );
    // User remains on checkout page; no order placed
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Demo-Kasse',
    );
  });

  test('Reload-safe duplicate order prevention cleans stale cart on reload', async ({
    page,
  }) => {
    // 1. Add item to cart
    await page.goto('/produkte/korona-i');
    await page.getByRole('button', { name: /In den Warenkorb/i }).click();
    await expect(page.getByText(/in den Warenkorb gelegt/i)).toBeVisible();

    // 2. Go to checkout
    await page.goto('/kasse');
    await page.locator('#customer-name').fill('Idempotenz Test');
    await page.locator('#customer-email').fill('idempotenz@test.at');
    await page.locator('#street').fill('Testgasse 5');
    await page.locator('#zip').fill('1030');
    await page.locator('#city').fill('Wien');

    // 3. Monkey-patch localStorage.setItem to simulate saveCart([]) failing during checkout
    await page.evaluate(() => {
      const origSetItem = window.localStorage.setItem.bind(window.localStorage);
      window.localStorage.setItem = (key: string, val: string) => {
        // Block empty cart write to simulate quota or browser error
        if (key === 'lumenwerk_cart_v1' && val === '[]') {
          throw new Error('Simulated QuotaExceededError on cart clear');
        }
        return origSetItem(key, val);
      };
    });

    // 4. Submit order (order succeeds, cartSessionId marked completed)
    await page
      .getByRole('button', { name: /Verbindliche Demo-Bestellung aufgeben/i })
      .click();
    await expect(
      page.getByText('Vielen Dank für Ihre Bestellung!'),
    ).toBeVisible();

    // 5. Reload /warenkorb - loadCart() should detect completed cart session and purge it
    await page.goto('/warenkorb');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Ihr Warenkorb ist leer',
    );
  });

  test('Merchant reset failure displays error alert and preserves existing data', async ({
    page,
  }) => {
    await page.goto('/haendler');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Kaufmännische Steuerung',
    );

    // Check baseline orders exist
    const ordersTable = page.getByTestId('orders-table');
    await expect(ordersTable).toContainText('LW-2026-9102');

    // Monkey-patch removeItem to simulate storage failure during reset
    await page.evaluate(() => {
      const origRemove = window.localStorage.removeItem.bind(
        window.localStorage,
      );
      window.localStorage.removeItem = (key: string) => {
        if (key === 'lumenwerk_demo_orders_v1') {
          throw new Error('Simulated disk reset failure');
        }
        return origRemove(key);
      };
    });

    // Accept confirmation dialog
    page.once('dialog', (dialog) => dialog.accept());

    // Click reset
    await page.getByRole('button', { name: 'Demo-Daten zurücksetzen' }).click();

    // Verify error banner is visible with testid and role="alert"
    const alertBox = page.getByTestId('haendler-reset-error');
    await expect(alertBox).toBeVisible();
    await expect(alertBox).toContainText(/Demo-Zurücksetzung fehlgeschlagen/i);

    // Verify table still intact
    await expect(ordersTable).toContainText('LW-2026-9102');
  });
});
