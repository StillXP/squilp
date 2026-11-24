# Squilp

A design system for web and mobile, built on purpose. One token source drives React components for the web, React Native components for iOS and Android, a Tailwind theme for apps, a Figma library, and a read-only MCP server for AI agents.

Squilp is a deliberate v2 of Lock In, my first design system, which grew without a plan. Every choice in Squilp is written down in [`decisions/`](decisions/), and nothing moved over from Lock In without passing an [audit](docs/plan.md#lock-in-audit-rubric).

**Status:** phase 0 complete; setup (phase 1) is next. Not yet published.

## What's here

| Folder | What it holds |
| --- | --- |
| [`docs/plan.md`](docs/plan.md) | The full plan: goals, principles, architecture, foundations, scope, roadmap |
| [`decisions/`](decisions/) | Architecture decision records, numbered and never deleted |
| [`case-study/before/`](case-study/before/) | Screenshots and notes of Lock In and VolleyXP before the rebuild |
| `packages/tokens` | DTCG tokens built by Style Dictionary |
| `packages/core` | Shared logic: formatting helpers, icon map, size class hook |
| `packages/react` | Web components |
| `packages/react-native` | iOS and Android components |
| `packages/mcp-server` | Read-only MCP server for AI agents |
| `apps/docs` | Documentation site (Astro Starlight) |
| `apps/storybook` | Web Storybook with Chromatic visual tests |
| `apps/scorekeeper` | Expo scorekeeper app, the first native product |

## Principles

1. Tokens are the source of truth.
2. Native first, consistent second.
3. Accessible by default: WCAG 2.2 AA is the floor.
4. Write the decision down.
5. Small, composable parts.

## Built with

DTCG 2025.10 tokens · Style Dictionary v5 · React · React Native and Expo · CSS Modules · Tailwind v4 · Storybook and Chromatic · pnpm and Turborepo · Changesets · Figma variables and Code Connect · MCP · Vercel

## First product

[VolleyXP](https://github.com/StillXP/volleyXP), a volleyball league and tournament platform. Its bracket, match card and match detail designs are rebuilt on Squilp; its other screens are redesigned on it.

## License

[MIT](LICENSE)
