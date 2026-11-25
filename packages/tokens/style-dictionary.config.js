import { checkNames, hasReference } from './names.js';
import { tailwindTheme } from './tailwind-format.js';

// React Native takes plain numbers, so a 4 px dimension becomes 4.
// Only px exists on React Native; any other unit is a mistake in the token.
function dimensionToNumber(token) {
  const { value, unit } = token.$value;
  if (unit !== 'px') {
    throw new Error(`${token.path.join('.')}: "${unit}" has no React Native equivalent`);
  }
  return value;
}

// Colors are OKLCH in the source and hex everywhere else.
function colorToHex(token) {
  return typeof token.$value === 'string' ? token.$value : token.$value.hex;
}

// Only semantic colors are built. Their primitives stay in the source.
const isBuilt = (token) => token.path[0] !== 'color' || hasReference(token.original.$value);

const base = {
  preprocessors: ['squilp/names'],
  hooks: {
    preprocessors: {
      'squilp/names': checkNames,
    },
    formats: {
      'squilp/tailwind/theme': tailwindTheme,
    },
    filters: {
      'squilp/built': isBuilt,
      'squilp/mode': (token) => token.isSource && isBuilt(token),
    },
    transforms: {
      'squilp/dimension/number': {
        type: 'value',
        filter: (token) => token.$type === 'dimension',
        transform: dimensionToNumber,
      },
      'squilp/color/hex': {
        type: 'value',
        transitive: true,
        filter: (token) => token.$type === 'color',
        transform: colorToHex,
      },
    },
  },
  // Without these, Style Dictionary reports a bad token but still exits 0.
  log: { warnings: 'error', verbosity: 'verbose', errors: { brokenReferences: 'throw' } },
};

export const cssConfig = (selector, filter) => ({
  ...base,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'squilp',
      files: [{ destination: 'tokens.css', format: 'css/variables', filter, options: { selector, showFileHeader: false } }],
    },
  },
});

export const tailwindConfig = {
  ...base,
  platforms: {
    tailwind: {
      transformGroup: 'css',
      prefix: 'squilp',
      files: [{ destination: 'tailwind.css', format: 'squilp/tailwind/theme', filter: 'squilp/built' }],
    },
  },
};

export const nativeConfig = {
  ...base,
  platforms: {
    reactNative: {
      transforms: ['name/camel', 'squilp/dimension/number', 'squilp/color/hex'],
      files: [{ destination: 'tokens.json', format: 'json/nested', filter: 'squilp/built' }],
    },
  },
};
