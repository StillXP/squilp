# 0034: No layout props for now

Status: Accepted · Date: 2026-11-25

## Context

0031 gives components no `className` or `style` prop. Adobe Spectrum makes the same choice but accepts a limited set of layout styles, such as margin and width.

## Options considered

- No layout props. Space comes from Stack, Grid or a wrapper.
- A small set, such as margin and width. Fewer wrappers, but more API to support on both platforms.

## Decision

No layout props. This is decided again when Bracket is built in phase 3, the first real layout.

## Consequences

- Apps wrap a component where Stack or Grid does not fit.
- Adding layout props later is not a breaking change.
