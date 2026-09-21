export type SiteRoute = {
  name: string;
  path: `/${string}` | '/';
};

/** Update this list whenever a project adds or removes a public route. */
export const siteRoutes: readonly SiteRoute[] = [{ name: 'home', path: '/' }];
