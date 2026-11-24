# 0001: Rebuild Lock In as Squilp, a planned v2

Status: Accepted · Date: 2026-11-24

## Context

Lock In, my first design system, grew without a plan. Many choices (technology, governance, tooling) were accepted as suggested rather than decided. VolleyXP depends on it, and I want a system I can explain and defend.

## Options considered

- Keep patching Lock In: no rewrite cost, but undocumented decisions stay baked in.
- Start from zero: clean, but throws away parts that are good and stalls VolleyXP.
- Clean v2: audit Lock In, rebuild from a written plan, move over only what passes.

## Decision

Build Squilp as a deliberate v2 of Lock In. Lock In is audited first; parts move over only if they meet Squilp's rubric. VolleyXP moves to Squilp screen by screen, then Lock In is retired. The system is named Squilp.

## Consequences

- Every Squilp choice has a decision record.
- The audit and this record become the 'before' chapter of the case study.
- Two systems exist side by side until the migration ends.
