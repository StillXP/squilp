# 0040: Color tokens

Status: Accepted · Date: 2026-11-25

## Context

0038 set the purple ramp, the red and plain neutrals. The other ramps, the semantic names, how the three modes are stored and the format colors ship in were open. 0022 says the color modes follow the system's dark theme, while 0030 ties them to `data-color-mode`.

## Options considered

- Modes: one full file per mode, or dark and high contrast listing only what differs.
- States: `$root`, or `accent.default`, which would make `bg-accent` into `bg-accent-default`.
- No mode set: light, or the device's setting.
- Format: hex everywhere, or OKLCH in CSS and hex on React Native. OKLCH's main advantage is colors outside sRGB, and every ramp fits in sRGB.
- Filled red in dark mode: as it is, or a brighter red with dark text.
- Platform values: raw or references, or references only.

## Decision

- **Primitives:** neutral, purple, red, green, yellow and blue ramps, in `packages/tokens/src/color.tokens.json`. All but neutral use purple's lightness steps. Red 700 is `#cc272e`.
- **Roles:** background, text and border, in `packages/tokens/src/color-mode/`. Icons use the text roles. Live has its own names.
- **Modes:** one full file each for `light`, `dark` and `high-contrast`, which are also the values of `data-color-mode`. The build stops if they do not have the same names, or if a role does not point at a primitive.
- **States:** `$root` holds a role's own value, so `color.background.accent` can have `color.background.accent.hover`.
- **No mode set:** light. An app decides whether to copy the device's setting into `data-color-mode`.
- **Format:** OKLCH in the source, with its hex beside it, and hex in every output.
- **Filled red in dark mode:** as it is. A filled control with a readable label does not have to reach 3:1 against its surface.
- **Platform values:** must point at a shared token. This replaces the raw values in 0039.

## Consequences

- Of 279 pairs checked, 273 reach their target. The other six are the filled red in dark mode. CI checks are added in their own task.
- A test compares each hex with its OKLCH value.
- Primitive colors are not built, because only semantic tokens may use them.
- Style Dictionary drops a token placed inside another token without an error, so the naming check rejects it.
- React Native names are flat within each mode, such as `color.dark.backgroundAccentHover`, so adding a state does not change the shape of an existing color.
- In Tailwind, backgrounds, text and borders have their own classes, so `bg-accent` and `text-accent` can differ. Borders also work as outlines.
- Hover and pressed exist for the accent only. Other states come with the components that need them.
- If the ramps ever leave sRGB, CSS can switch to OKLCH in the build.
