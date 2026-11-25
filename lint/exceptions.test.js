import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ESLint } from 'eslint';

const eslint = new ESLint();
const rule = '@eslint-community/eslint-comments/require-description';

async function rulesBroken(comment) {
  const code = `${comment}\nvar sample = 1;\nexport { sample };\n`;
  const [{ messages }] = await eslint.lintText(code, { filePath: 'packages/core/src/sample.ts' });
  return messages.map(({ ruleId }) => ruleId);
}

const withoutReason = [
  '// eslint-disable-next-line no-var',
  '// eslint-disable-next-line no-var --',
  '/* eslint-disable no-var */',
  '/* eslint-disable */',
  '/* eslint no-var: "off" */',
];

for (const comment of withoutReason) {
  test(`rejects ${comment}`, async () => {
    assert.ok((await rulesBroken(comment)).includes(rule));
  });
}

test('allows an exception with a reason', async () => {
  assert.deepEqual(await rulesBroken('// eslint-disable-next-line no-var -- a sample'), []);
});
