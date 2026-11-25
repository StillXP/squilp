import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('the test token builds to a CSS variable', async () => {
  const css = await readFile(new URL('dist/css/tokens.css', import.meta.url), 'utf8');
  assert.match(css, /^\s*--squilp-space-1: 4px;/m);
});

test('the test token builds to a React Native number', async () => {
  const { default: tokens } = await import('./dist/react-native/tokens.js');
  assert.equal(tokens.ios.space['1'], 4);
  assert.equal(tokens.android.space['1'], 4);
});
