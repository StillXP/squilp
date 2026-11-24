# 0014: Breakpoints use Tailwind's values with three size classes

Status: Accepted · Date: 2026-11-24

## Context

Window size classes (600/840/1200) were chosen for SwiftUI and Compose; 0008 and 0013 removed that reason.

## Options considered

- Keep window size classes.
- Tailwind's default values with semantic size classes on top.

## Decision

Breakpoint tokens are 640, 768, 1024, 1280 and 1536. Components design for three size classes: compact under 640, medium 640 to 1023, expanded 1024 and up. React Native reads the same values through a hook.

## Consequences

- Supersedes the window size class choice in the foundations.
- Lock In's breakpoint values carry over unchanged.
