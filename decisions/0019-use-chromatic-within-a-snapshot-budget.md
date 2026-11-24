# 0019: Use Chromatic within a snapshot budget

Status: Accepted · Date: 2026-11-24

## Context

Lock In ran out of Chromatic's free 5,000 snapshots a month and testing paused.

## Options considered

- Switch to Playwright screenshot tests.
- Keep Chromatic, the common tool, with rules that fit the free plan.

## Decision

Keep Chromatic with TurboSnap on, runs only on pull requests and merges that touch components or tokens, no Chromatic accessibility tests (axe runs in Storybook), one snapshotted variants story per component, and light and dark only on that story.

## Consequences

- Playwright is the fallback if the budget still runs out.
