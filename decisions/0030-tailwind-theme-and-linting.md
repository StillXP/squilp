# 0030: Tailwind theme and linting

Status: Accepted · Date: 2026-11-25

## Context

0013 gives apps a Tailwind v4 theme generated from the tokens, with Tailwind's defaults off and bracket values linted. It left open the linter, how an app sets its color mode, and where the theme and the rules live. 0028 left linting to this step.

With the defaults off, `bg-blue-500` and `p-13` no longer exist. But `z-13`, `duration-150`, `opacity-37`, `border-2`, `bg-accent/50` and `p-px` still compile, because Tailwind does not read those values from the theme.

## Options considered

- Linter: ESLint with typescript-eslint and `eslint-plugin-better-tailwindcss`, Biome, or Oxlint. On the same sample classes, Biome missed `bg-(--x)`, `bg-accent/[0.3]` and `bg-blue-500`, and its bracket rule is experimental. Oxlint can run the same plugin, but its JavaScript plugins are alpha. `eslint-plugin-tailwindcss` missed `bg-(--x)`, `bg-accent/[0.3]` and `[color:red]`.
- Lint scope: bracket values only, or also the raw values the theme does not control.
- Color mode: a `data-color-mode` attribute, a `.dark` class, or the device setting only.
- Theme location: `@squilp/tokens`, or a separate package.
- Lint rules: in this repo, or a published config package.

## Decision

- **Linter:** ESLint 10.15.0 with `@eslint/js` 10.0.1, typescript-eslint 8.74.0 and `eslint-plugin-better-tailwindcss` 4.11.0. CI runs `pnpm lint` after the build and fails on warnings.
- **Rejected in app code:** classes that are not in the theme, bracket and parenthesis values, raw breakpoints, plain numbers for layering, motion timing, opacity and line widths, opacity and line-height modifiers such as `/50`, and one-pixel classes.
- **Allowed:** bracket variants such as `data-[state=open]:flex`, fractions such as `w-1/2`, and layout numbers such as `grid-cols-3`.
- **Color mode:** `data-color-mode="dark"` on any element. Tailwind's `dark:` follows it and not the device setting.
- **Theme:** `@squilp/tokens/tailwind.css`, built by Style Dictionary. Apps import it after `tailwindcss`.
- **Lint rules:** in `lint/`, with the sample classes that test them. They apply to `apps/`, because components use CSS Modules (0013).
- **Tailwind:** 4.3.5 as a dev dependency of `@squilp/tokens`, to test the theme, and of the repo root, where the lint plugin needs it.

## Consequences

- `data-color-mode` is a public name. Changing it later is a breaking change.
- A section can have a different mode from the page: `dark:` stops where a nested element sets another mode. Dark inside light inside dark is not supported for `dark:`.
- Each token category needs a Tailwind namespace in `packages/tokens/tailwind-format.js`. One without it stops the build, so phase 2 adds each one on purpose.
- The theme holds only the test token until phase 2. Breakpoints, colors and the rest do not exist as classes before then.
- `border` and `outline` on their own still draw a one-pixel line.
- typescript-eslint needs TypeScript below 6.1, so moving to TypeScript 7 waits for it (0028).
- VolleyXP gets the lint rules in phase 4, when sharing them is decided. CSS Modules get their own raw-value check in phase 3.
- How an app loads the CSS variables that the theme points at is decided with publishing.
