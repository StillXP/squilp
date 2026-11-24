# 0025: Versioning before 1.0

Status: Accepted · Date: 2026-11-24

## Context

The plan's version table describes releases from 1.0 on. Packages are published before that, while APIs still change.

## Options considered

- Breaking changes are minor versions and everything else is a patch until 1.0.
- Breaking changes are major versions from the start, which reaches 1.0 and beyond before the API is ready.

## Decision

Until 1.0, breaking changes are minor versions and everything else is a patch. From 1.0, the version table in the plan applies.

## Consequences

- A caret range such as `^0.3.0` accepts patches only, so a breaking change never arrives on its own.
- New components and props are patches before 1.0, so the changelog, not the version number, shows what was added.
