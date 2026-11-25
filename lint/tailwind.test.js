import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ESLint } from 'eslint';

const eslint = new ESLint();

async function rulesBroken(className, filePath = 'apps/sample.tsx') {
  const code = `export const sample = <div className=${className} />;\n`;
  const [{ messages }] = await eslint.lintText(code, { filePath });
  return messages.map(({ ruleId, message }) => ruleId ?? message);
}

const rejected = {
  'better-tailwindcss/no-restricted-classes': [
    // Brackets and parentheses
    '"bg-[#ff6600]"',
    '"p-[13px]"',
    '"hover:p-[13px]"',
    '"!p-[13px]"',
    '"p-[13px]!"',
    '"[color:red]"',
    '"bg-(--x)"',
    '"bg-[#fff]/50"',
    '"text-[var(--squilp-x)]"',
    '"min-[900px]:flex"',
    '"@max-[900px]:flex"',
    '{`flex p-[15px]`}',
    "{true ? 'p-[16px]' : 'p-1'}",
    // Plain numbers
    '"z-13"',
    '"-z-10"',
    '"duration-150"',
    '"opacity-37"',
    '"border-2"',
    '"border-x-4"',
    '"dark:border-2"',
    '"outline-offset-2"',
    // Modifiers and one-pixel classes
    '"bg-current/50"',
    '"hover:bg-current/50"',
    '"p-px"',
    '"-m-px"',
  ],
  'better-tailwindcss/no-unknown-classes': ['"bg-blue-500"', '"p-13"', '"rounded-lg"', '"md:p-1"'],
};

for (const [rule, samples] of Object.entries(rejected)) {
  for (const sample of samples) {
    test(`rejects ${sample}`, async () => {
      const broken = await rulesBroken(sample);
      assert.ok(broken.includes(rule), `reported: ${broken.join(', ') || 'nothing'}`);
    });
  }
}

const allowed = [
  '"flex p-1"',
  '"-m-1"',
  '"hover:p-1 dark:p-1"',
  '"w-1/2 -translate-x-1/2"',
  '"aspect-16/9"',
  '"grid grid-cols-3"',
  '"border-spacing-1"',
  '"data-[state=open]:flex"',
  '"[&>p]:p-1"',
  '"supports-[display:grid]:grid"',
  '"group/item"',
  '"group-hover/item:flex"',
  '"rotate-45"',
];

for (const sample of allowed) {
  test(`allows ${sample}`, async () => {
    assert.deepEqual(await rulesBroken(sample), []);
  });
}

test('component code is not checked as Tailwind', async () => {
  const broken = await rulesBroken('"p-[13px]"', 'packages/react/src/sample.tsx');
  assert.deepEqual(broken, []);
});
