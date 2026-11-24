# 0003: VolleyXP is the first product built on Squilp

Status: Accepted · Date: 2026-11-24

## Context

A design system without a real consumer drifts toward theory. VolleyXP, a volleyball league and tournament platform, is data-heavy and already exists.

## Options considered

- Build Squilp in isolation.
- Use VolleyXP as the first consumer.

## Decision

VolleyXP is Squilp's first product. Its needs set priorities, which brings data-heavy components into scope; Data table replaces a simple Table.

## Consequences

- Real usage tests every component.
- Scope includes data components that a generic system might skip.
- Only VolleyXP's bracket, match card and match detail designs are final. Its other screens were generated without a plan and are redesigned on Squilp rather than migrated.
