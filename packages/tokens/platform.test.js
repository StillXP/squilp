import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { buildTokens } from './build.js';
import { overrideProblems } from './overrides.js';

const px = (value) => ({ $value: { value, unit: 'px' } });
const shared = () => ({
  space: {
    $type: 'dimension',
    6: px(24),
    11: px(44),
    12: px(48),
    target: { min: { $value: '{space.6}' } },
    inset: { md: { $value: '{space.target.min}' } },
  },
  text: { $type: 'number', weight: { $value: 400 }, strong: { $value: '{text.weight}' } },
});
const override = ($value) => ({ space: { target: { min: { $value } } } });

// Builds in a temporary folder. The second file proves that shared files merge.
async function build(files) {
  const root = mkdtempSync(join(tmpdir(), 'squilp-tokens-'));
  try {
    const { space } = shared();
    const sources = {
      'space.tokens.json': { space: { $type: space.$type, 6: space[6], 11: space[11], 12: space[12] } },
      'nested/semantic.tokens.json': { space: { target: space.target, inset: space.inset } },
      ...files,
    };
    for (const [file, tokens] of Object.entries(sources)) {
      mkdirSync(join(root, 'src', file, '..'), { recursive: true });
      writeFileSync(join(root, 'src', file), JSON.stringify(tokens));
    }
    await buildTokens(join(root, 'src'), join(root, 'dist'));
    const { default: native } = await import(pathToFileURL(join(root, 'dist/react-native/tokens.js')));
    return { native, css: readFileSync(join(root, 'dist/css/tokens.css'), 'utf8') };
  } finally {
    rmSync(root, { recursive: true });
  }
}

test('a platform value changes that platform only, and tokens that point at it follow', async () => {
  const { native, css } = await build({
    'platform/ios.tokens.json': override('{space.11}'),
    'platform/android.tokens.json': override('{space.12}'),
  });
  assert.equal(native.ios.space.target.min, 44);
  assert.equal(native.ios.space.inset.md, 44);
  assert.equal(native.android.space.target.min, 48);
  assert.equal(native.android.space.inset.md, 48);
  assert.equal(native.ios.space[6], 24);
  assert.match(css, /--squilp-space-target-min: 24px;/);
});

test('a platform without a file gets the shared values', async () => {
  const { native } = await build({ 'platform/ios.tokens.json': override('{space.11}') });
  assert.equal(native.ios.space.target.min, 44);
  assert.equal(native.android.space.target.min, 24);
});

test('a bad platform file stops the build', async () => {
  const typo = { space: { target: { minimum: px(44) } } };
  await assert.rejects(build({ 'platform/ios.tokens.json': typo }), /Invalid ios values:\nspace\.target\.minimum/);
});

const valid = {
  'a reference to a shared token': override('{space.11}'),
  'a raw value of the same type': override({ value: 44, unit: 'px' }),
  'nothing': {},
  'a $schema': { $schema: 'https://example.com/schema.json', ...override('{space.11}') },
};

for (const [title, overrides] of Object.entries(valid)) {
  test(`accepts ${title}`, () => {
    assert.deepEqual(overrideProblems(shared(), overrides), []);
  });
}

const invalid = [
  ['a misspelled name', { space: { target: { minimum: px(44) } } }, /no shared token/],
  ['a new token', { color: { text: { body: { $value: '#000' } } } }, /no shared token/],
  ['a primitive', { space: { 6: px(28) } }, /this is a primitive/],
  ['a value of another type', override(44), /the type must stay dimension/],
  ['a reference to another type', override('{text.weight}'), /the type must stay dimension/],
  ['a reference to a semantic token of another type', override('{text.strong}'), /the type must stay dimension/],
  ['a reference to nothing', override('{space.13}'), /\{space\.13\} does not exist/],
  ['a type on the token', { space: { target: { min: { $type: 'number', $value: '{space.11}' } } } }, /only sets \$value, not \$type/],
  ['a description on the token', { space: { target: { min: { $value: '{space.11}', $description: 'x' } } } }, /not \$description/],
  ['a type on a group', { space: { $type: 'number', ...override('{space.11}').space } }, /space\.\$type: a platform file only sets token values/],
  ['a $ref', { space: { target: { min: { $ref: '#/space/11' } } } }, /not \$ref/],
];

for (const [title, overrides, reason] of invalid) {
  test(`rejects ${title}`, () => {
    const found = overrideProblems(shared(), overrides);
    assert.ok(found.some((problem) => reason.test(problem)), `found: ${found.join('; ') || 'nothing'}`);
  });
}
