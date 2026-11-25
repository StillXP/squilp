import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { compile } from 'tailwindcss';
import native from './dist/react-native/tokens.js';
import { colorModes, modeProblems } from './modes.js';
import { tokensIn } from './names.js';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const json = (path) => JSON.parse(read(path));
const primitives = json('src/color.tokens.json');
const css = read('dist/css/tokens.css');
const hexOf = new Map([...tokensIn(primitives)].map(({ path, value }) => [path.join('.'), value.hex]));

// The sRGB hex of an OKLCH color.
function toHex([l, c, h]) {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const [x, y, z] = [
    (l + 0.3963377774 * a + 0.2158037573 * b) ** 3,
    (l - 0.1055613458 * a - 0.0638541728 * b) ** 3,
    (l - 0.0894841775 * a - 1.291485548 * b) ** 3,
  ];
  const linear = [
    4.0767416621 * x - 3.3077115913 * y + 0.2309699292 * z,
    -1.2684380046 * x + 2.6097574011 * y - 0.3413193965 * z,
    -0.0041960863 * x - 0.7034186147 * y + 1.707614701 * z,
  ];
  const channel = (n) => {
    const clipped = Math.min(1, Math.max(0, n));
    const encoded = clipped <= 0.0031308 ? 12.92 * clipped : 1.055 * clipped ** (1 / 2.4) - 0.055;
    return Math.round(encoded * 255).toString(16).padStart(2, '0');
  };
  return `#${linear.map(channel).join('')}`;
}

test('every primitive has the hex of its OKLCH value', () => {
  for (const { path, value } of tokensIn(primitives)) {
    assert.equal(toHex(value.components), value.hex, path.join('.'));
  }
});

// The CSS variables one selector sets.
function block(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `${selector} is missing`);
  const body = css.slice(css.indexOf('{', start) + 1, css.indexOf('}', start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+): ([^;]+);/g)].map(([, name, value]) => [name, value]));
}

for (const mode of colorModes) {
  const selector = mode === 'light' ? `:root,\n[data-color-mode='light']` : `[data-color-mode='${mode}']`;
  const expected = [...tokensIn(json(`src/color-mode/${mode}.tokens.json`))];

  test(`${mode} sets every semantic color to its primitive's hex, and nothing else`, () => {
    const variables = block(selector);
    for (const { path, value } of expected) {
      const name = `--squilp-${path.join('-')}`;
      assert.equal(variables[name], hexOf.get(value.slice(1, -1)), name);
    }
    assert.equal(Object.keys(variables).length, expected.length);
  });

  test(`${mode} is the same on React Native`, () => {
    for (const platform of ['ios', 'android']) {
      const colors = native[platform].color[mode];
      assert.equal(Object.keys(colors).length, expected.length);
      assert.equal(colors.backgroundAccent, block(selector)['--squilp-color-background-accent']);
      assert.equal(colors.backgroundAccentHover, block(selector)['--squilp-color-background-accent-hover']);
      assert.equal(colors.textOnAccentSubtle, block(selector)['--squilp-color-text-on-accent-subtle']);
    }
  });
}

test('the brand purple and the red are the ones decided in 0038', () => {
  assert.equal(block(`:root,\n[data-color-mode='light']`)['--squilp-color-background-accent'], '#884bd5');
  assert.equal(block(`[data-color-mode='dark']`)['--squilp-color-background-accent'], '#c09aff');
  assert.equal(block(`[data-color-mode='high-contrast']`)['--squilp-color-background-accent'], '#6b37ab');
  assert.equal(block(`:root,\n[data-color-mode='light']`)['--squilp-color-background-danger'], '#cc272e');
});

test('primitives are not built', () => {
  const tailwind = read('dist/tailwind.css');
  for (const output of [css, tailwind, read('dist/react-native/tokens.js')]) assert.doesNotMatch(output, /purple|neutral/);
});

test('the device setting does not change the mode', () => {
  assert.doesNotMatch(css, /prefers-color-scheme/);
});

const require = createRequire(import.meta.url);
const tailwind = readFileSync(require.resolve('tailwindcss/index.css'), 'utf8');

for (const [className, property, variable] of [
  ['bg-accent', 'background-color', 'background-accent'],
  ['bg-accent-hover', 'background-color', 'background-accent-hover'],
  ['text-accent', 'color', 'text-accent'],
  ['border-accent', 'border-color', 'border-accent'],
  ['outline-focus', 'outline-color', 'border-focus'],
]) {
  test(`Tailwind's ${className} uses the Squilp variable`, async () => {
    const { build } = await compile(`${tailwind}\n${read('dist/tailwind.css')}`);
    assert.ok(build([className]).includes(`${property}: var(--squilp-color-${variable});`));
  });
}

const shared = () => ({ color: { $type: 'color', gray: { 1: { $value: { hex: '#111111' } } } } });
const mode = (names = ['page']) => ({
  color: { $type: 'color', background: Object.fromEntries(names.map((name) => [name, { $value: '{color.gray.1}' }])) },
});
const modes = (changes = {}) => ({ light: mode(), dark: mode(), 'high-contrast': mode(), ...changes });

test('accepts modes with the same names', () => {
  assert.deepEqual(modeProblems(shared(), modes()), []);
});

const raw = { color: { $type: 'color', background: { page: { $value: { hex: '#fff' } } } } };
const to = (target) => ({ color: { $type: 'color', background: { page: { $value: target } } } });
for (const [title, changes, reason] of [
  ['a name missing from one mode', { dark: mode(['page', 'raised']) }, /^light: color\.background\.raised is missing/],
  ['a missing mode', { dark: undefined }, /^dark: there is no file/],
  ['an unknown mode', { sepia: mode() }, /^sepia: this is not a color mode/],
  ['a raw color', { dark: raw }, /^dark: color\.background\.page must point at a primitive/],
  ['a reference to another role', { dark: to('{color.background.page}') }, /which is not a color primitive/],
  ['a reference to nothing', { dark: to('{color.gray.2}') }, /which is not a color primitive/],
  ['another type', { dark: { color: { $type: 'number', background: { page: { $value: '{color.gray.1}' } } } } }, /is not a color/],
]) {
  test(`rejects ${title}`, () => {
    const found = modeProblems(shared(), modes(changes));
    assert.ok(found.some((problem) => reason.test(problem)), `found: ${found.join('; ') || 'nothing'}`);
  });
}
