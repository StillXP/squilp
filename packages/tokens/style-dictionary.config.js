// React Native takes plain numbers, so a 4 px dimension becomes 4.
// Only px exists on React Native; any other unit is a mistake in the token.
function dimensionToNumber(token) {
  const { value, unit } = token.$value;
  if (unit !== 'px') {
    throw new Error(`${token.path.join('.')}: "${unit}" has no React Native equivalent`);
  }
  return value;
}

export default {
  source: ['src/**/*.tokens.json'],
  hooks: {
    transforms: {
      'squilp/dimension/number': {
        type: 'value',
        filter: (token) => token.$type === 'dimension',
        transform: dimensionToNumber,
      },
    },
  },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'squilp',
      buildPath: 'dist/css/',
      files: [{ destination: 'tokens.css', format: 'css/variables' }],
    },
    reactNative: {
      transforms: ['name/camel', 'squilp/dimension/number'],
      buildPath: 'dist/react-native/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/esm',
          options: { minify: true },
        },
      ],
    },
  },
  // Without these, Style Dictionary reports a bad token but still exits 0.
  log: { warnings: 'error', verbosity: 'verbose', errors: { brokenReferences: 'throw' } },
};
