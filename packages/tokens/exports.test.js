import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

// Resolves by package name, the way an app does.
const read = (path) => readFile(new URL(import.meta.resolve(path)), 'utf8');

test('the Tailwind theme only uses variables that tokens.css sets', async () => {
  const theme = await read('@squilp/tokens/tailwind.css');
  const tokens = await read('@squilp/tokens/tokens.css');
  const used = [...theme.matchAll(/var\((--[\w-]+)\)/g)].map(([, name]) => name);
  assert.ok(used.length > 0);
  for (const name of used) assert.ok(tokens.includes(`${name}:`), `${name} is not set`);
});

test('React Native loads its tokens by package name', async () => {
  const { default: tokens } = await import('@squilp/tokens/react-native');
  assert.equal(tokens.space['1'], 4);
});
