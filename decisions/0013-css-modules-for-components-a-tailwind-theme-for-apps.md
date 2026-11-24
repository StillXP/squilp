# 0013: CSS Modules for components; a Tailwind theme for apps

Status: Accepted · Date: 2026-11-24

## Context

Job listings often ask for Tailwind, and VolleyXP uses styled-components, which entered maintenance mode in 2025.

## Options considered

- Tailwind inside the components.
- CSS Modules with CSS variables in components, plus a Tailwind theme generated from tokens.
- Zero-runtime CSS-in-JS (Vanilla Extract, Panda).

## Decision

Components use CSS Modules and CSS variables. Style Dictionary generates a Tailwind v4 theme that points at Squilp's variables, with Tailwind's defaults turned off and bracket values linted.

## Consequences

- Consumers need no particular styling tool; works with Server Components.
- Tailwind apps get Squilp tokens as utility classes.
- VolleyXP moves off styled-components.
