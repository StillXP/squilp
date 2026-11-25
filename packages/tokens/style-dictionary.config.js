import { checkNames } from './names.js';
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

const base = {
  preprocessors: ['squilp/names'],
  hooks: {
    preprocessors: {
      'squilp/names': checkNames,
    },
    formats: {
      'squilp/tailwind/theme': tailwindTheme,
    },
    transforms: {
      'squilp/dimension/number': {
        type: 'value',
        filter: (token) => token.$type === 'dimension',
        transform: dimensionToNumber,
      },
    },
  },
  // Without these, Style Dictionary reports a bad token but still exits 0.
  log: { warnings: 'error', verbosity: 'verbose', errors: { brokenReferences: 'throw' } },
};

export const webConfig = (source, dist) => ({
  ...base,
  source,
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'squilp',
      buildPath: `${dist}css/`,
      files: [{ destination: 'tokens.css', format: 'css/variables' }],
    },
    tailwind: {
      transformGroup: 'css',
      prefix: 'squilp',
      buildPath: dist,
      files: [{ destination: 'tailwind.css', format: 'squilp/tailwind/theme' }],
    },
  },
});

// Used once for iOS and once for Android. build.js joins the two.
export const nativeConfig = {
  ...base,
  platforms: {
    reactNative: {
      transforms: ['name/camel', 'squilp/dimension/number'],
      files: [{ destination: 'tokens.json', format: 'json/nested' }],
    },
  },
};
