import { hasReference, tokensIn } from './names.js';

const reference = /^\{(.+)\}$/;

// Follows references to the token that holds a value.
function resolve(tokens, name, seen = []) {
  const token = tokens.get(name);
  if (!token || seen.includes(name)) return undefined;
  const target = typeof token.value === 'string' && token.value.match(reference);
  if (!target) return token;
  const found = resolve(tokens, target[1], [...seen, name]);
  return found && { ...found, type: token.type ?? found.type };
}

function* groupSettings(group, path = []) {
  for (const [key, child] of Object.entries(group)) {
    if (key.startsWith('$') && key !== '$root') {
      if (!(path.length === 0 && key === '$schema')) yield [...path, key].join('.');
    } else if (child !== null && typeof child === 'object' && !('$value' in child) && !('$ref' in child)) {
      yield* groupSettings(child, [...path, key]);
    }
  }
}

// Returns what is wrong with one platform's overrides. Empty when they are valid.
export function overrideProblems(shared, overrides) {
  const found = [];
  const tokens = new Map([...tokensIn(shared)].map((token) => [token.path.join('.'), token]));
  for (const setting of groupSettings(overrides)) {
    found.push(`${setting}: a platform file only sets token values`);
  }
  for (const { path, value, keys } of tokensIn(overrides)) {
    const name = path.join('.');
    const token = tokens.get(name);
    if (!token) {
      found.push(`${name}: there is no shared token with this name`);
      continue;
    }
    if (!hasReference(token.value)) {
      found.push(`${name}: this is a primitive. Only semantic tokens differ by platform`);
    }
    const extra = keys.filter((key) => key !== '$value');
    if (extra.length > 0) {
      found.push(`${name}: a platform file only sets $value, not ${extra.join(', ')}`);
      continue;
    }
    const before = resolve(tokens, name);
    const target = typeof value === 'string' && value.match(reference);
    if (!target) {
      found.push(`${name}: a platform value must point at a shared token`);
      continue;
    }
    const after = resolve(tokens, target[1]);
    if (!after) {
      found.push(`${name}: ${value} does not exist`);
    } else if (before && after.type !== before.type) {
      found.push(`${name}: the type must stay ${before.type}`);
    }
  }
  return found;
}

export function checkOverrides(platform, shared, overrides) {
  const found = overrideProblems(shared, overrides);
  if (found.length > 0) throw new Error(`Invalid ${platform} values:\n${found.join('\n')}`);
}
