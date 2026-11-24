# 0012: Build tokens with Style Dictionary from DTCG 2025.10 JSON

Status: Accepted, Resolver part superseded by 0026 · Date: 2026-11-24

## Context

Lock In used a custom build script and resolver that only I could maintain. The DTCG format reached its first stable version (2025.10) in October 2025.

## Options considered

- Keep the custom build.
- Style Dictionary v5, the common tool for this.

## Decision

Tokens are DTCG 2025.10 JSON with one set per mode and a Resolver document. Style Dictionary v5 builds CSS variables, a Tailwind v4 theme, a React Native theme and Figma-ready JSON.

## Consequences

- Lock In's build script and resolver are dropped.
- The contrast check and Figma export are reworked to read Style Dictionary output.
