# 0032: Component metadata

Status: Accepted · Date: 2026-11-25

## Context

0009 asks for a metadata file per component, checked in CI, that the docs site and the MCP server read. It did not say what the files contain, how they are checked or where they live. Lock In kept them beside its React components, but Squilp has React and React Native packages behind one API.

## Options considered

- Format: JSON Schema with Ajv, or Zod, which also gives TypeScript types but defines the schema in code.
- Location: `packages/core/metadata/`, a new `@squilp/metadata` package, beside the React component, or beside both components. GitHub Primer keeps its files beside its React components. Adobe Spectrum, which serves several platforms, keeps them in a shared package.
- Output: one combined file, or only the separate ones.
- Written by hand: everything except props, or everything.
- Required: more from beta, or everything always.
- Testers: GitHub usernames, or real names.

## Decision

- **Format:** JSON Schema 2020-12, checked with Ajv 8.20.0, a dev dependency of `@squilp/core`.
- **Location:** one file per component in `packages/core/metadata/components/`, shared by every platform. Props that only some platforms have are marked in the file.
- **Output:** core builds and publishes one combined file, `@squilp/core/metadata.json`. An invalid file stops the build.
- **By hand:** everything except props, which are generated from TypeScript in phase 3. CI then fails if they are out of date.
- **Required:** identity, platforms and usage from proposed. The API, tokens and accessibility are added from beta, with a test record for every supported platform.
- **Testers:** GitHub usernames.

## Consequences

- No platform owns the shared definition, but a file is not beside the code it describes. In phase 3, CI fails if a component has no file or a file claims a platform that has no component.
- The schema rejects `className` and `style` props (0031), and the build checks that the code name and file name follow from the component's name.
- There are no component files yet. The tests use made-up components.
- Figma links are left out, because 0029 keeps the file's link out of this public repo. Code Connect needs that link, so phase 3 decides it again.
- The product layer versions separately (0004), so its files do not go in core.
- If the MCP server should not depend on core, the files can move to their own package.
