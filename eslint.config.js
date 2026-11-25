import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import ts from 'typescript-eslint';
import { tailwindRules } from './lint/tailwind.js';

export default defineConfig([
  globalIgnores(['**/dist/', '**/build/', '**/.turbo/', '**/.expo/', '**/storybook-static/', '**/coverage/']),
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
  },
  {
    files: ['**/*.js'],
    languageOptions: { globals: { URL: 'readonly' } },
  },
  { files: ['apps/**/*.{jsx,tsx}'], ...tailwindRules },
]);
