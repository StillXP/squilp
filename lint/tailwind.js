import { fileURLToPath } from 'node:url';
import tailwind from 'eslint-plugin-better-tailwindcss';

// Utilities whose plain numbers Tailwind does not read from the theme.
const numeric = [
  'z',
  'duration',
  'delay',
  'opacity',
  'backdrop-opacity',
  'border',
  'divide',
  'ring',
  'ring-offset',
  'inset-ring',
  'outline',
  'outline-offset',
  'underline-offset',
  'decoration',
  'stroke',
].join('|');

// Utilities where a slash is a fraction, such as w-1/2, not an opacity.
const fractions = [
  '(?:min-|max-)?[wh]',
  'size',
  'basis',
  'aspect',
  'inset(?:-[xy])?',
  'top',
  'right',
  'bottom',
  'left',
  'start',
  'end',
  'translate(?:-[xy])?',
].join('|');

const restrict = [
  {
    pattern: String.raw`[\])](?:/[^:]*)?!?$`,
    message: 'Bracket and parenthesis values bypass Squilp tokens. Use a Squilp class.',
  },
  {
    pattern: String.raw`(?:^|:)(?:@?(?:min|max)-|@)[\[(]`,
    message: 'Use a Squilp breakpoint instead of a raw width.',
  },
  {
    pattern: String.raw`(?:^|:)!?-?(?:${numeric})(?:-[xytrblse])?-[0-9][0-9.]*!?$`,
    message: 'Plain numbers bypass Squilp tokens here. Use a Squilp class.',
  },
  {
    pattern: String.raw`(?:^|:)(?!!?-?(?:${fractions})-[0-9])[^:/]+/[0-9.]+!?$`,
    message: 'Opacity and line-height modifiers bypass Squilp tokens. Use a Squilp class.',
  },
  {
    pattern: String.raw`(?:^|:)!?-?[a-z-]+-px!?$`,
    message: 'One-pixel classes bypass Squilp tokens. Use a Squilp class.',
  },
];

// For code that uses Tailwind classes. Components use CSS Modules instead (0013).
export const tailwindRules = {
  plugins: { 'better-tailwindcss': tailwind },
  settings: {
    'better-tailwindcss': { entryPoint: fileURLToPath(new URL('tailwind.css', import.meta.url)) },
  },
  rules: {
    'better-tailwindcss/no-unknown-classes': 'error',
    'better-tailwindcss/no-restricted-classes': ['error', { restrict }],
  },
};
