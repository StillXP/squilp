// The first word a semantic token may start with. Phase 2 adds each category on purpose.
const categories = ['color', 'space', 'text'];

// Words that say what a color looks like. Semantic names say what it is for.
const appearance = new Set([
  ...['black', 'white', 'gray', 'grey', 'slate', 'zinc', 'stone', 'silver', 'brown', 'beige'],
  ...['red', 'maroon', 'rose', 'pink', 'magenta', 'fuchsia', 'orange', 'amber', 'gold', 'yellow'],
  ...['lime', 'olive', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'navy', 'indigo', 'violet', 'purple'],
]);

const segment = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// A primitive holds a raw value. Any other token points at one.
export function hasReference(value) {
  if (typeof value === 'string') return /^\{.+\}$/.test(value);
  if (value === null || typeof value !== 'object') return false;
  return '$ref' in value || Object.values(value).some(hasReference);
}

const groupsIn = (token) =>
  Object.keys(token).filter((key) => !key.startsWith('$') && typeof token[key] === 'object');

// Finds every token, with the type it has or inherits.
export function* tokensIn(group, path = [], inherited = group.$type) {
  for (const [key, child] of Object.entries(group)) {
    if (child === null || typeof child !== 'object') continue;
    // $root is a group's own token. Every other $ key describes the group.
    if (key.startsWith('$') && key !== '$root') continue;
    const here = key === '$root' ? path : [...path, key];
    const type = child.$type ?? inherited;
    if ('$value' in child || '$ref' in child) {
      yield { path: here, type, value: child.$value ?? { $ref: child.$ref }, keys: Object.keys(child), inside: groupsIn(child) };
    } else {
      yield* tokensIn(child, here, type);
    }
  }
}

// Returns what is wrong with the token names. Empty when they are valid.
export function nameProblems(tokens) {
  const found = [];
  for (const { path, value, inside } of tokensIn(tokens)) {
    const name = path.join('.');
    if (inside.length > 0) {
      found.push(`${name}: a token cannot hold ${inside.join(', ')}. Put its own value in $root`);
    }
    for (const part of path.filter((part) => !segment.test(part))) {
      found.push(`${name}: "${part}" may only have lowercase letters, numbers and single hyphens`);
    }
    if (!hasReference(value)) continue;
    if (!categories.includes(path[0])) {
      found.push(`${name}: "${path[0]}" is not a known category (${categories.join(', ')})`);
    }
    for (const word of path.flatMap((part) => part.split('-')).filter((word) => appearance.has(word))) {
      found.push(`${name}: "${word}" says what it looks like. Name what it is for`);
    }
  }
  return found;
}

export function checkNames(tokens) {
  const found = nameProblems(tokens);
  if (found.length > 0) throw new Error(`Invalid token names:\n${found.join('\n')}`);
  return tokens;
}
