import { readdir, readFile } from 'node:fs/promises';
import { problems } from './validate.js';

async function jsonFiles(folder) {
  try {
    return (await readdir(folder)).filter((file) => file.endsWith('.json')).sort();
  } catch (error) {
    // The folder appears with the first component.
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// Reads every component's file and joins them, keyed by file name. Throws if any is invalid.
export async function combine(folder) {
  const components = {};
  const invalid = [];
  for (const file of await jsonFiles(folder)) {
    let metadata;
    try {
      metadata = JSON.parse(await readFile(new URL(file, folder), 'utf8'));
    } catch (error) {
      invalid.push(`${file}: ${error.message}`);
      continue;
    }
    invalid.push(...problems(metadata, file).map((problem) => `${file}: ${problem}`));
    delete metadata.$schema;
    components[file.replace('.json', '')] = metadata;
  }
  if (invalid.length > 0) {
    throw new Error(`Invalid component metadata:\n${invalid.join('\n')}`);
  }
  return { components };
}
