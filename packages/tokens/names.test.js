import assert from 'node:assert/strict';
import { test } from 'node:test';
import StyleDictionary from 'style-dictionary';
import config from './style-dictionary.config.js';
import { nameProblems } from './names.js';

const raw = { $type: 'color', $value: { colorSpace: 'oklch', components: [0.7, 0.2, 50] } };
const alias = { $type: 'color', $value: '{color.orange.500}' };

// Puts one token at a dotted path.
const at = (path, token) => path.split('.').reduceRight((child, key) => ({ [key]: child }), token);

const valid = {
  'a primitive named for its color': at('color.orange.500', raw),
  'a semantic token': at('color.background.accent', alias),
  'a semantic token with a state': at('color.text.danger.disabled', alias),
  'a hyphen': at('color.background.accent-strong', alias),
  'a word that contains a color': at('color.text.required', alias),
  'a group with its own token': at('color.background.$root', alias),
  'group properties': { color: { $type: 'color', $description: 'Colors', $extensions: { 'a.B': { C: 1 } }, ...at('text.body', alias) } },
};

for (const [title, tokens] of Object.entries(valid)) {
  test(`accepts ${title}`, () => {
    assert.deepEqual(nameProblems(tokens), []);
  });
}

const invalid = [
  ['a capital letter', at('color.Orange.500', raw), /"Orange" may only have/],
  ['camel case', at('color.background.accentStrong', alias), /"accentStrong" may only have/],
  ['an underscore', at('color.background.accent_strong', alias), /"accent_strong" may only have/],
  ['a space', at('color.back ground', raw), /"back ground" may only have/],
  ['an unknown category', at('colour.background.accent', alias), /"colour" is not a known category/],
  ['a color word in a semantic name', at('color.background.blue', alias), /"blue" says what it looks like/],
  ['a color word after a hyphen', at('color.background.accent-orange', alias), /"orange" says what it looks like/],
  ['a color word in a $ref token', at('color.background.blue', { $type: 'color', $ref: '#/color/orange/500/$value' }), /"blue" says/],
  ['a color word when only part is a reference', at('text.blue', { $type: 'typography', $value: { fontSize: '{font.size.300}', fontWeight: 400 } }), /"blue" says/],
  ['a color word in a $root token', at('color.blue.$root', alias), /"blue" says what it looks like/],
];

for (const [title, tokens, reason] of invalid) {
  test(`rejects ${title}`, () => {
    const found = nameProblems(tokens);
    assert.ok(found.some((problem) => reason.test(problem)), `found: ${found.join('; ') || 'nothing'}`);
  });
}

test('a bad name stops the build', async () => {
  const tokens = { color: { orange: { 500: raw }, background: { blue: alias } } };
  const dictionary = new StyleDictionary({ ...config, source: undefined, tokens }, { init: false });
  await assert.rejects(dictionary.init(), /Invalid token names:\ncolor\.background\.blue/);
});
