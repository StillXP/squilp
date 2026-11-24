# 0004: Volleyball-specific components live in a product layer

Status: Accepted · Date: 2026-11-24

## Context

Bracket, Standings, Match card and similar parts are specific to VolleyXP.

## Options considered

- Put them in core.
- Keep them in the app.
- A product layer between core and the app.

## Decision

A VolleyXP product layer holds volleyball-specific components, built only from core components and semantic tokens. A part is promoted to core when a second product needs it or it has nothing volleyball-specific in it, through the normal proposal process.

## Consequences

- Core stays generic.
- Governance has a real promotion rule to apply.
- The product layer versions separately.
