# 0027: CSS variables use a squilp prefix

Status: Accepted · Date: 2026-11-24

## Context

Style Dictionary names CSS variables after the token path, so `space.1` became `--space-1`. An app that has its own variables could use the same name.

## Options considered

- No prefix. Shorter, but can clash with an app's own variables.
- A `--squilp-` prefix. Longer, but unlikely to clash and clear about where a value comes from.

## Decision

Every CSS variable starts with `--squilp-`, such as `--squilp-space-1`.

## Consequences

- The prefix is set once, on the CSS platform in the Style Dictionary config.
- Token names and the React Native theme do not change.
- Components and the Tailwind theme use the prefixed variables.
