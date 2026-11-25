# 0037: Publish step and first version

Status: Accepted · Date: 2026-11-25

## Context

0036 left the publish step open. The aim is trusted publishing, so no npm token is stored, with npm's staged publishing, so nothing goes live without the owner's two-factor approval. Changesets' docs say staged publishing does not work with Changesets for now.

## Options considered

- Changesets for versions and `pnpm stage publish` to upload. Keeps both aims, but neither tool documents the combination.
- Changesets publishes after approval on GitHub. Documented, but the approval is on GitHub and not npm.
- pnpm for versions and publishing. One tool, but replaces part of 0021 and 0036.
- When to build it: with the first release, or now, untested.
- First version: 0.1.0, or 0.0.1, which 0025 would give.

## Decision

- **Publish step:** Changesets manages versions, and `pnpm stage publish` uploads with trusted publishing. The owner approves each release on npm.
- **When:** with the first release in phase 2, because it needs a real upload to test.
- **First version:** 0.1.0, as an exception to 0025.
- **Phase 1:** done, apart from the `@squilp/core` task, which phase 2 fills (0028).

## Consequences

- A dry run staged all five packages. Signing in to npm from CI with pnpm is not proven, because npm documents it only for its own command. If it fails, Changesets publishes instead.
- npm's trusted publisher settings expire after 2 days without a publish, so they are created right before the first release.
- Git tags are made after a release is approved, so a tag never points at a rejected release. That needs its own step.
- 0.1.0 is first because a caret range on 0.0.1 accepts no updates.
- GitHub Actions needs the repo setting that lets it create pull requests before the first release pull request.
- Before the first release, the packages stop being private.
