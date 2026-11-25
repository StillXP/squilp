# 0029: Figma library structure

Status: Accepted · Date: 2026-11-25

## Context

Phase 1 sets up the Figma file, its pages and its naming. The audit marked Lock In's Figma library Rework: keep the page structure, with its Docs and Props frames and Changelog, and rebuild on Squilp variables and names. Lock In's cover also showed counts and versions that disagreed with its hub and Storybook.

## Options considered

- Foundation pages: one for each of the ten foundations, or Lock In's four grouped pages.
- Component pages: added as each component is built, or all created now.
- VolleyXP parts: a separate file, or pages in the same file.
- Prototype Playground: kept or dropped.

## Decision

- **File:** "Squilp Design System", on the Professional plan (0023). Its link stays out of this public repo.
- **Pages:** Cover, Getting Started, Changelog and Prototype Playground; a Foundations divider, then one page for each of the ten foundations in the plan's order; a Components divider, then one page for each component, added in alphabetical order as it is built.
- **VolleyXP parts:** a separate file, created with the first part, because the product layer versions separately (0004).
- **Page header:** a small label, a title and an introduction.
- **Component page:** `Docs / Button`, the component set, `Props / Button` and `Prototype / Button`. Props puts Figma properties next to code props and says where they differ.
- **Names:** components and pages use the plan's names. Properties and values match code props (`variant=primary`, `size=md`). `state` has no matching prop and exists in Figma only. Variables follow the token path, with slashes for dots (`color/background/accent`).
- **Cover:** status and the source of truth only. No counts.

## Consequences

- The file has no variables, styles or components. The token sync creates variables in phase 2 (0023).
- The pages use neutral gray and Inter with raw values until then, and are moved to Squilp variables in phase 2.
- A component without a page has not been built in Figma, so progress is tracked in the inventory sheet.
- The Figma file and the packages share one version and one changelog, unlike Lock In.
