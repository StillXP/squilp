# 0026: Phase 1 build and CI

Status: Accepted · Date: 2026-11-24

## Context

The phase 1 gate is a test token that builds to CSS and React Native in CI. Several choices it needs were not covered by a record, and two existing records had a problem. Style Dictionary 5.8.0 cannot read the Resolver document that 0012 calls for (style-dictionary issue 1590 is still open). Node 22, the minimum in 0022, reaches end of life on 2027-04-30, before 1.0.

## Options considered

- Modes: write our own Resolver reader, which repeats Lock In's custom resolver; list modes in the build config; or use another tool such as Terrazzo (not evaluated), which reopens 0012.
- CI: GitHub Actions, CircleCI or Vercel builds.
- Node minimum: keep 22, raise to 24 (supported until April 2028), or 26 (newest LTS).
- Versions: exact or ranges, both with a lockfile.
- Checking the output: Node's built-in test runner, Vitest, or only checking that the build succeeds.
- Build scripts: plain JavaScript or TypeScript. TypeScript 7 is out, but tools such as typescript-eslint reportedly cannot use it yet.
- Tokens folder: output ignored by git, or committed.

## Decision

- **Modes** are listed in the Style Dictionary config until Style Dictionary reads Resolver documents. This replaces the Resolver part of 0012; the rest of 0012 stands.
- **CI** is GitHub Actions.
- **Node** minimum is 24. This replaces the Node row of 0022; the rest of 0022 stands.
- **Versions** are exact, with a lockfile: pnpm 12.23.0, Turborepo 2.11.13, Style Dictionary 5.8.0.
- **Output checks** use Node's built-in test runner. The component test runner is chosen later.
- **Build scripts** are plain JavaScript for now.
- **The tokens package** keeps tokens in `src/`, output in `dist/` (ignored by git), and the config and test beside them.

## Consequences

- CI runs on Node 24 and 26, the lowest supported and latest versions (0022).
- Pull requests must pass CI before they merge to `main`.
- Style Dictionary's defaults do not fit React Native or OKLCH. The config turns px dimensions into plain numbers for React Native, and phase 2 needs a setting that keeps OKLCH colors in CSS.
- CSS variables have a prefix, decided in 0027.
- CI installs pnpm from the version in `package.json`, so there is one place to update it.
