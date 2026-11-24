# 0017: Material Symbols as SVG on every platform

Status: Accepted · Date: 2026-11-24

## Context

SF Symbols on iOS was chosen to be native-first, but in React Native it means two icon sources and extra libraries.

## Options considered

- SF Symbols on iOS, Material Symbols elsewhere.
- Material Symbols as SVG everywhere.

## Decision

Material Symbols (Apache 2.0) as SVG on every platform, rendered with react-native-svg on mobile, behind a semantic icon map. Volleyball icons are drawn as SVGs in the same style.

## Consequences

- Supersedes the SF Symbols choice in the foundations.
- Lock In's icon package is dropped.
