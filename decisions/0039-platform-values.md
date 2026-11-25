# 0039: Platform values

Status: Accepted, raw platform values superseded by 0040 · Date: 2026-11-25

## Context

Some token values differ by platform, such as font families and minimum targets. The plan called this a platform layer but not how it is stored. Adobe Spectrum's platform manifest, still a draft, keeps platform changes in separate files, does not let them change a token's type, and puts them above the shared data. Metro does not switch `.ios.js` and `.android.js` files behind a package's `exports`, and has no iOS or Android condition.

## Options considered

- Storage: a file per platform, `$extensions` on each token, or separate token names per platform.
- What a platform may change: the value of an existing semantic token, or also new tokens.
- Shared values: the web values, or neutral values with three platform files.
- React Native: one export with both sets, or one export per platform.

## Decision

- **Storage:** shared values in `packages/tokens/src/`, and `src/platform/ios.tokens.json` and `src/platform/android.tokens.json` for what differs.
- **Allowed:** only the value of a semantic token that already exists, with the same type. Anything else stops the build.
- **Shared values:** the web values.
- **React Native:** `@squilp/tokens/react-native` exports `{ ios, android }`, and `@squilp/react-native` chooses once with `Platform.select`.

## Consequences

- A token that points at an overridden one follows it.
- The token files stay standard DTCG, so other tools read them.
- Style Dictionary does not catch a misspelled name or a changed type, so our build does. Shared files are loaded as `include`, because Style Dictionary treats two sources with the same token as a collision.
- The tokens build runs `build.js` instead of the Style Dictionary command, because React Native needs both platforms in one file.
- A platform value may be raw or point at a shared token.
- There are no platform files yet. They start with the type and sizing tokens.
- How Figma shows platform values is decided with the Figma sync.
