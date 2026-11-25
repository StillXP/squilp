# 0033: Lint exceptions need a reason

Status: Accepted · Date: 2026-11-25

## Context

0030 made linting strict, with no rule for when an exception is acceptable.

## Options considered

- `@eslint-community/eslint-plugin-eslint-comments`, which requires a reason.
- A small rule of our own. No dependency, but in a test it missed a blanket `eslint-disable` and `/* eslint no-var: "off" */`.
- No exceptions at all.

## Decision

Every ESLint comment that turns a rule off or changes it states why, after `--`. `@eslint-community/eslint-plugin-eslint-comments` 4.8.1 checks this everywhere.

## Consequences

- Reviewers can judge each exception from the code.
- ESLint already reports exceptions that are no longer needed, and CI fails on warnings.
