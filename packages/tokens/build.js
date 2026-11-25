import { existsSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';
import { checkOverrides } from './overrides.js';
import { nativeConfig, webConfig } from './style-dictionary.config.js';

const posix = (path) => path.replaceAll('\\', '/');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

function merge(into, from) {
  for (const [key, value] of Object.entries(from)) {
    const both = into[key] && typeof into[key] === 'object' && value && typeof value === 'object';
    into[key] = both ? merge({ ...into[key] }, value) : value;
  }
  return into;
}

async function load(config) {
  const dictionary = new StyleDictionary(config, { init: false });
  await dictionary.init();
  return dictionary;
}

// Shared values are the web values. iOS and Android each add a file of the values that differ.
export async function buildTokens(src, dist) {
  const shared = globSync('**/*.tokens.json', { cwd: src })
    .map(posix)
    .filter((file) => !file.startsWith('platform/'))
    .sort()
    .map((file) => posix(join(src, file)));
  const sharedTokens = shared.map(readJson).reduce(merge, {});

  const native = {};
  for (const platform of ['ios', 'android']) {
    const file = posix(join(src, 'platform', `${platform}.tokens.json`));
    const differs = existsSync(file);
    if (differs) checkOverrides(platform, sharedTokens, readJson(file));
    // Style Dictionary lets source override include. Two sources would be a collision.
    const files = differs ? { include: shared, source: [file] } : { source: shared };
    const dictionary = await load({ ...nativeConfig, ...files });
    const [{ output }] = await dictionary.formatPlatform('reactNative');
    native[platform] = JSON.parse(output);
  }

  const web = await load(webConfig(shared, `${posix(dist)}/`));
  await web.buildAllPlatforms();
  mkdirSync(join(dist, 'react-native'), { recursive: true });
  writeFileSync(join(dist, 'react-native', 'tokens.js'), `export default ${JSON.stringify(native, null, 2)};\n`);
}

if (argv[1] === fileURLToPath(import.meta.url)) {
  const here = fileURLToPath(new URL('.', import.meta.url));
  await buildTokens(join(here, 'src'), join(here, 'dist'));
}
