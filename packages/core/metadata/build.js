import { mkdir, writeFile } from 'node:fs/promises';
import { combine } from './combine.js';

const dist = new URL('../dist/', import.meta.url);
const metadata = await combine(new URL('components/', import.meta.url));

await mkdir(dist, { recursive: true });
await writeFile(new URL('metadata.json', dist), `${JSON.stringify(metadata, null, 2)}\n`);
