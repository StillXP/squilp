# 0028: Package shells and finishing phase 1

Status: Accepted · Date: 2026-11-24

## Context

Phase 1's gate sentence was met, but most of its tasks in the roadmap sheet were not. The remaining packages needed a language, a compiler version and a build, and `@squilp/core` was listed as a phase 1 task although its contents depend on phase 2 foundations.

## Options considered

- Language: TypeScript or JavaScript.
- TypeScript version: 6.0.3 or 7.0.2. typescript-eslint 8.74.0 requires a version below 6.1.
- Package build: `tsc` only, tsdown, Vite library mode, or react-native-builder-bob for React Native.
- `@squilp/core`: a shell only, or everything its task lists (formatting helpers, icon map, size class hook, state hooks), which are phase 2 tasks too.
- Phase 1 tasks: all finished before phase 2, or only the gate sentence.

## Decision

- **Language:** published packages are written in TypeScript. Build scripts stay in JavaScript (0026).
- **TypeScript:** 6.0.3, exact.
- **Build:** `tsc` only, for now. `tsc` does not copy CSS Modules, so the React build is decided again at the first component.
- **`@squilp/core`:** a shell only. Phase 2 fills it.
- **Phase 1:** its tasks are finished before phase 2, with three exceptions. The Vercel deployment moves to phase 3, where the docs site it hosts is built. The Code Connect check moves to phase 3, when React components exist, and covers React only (0023). The core task stays open until phase 2 fills it.

## Consequences

- The shells are private and export nothing yet, so there are no placeholder components.
- No peer dependencies are declared yet. React and React Native are added with the first component that needs them.
- Linting is decided with the Tailwind step.
