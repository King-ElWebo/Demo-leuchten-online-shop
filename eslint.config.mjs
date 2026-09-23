import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    '.next/**',
    '.wrangler/**',
    'out/**',
    'node_modules/**',
    'artifacts/qa/playwright-report/**',
    'artifacts/qa/test-results/**',
    'artifacts/qa/static-test-results/**',
  ]),
]);
