# 0007: No league or team color theming in v1

Status: Accepted · Date: 2026-11-24

## Context

On reflection, league and team theming (0006) added a runtime theme generator, team color rules and extra testing for little v1 value.

## Options considered

- Keep theming in v1.
- Leave it out and revisit after 1.0.

## Decision

No brand layer and no team colors in v1. Every league and team uses Squilp's own accent. Components only use semantic accent roles, so a brand layer can still be added later without changing them.

## Consequences

- Supersedes 0006.
- Lock In's arena and arcade themes are dropped.
- Revisit after 1.0.
