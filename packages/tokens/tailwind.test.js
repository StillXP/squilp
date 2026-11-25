import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { compile } from 'tailwindcss';
import { tailwindTheme } from './tailwind-format.js';

const require = createRequire(import.meta.url);
const theme = await readFile(new URL('dist/tailwind.css', import.meta.url), 'utf8');
const tailwind = await readFile(require.resolve('tailwindcss/index.css'), 'utf8');

// Compiles one class the way an app does, after Tailwind's defaults. Returns
// only what the class adds.
async function css(className) {
  const build = async (classes) => (await compile(`${tailwind}\n${theme}`)).build(classes);
  const empty = await build([]);
  const full = await build([className]);
  return full === empty ? '' : full.slice(full.indexOf('@layer utilities'));
}

test('a token becomes a class that uses the Squilp variable', async () => {
  assert.match(await css('p-1'), /\.p-1 \{\s*padding: var\(--squilp-space-1\);/);
});

for (const className of ['bg-blue-500', 'bg-white', 'p-13', 'rounded-lg', 'shadow-md', 'text-sm', 'font-bold', 'md:p-1']) {
  test(`Tailwind's default ${className} does not exist`, async () => {
    assert.equal(await css(className), '');
  });
}

test('dark: follows data-color-mode, not the device', async () => {
  const dark = await css('dark:p-1');
  assert.match(dark, /\[data-color-mode='dark'\]/);
  assert.doesNotMatch(dark, /prefers-color-scheme/);
});

test('a token category without a Tailwind namespace stops the build', () => {
  const dictionary = { allTokens: [{ path: ['unknown', '1'], name: 'squilp-unknown-1' }] };
  assert.throws(() => tailwindTheme({ dictionary }), /no Tailwind namespace/);
});
