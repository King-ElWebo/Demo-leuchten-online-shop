export type SiteRoute = {
  name: string;
  path: `/${string}` | '/';
};

/** All public static routes defined in SITE.md */
export const siteRoutes: readonly SiteRoute[] = [
  { name: 'home', path: '/' },
  { name: 'katalog', path: '/katalog' },
  { name: 'produkt-korona-i', path: '/produkte/korona-i' },
  { name: 'produkt-solis-disk', path: '/produkte/solis-disk' },
  { name: 'produkt-aura-column', path: '/produkte/aura-column' },
  { name: 'produkt-strata-grazer', path: '/produkte/strata-grazer' },
  { name: 'produkt-kyoto-pendant', path: '/produkte/kyoto-pendant' },
  { name: 'produkt-atelier-mono', path: '/produkte/atelier-mono' },
  { name: 'produkt-lumen-globe', path: '/produkte/lumen-globe' },
  { name: 'konfigurator', path: '/konfigurator' },
  { name: 'warenkorb', path: '/warenkorb' },
  { name: 'kasse', path: '/kasse' },
  { name: 'atelier', path: '/atelier' },
  { name: 'haendler', path: '/haendler' },
];
