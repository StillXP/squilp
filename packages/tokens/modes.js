import { tokensIn } from './names.js';

// The values of data-color-mode. The first one applies when it is not set.
export const colorModes = ['light', 'dark', 'high-contrast'];

const reference = /^\{(.+)\}$/;

// Returns what is wrong with the color modes. Empty when they are valid.
export function modeProblems(shared, modes) {
  const found = [];
  const primitives = new Set([...tokensIn(shared)].filter(({ type }) => type === 'color').map(({ path }) => path.join('.')));
  const names = new Map();
  for (const mode of colorModes) {
    if (!modes[mode]) {
      found.push(`${mode}: there is no file`);
      continue;
    }
    const tokens = [...tokensIn(modes[mode])];
    names.set(mode, new Set(tokens.map(({ path }) => path.join('.'))));
    for (const { path, type, value } of tokens) {
      const name = path.join('.');
      const target = typeof value === 'string' && value.match(reference)?.[1];
      if (type !== 'color') found.push(`${mode}: ${name} is not a color`);
      if (!target) found.push(`${mode}: ${name} must point at a primitive`);
      else if (!primitives.has(target)) found.push(`${mode}: ${name} points at ${target}, which is not a color primitive`);
    }
  }
  for (const mode of Object.keys(modes).filter((mode) => !colorModes.includes(mode))) {
    found.push(`${mode}: this is not a color mode (${colorModes.join(', ')})`);
  }
  const all = new Set([...names.values()].flatMap((set) => [...set]));
  for (const [mode, set] of names) {
    for (const name of all) if (!set.has(name)) found.push(`${mode}: ${name} is missing`);
  }
  return found;
}

export function checkModes(shared, modes) {
  const found = modeProblems(shared, modes);
  if (found.length > 0) throw new Error(`Invalid color modes:\n${found.join('\n')}`);
}
