import { readFile } from 'node:fs/promises';
import { Ajv2020 } from 'ajv/dist/2020.js';

const schema = JSON.parse(await readFile(new URL('component.schema.json', import.meta.url), 'utf8'));

// strictTypes and strictRequired expect every rule to repeat its type and
// properties, which the conditions for beta do not.
const ajv = new Ajv2020({ allErrors: true, strict: true, strictTypes: false, strictRequired: false });
const matchesSchema = ajv.compile(schema);

const capitalize = (word) => word[0].toUpperCase() + word.slice(1);
const codeName = (name) => name.split(' ').map(capitalize).join('');
const fileName = (name) => `${name.toLowerCase().replaceAll(' ', '-')}.json`;

// Returns what is wrong with one component's metadata. Empty when it is valid.
export function problems(metadata, file) {
  if (!matchesSchema(metadata)) {
    return matchesSchema.errors
      .filter(({ keyword }) => keyword !== 'if')
      .map(({ instancePath, message, params }) => `${instancePath || '/'} ${message} ${JSON.stringify(params)}`);
  }
  const found = [];
  const { name, code } = metadata;
  if (code !== codeName(name)) {
    found.push(`/code is "${code}", but "${name}" is ${codeName(name)} in code`);
  }
  if (file !== fileName(name)) {
    found.push(`the file is ${file}, but "${name}" belongs in ${fileName(name)}`);
  }
  return found;
}
