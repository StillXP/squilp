import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, sep } from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { combine } from './combine.js';
import { problems } from './validate.js';

// Made-up components, so the samples never stand in for real metadata.
const proposed = () => ({
  $schema: '../component.schema.json',
  name: 'Sample field',
  code: 'SampleField',
  category: 'Inputs',
  summary: 'A sample.',
  status: 'proposed',
  platforms: {
    web: { supported: true },
    ios: { supported: true },
    android: { supported: false, reason: 'Not designed yet.' },
  },
  usage: { when: ['In a test.'], whenNot: [{ situation: 'In an app.', instead: 'Text field' }] },
});

const record = (platform) => ({ date: '2026-11-25', platform, technology: 'NVDA with Chrome', tester: 'octo-cat' });

const beta = () => ({
  ...proposed(),
  status: 'beta',
  api: {
    props: [
      { name: 'label', type: 'string', required: true, description: 'Names the control.' },
      { name: 'size', type: 'string', values: ['sm', 'md'], default: 'md', required: false, description: 'Its size.' },
      { name: 'name', type: 'string', required: false, description: 'For forms.', platformOnly: ['web'] },
    ],
  },
  tokens: ['color.background.accent', 'space.inset.md'],
  accessibility: {
    role: 'textbox',
    keyboard: [{ keys: 'Tab', action: 'Moves focus.' }],
    announced: ['The label.'],
    tests: [record('web'), { ...record('ios'), notes: 'macOS VoiceOver was not tested.' }],
  },
});

const change = (sample, edit) => {
  edit(sample);
  return sample;
};

const valid = {
  'a proposed component': proposed(),
  'a beta component': beta(),
  'a name with three words': { ...proposed(), name: 'Top app bar', code: 'TopAppBar' },
};

for (const [title, sample] of Object.entries(valid)) {
  test(`accepts ${title}`, () => {
    assert.deepEqual(problems(sample, `${sample.name.toLowerCase().replaceAll(' ', '-')}.json`), []);
  });
}

// Each sample must fail for the reason it names.
const invalid = [
  ['a missing summary', change(proposed(), (s) => delete s.summary), /"missingProperty":"summary"/],
  ['an empty summary', { ...proposed(), summary: ' ' }, /^\/summary/],
  ['an unknown field', { ...proposed(), figma: 'x' }, /"additionalProperty":"figma"/],
  ['an unknown status', { ...proposed(), status: 'ready' }, /^\/status/],
  ['an unknown category', { ...proposed(), category: 'Other' }, /^\/category/],
  ['a name in title case', { ...proposed(), name: 'Sample Field' }, /^\/name/],
  ['a code name that does not match', { ...proposed(), code: 'Samplefield' }, /^\/code is "Samplefield"/],
  ['a missing platform', change(proposed(), (s) => delete s.platforms.ios), /"missingProperty":"ios"/],
  ['a missing platform reason', change(proposed(), (s) => delete s.platforms.android.reason), /"missingProperty":"reason"/],
  ['no usage', change(proposed(), (s) => delete s.usage), /"missingProperty":"usage"/],
  ['no API at beta', change(beta(), (s) => delete s.api), /"missingProperty":"api"/],
  ['no tokens at beta', change(beta(), (s) => delete s.tokens), /"missingProperty":"tokens"/],
  ['no accessibility at stable', change({ ...beta(), status: 'stable' }, (s) => delete s.accessibility), /"missingProperty":"accessibility"/],
  ['no test on a supported platform', change(beta(), (s) => s.accessibility.tests.pop()), /^\/accessibility\/tests must contain/],
  ['a className prop', change(beta(), (s) => (s.api.props[0].name = 'className')), /^\/api\/props\/0\/name/],
  ['a required prop with a default', change(beta(), (s) => (s.api.props[0].default = 'x')), /^\/api\/props\/0 must NOT be valid/],
  ['platform-only on every platform', change(beta(), (s) => (s.api.props[2].platformOnly = ['web', 'ios', 'android'])), /platformOnly must NOT have more than 2/],
  ['a raw value as a token', { ...beta(), tokens: ['#ff6600'] }, /^\/tokens\/0/],
  ['an impossible date', change(beta(), (s) => (s.accessibility.tests[0].date = '2026-13-01')), /^\/accessibility\/tests\/0\/date/],
  ['a tester who is not a username', change(beta(), (s) => (s.accessibility.tests[0].tester = 'Octo Cat')), /^\/accessibility\/tests\/0\/tester/],
];

for (const [title, sample, reason] of invalid) {
  test(`rejects ${title}`, () => {
    const found = problems(sample, 'sample-field.json');
    assert.ok(found.some((problem) => reason.test(problem)), `found: ${found.join('; ') || 'nothing'}`);
  });
}

test('rejects a file name that does not match', () => {
  assert.match(problems(proposed(), 'field.json').join(), /belongs in sample-field\.json/);
});

async function inFolder(files, run) {
  const folder = await mkdtemp(join(tmpdir(), 'squilp-metadata-'));
  try {
    for (const [file, content] of Object.entries(files)) await writeFile(join(folder, file), content);
    await run(pathToFileURL(folder + sep));
  } finally {
    await rm(folder, { recursive: true });
  }
}

test('combines the files, without their $schema', async () => {
  await inFolder({ 'sample-field.json': JSON.stringify(beta()) }, async (folder) => {
    const { components } = await combine(folder);
    assert.deepEqual(Object.keys(components), ['sample-field']);
    assert.equal(components['sample-field'].code, 'SampleField');
    assert.equal(components['sample-field'].$schema, undefined);
  });
});

test('one invalid file stops the build and is named', async () => {
  await inFolder({ 'sample-field.json': JSON.stringify({ ...beta(), status: 'ready' }), 'other.json': '{' }, async (folder) => {
    await assert.rejects(combine(folder), (error) => {
      assert.match(error.message, /sample-field\.json: \/status/);
      assert.match(error.message, /other\.json: /);
      return true;
    });
  });
});

test('the package builds one combined file', async () => {
  const built = JSON.parse(await readFile(new URL('../dist/metadata.json', import.meta.url), 'utf8'));
  assert.deepEqual(built, await combine(new URL('components/', import.meta.url)));
});
