# Squilp: design system plan

Nov 24, 2026 · @Peggy

## Overview

One token source drives a design system for web, iOS, Android and Figma. Its first consumer is VolleyXP, a volleyball league and tournament platform. It will also power my other personal projects, double as a portfolio case study, and be usable by AI agents through an MCP server. Version 1 ships foundations, the full component library and a documentation site.

The system is built in the open with every major decision written down. The process should be as easy to see as the components. A reviewer should be able to trace any button from a primitive color value through to the shipped code on each platform.

**Name:** Squilp. It is a deliberate v2 of Lock In, my first design system, which grew without a plan and which VolleyXP uses today. Squilp is built from this plan; Lock In is audited and only the parts that meet Squilp's bar move over.

## Decisions

Seventeen decisions made on 24 Nov 2026 shape the rest of this plan; one reverses an earlier one. Each will get a full decision record in the repo once it exists.

| # | Decision | Effect on the plan |
| --- | --- | --- |
| 1 | VolleyXP is the first product built on the system | Data-heavy components move into scope; Data table replaces the simple Table |
| 2 | Bracket, Standings, Match card and other volleyball-specific parts live in a VolleyXP product layer, not in core | A third layer between core and the app, with a rule for promoting parts to core |
| 3 | Web, iOS and Android all ship at launch | Every core component is built on all three platforms before 1.0 |
| 4 | Reversed by decision 9: leagues could theme VolleyXP with their own colors | None now; kept in the log as a reversed decision |
| 5 | Contributions come in through a form on the docs site that creates a GitHub issue | GitHub stays the record; the docs site is the front door |
| 6 | The system is AI-usable through an MCP server | Every component needs a machine-readable metadata file; agent evals run in CI |
| 7 | Squilp is a clean v2, not a rewrite from zero: Lock In is audited, and parts move over only if they meet the new bar | A new phase 0 audits Lock In; VolleyXP moves to Squilp screen by screen, then Lock In is retired |
| 8 | The system is named Squilp | Packages, repo and docs site use the Squilp name |
| 9 | League and team color theming is left out for now, reversing decision 4 | No brand layer or team colors in v1; semantic accent roles keep room to add them after 1.0 |
| 10 | Native components are built in React Native, not SwiftUI and Compose | Two component codebases instead of three; Lock In's React Native package is reworked rather than dropped; about six weeks come off the timeline |
| 11 | The MCP server is read-only | No API keys, roles, database or editing tools; every change goes through a pull request |
| 12 | Components are styled with CSS Modules and CSS variables; apps get a Tailwind v4 theme generated from the tokens | The library needs no styling tool from consumers; VolleyXP moves off styled-components to Squilp plus Tailwind |
| 13 | Breakpoints use Tailwind's default values, with three semantic size classes (compact, medium, expanded) on top | Replaces the window size classes chosen for SwiftUI and Compose; Lock In's breakpoint values carry over unchanged |
| 14 | A small Expo scorekeeper app is the first native product built on Squilp | @squilp/react-native has a real consumer; offline scoring proves the live and network states pattern; about two weeks added before 1.0 |
| 15 | Apps use Expo; the React Native package works in any React Native app | Follows React Native's own recommendation to start with a framework |
| 16 | Material Symbols as SVG on every platform, replacing SF Symbols on iOS | One icon source behind the semantic icon map; volleyball icons drawn as SVGs in the same style |
| 17 | React Native components are not shown in web Storybook | On-device Storybook and React Native Testing Library instead; device screenshots in the docs; Chromatic stays web-only |

## Goals and success measures

The system has four goals, ranked by what the portfolio piece should show most. Each has a measure I can check at launch.

| Rank | Goal | What it shows | Success measure at v1 |
| --- | --- | --- | --- |
| 1 | Systems architecture | One token source scales across platforms and color modes | Every platform output generated from one token repo; zero hand-edited values in platform code; a new color mode needs no component changes |
| 2 | Process and governance | Decisions are deliberate, recorded and versioned | Every major decision has a decision record; semantic versioning with a changelog from 1.0.0; every contribution traceable from form to release |
| 3 | Accessibility first | Inclusive design built in, not bolted on | All components meet WCAG 2.2 AA; each passes automated checks plus a manual screen reader pass on every platform it ships to |
| 4 | Visual craft | A distinct, polished visual identity | A visual language I would happily use on my own projects; VolleyXP built only from system components |
| — | AI-usable | Agents build with the system correctly | The MCP server passes its eval set on every release |

**Non-goals for v1**

- Serving outside contributors at scale. Governance is designed for that, but the only real consumer is me.
- Charts and a rich-text editor. Data table, Stat tile and the VolleyXP data components are in scope; charts can follow 1.0.
- League and team color theming (decision 9); revisit after 1.0.
- Marketing-site templates or page layouts beyond what the docs site and VolleyXP need.

## Design principles

Five principles settle arguments before they start. When two options are both reasonable, the one that better fits these wins.

1. **Tokens are the source of truth.** No value lives only in Figma or only in code. If it is a decision, it is a token.
2. **Native first, consistent second.** Components feel at home on each platform: the React Native components use each platform's native controls and behaviors on iOS and Android. They share tokens, names and behavior, not pixel-identical rendering.
3. **Accessible by default.** The easy way to use a component is the accessible way. Accessibility is a definition-of-done item, never a follow-up ticket.
4. **Write the decision down.** Anything that would make a future me ask "why?" gets a short decision record.
5. **Small, composable parts.** Prefer primitives that combine over large components with many props.

## Platforms and tooling

Tokens live as DTCG JSON in a git repo and are built for every platform with Style Dictionary. Figma follows code, not the other way round. The [DTCG specification reached its first stable version, 2025.10](https://w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/), on 28 Oct 2025. [Style Dictionary 5.5 added support for its dimension format](https://github.com/nl-design-system/example/pull/994).

| Layer | Choice | Why |
| --- | --- | --- |
| Token source | DTCG 2025.10 JSON (`.tokens.json`) in the monorepo | An open, stable format that any tool can read; modes are listed in the build config for now (decision record 0026) |
| Token build | Style Dictionary v5 | Outputs CSS custom properties, a Tailwind v4 theme, a JS/TS theme for React Native and Figma-ready JSON from one config; the common tool, replacing Lock In's custom build |
| Design | Figma variables, modes and a component library (structure in decision record 0029) | [Native DTCG import exists](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables) but only takes px dimensions and skips composite tokens, so a script covers the gaps |
| Web | React components styled with CSS Modules and CSS custom properties; a Tailwind v4 theme generated from the tokens for apps | Fits VolleyXP (Next.js) and Storybook; consumers need no particular styling tool and it works with Server Components, while Tailwind apps get Squilp tokens as utility classes (decision 12) |
| iOS and Android | One React Native package (`@squilp/react-native`) | One component codebase for both phones, sharing the web API, tested in an Expo scorekeeper app; Lock In's React Native package is the starting point (decision 10) |
| Repo | pnpm workspaces + Turborepo | One pull request can change a token and every package that uses it. Packages: tokens, core (shared logic), react, react-native, mcp-server. Apps: docs, Storybook, scorekeeper (Expo) |
| Versioning | Changesets; every package published to npm under @squilp | One version number across all packages |
| Docs | Astro Starlight site with embedded Storybook stories and device screenshots | See Documentation site |
| Testing | Storybook interaction tests, axe-core and Chromatic visual tests on web; React Native Testing Library and on-device Storybook for behavior and accessibility queries; manual VoiceOver and TalkBack passes on devices | Visual regressions and accessibility caught in CI |

**Chromatic snapshot budget.** Chromatic's free plan includes 5,000 snapshots a month, and testing pauses when they run out, which is what happened on Lock In. Squilp stays inside it with five rules:

- TurboSnap on, so unchanged stories are copied from the baseline instead of re-captured.
- Run on pull requests and merges to main only, and only when component or token files change.
- No Chromatic accessibility tests; axe already runs free in the Storybook test runner.
- One "all variants" story per component is snapshotted; the rest set `disableSnapshot`.
- Light and dark modes only on the variants story, not on every story.

If the budget still runs out, Playwright screenshot tests are the fallback.

**Tailwind theme rules.** The Tailwind theme Style Dictionary generates follows five rules, so Tailwind apps stay on Squilp tokens:

- Theme variables point at Squilp's CSS variables, never raw values, so color and density modes work in Tailwind classes automatically.
- Tailwind's `dark:` variant is tied to Squilp's color mode setting.
- Tailwind's default palette and scales are turned off: a class like `bg-blue-500` does not exist.
- A lint rule rejects bracket values such as `bg-[#ff6600]` or `p-[13px]`.
- Class names are short and readable: `color.background.accent` becomes `bg-accent`.

**Shared logic.** `@squilp/core` holds everything that is not visual and is shared by web and mobile: state hooks, the data formatting helpers, the icon map and the size class hook.

### Cross-platform API conventions

React and React Native components share one API: the same component names, the same props and the same values. Where the platforms differ, such as events and accessibility props, a Squilp prop hides the difference so product code reads the same on web and mobile.

| Concept | React (web) | React Native |
| --- | --- | --- |
| Component name | `Button` | `Button` |
| Visual style | `variant="primary"` | `variant="primary"` |
| Size | `size="md"` | `size="md"` |
| Disabled | `disabled` | `disabled` |
| Action | `onPress` (maps to `onClick`) | `onPress` |
| Accessible label | `label` (becomes `aria-label`) | `label` (becomes `accessibilityLabel`) |

**Rules**

- Prop names and values match on both platforms; a prop that only makes sense on one is marked platform-only in the metadata.
- Squilp's own props (`onPress`, `label`) hide platform differences instead of exposing `onClick` or `accessibilityLabel`.
- The component metadata file records the API once, with any platform-only props flagged, so the docs site and the MCP server show it correctly.
- New components need their API row in the conventions doc before work starts.

## Token architecture

Tokens come in three tiers, and components may only use the top two. This is the core of the portfolio story: a theme or a platform changes values at the bottom, and nothing above has to change.

| Tier | Holds | Example | Who uses it |
| --- | --- | --- | --- |
| Primitive | Raw values with no meaning | `color.blue.600`, `space.4`, `font.size.300` | Only semantic tokens |
| Semantic | Purpose, set per mode | `color.background.accent`, `space.inset.md`, `text.body.md` | Components and product code |
| Component | Component-only overrides, added only when a semantic token cannot express it | `button.primary.background.hover` | That one component |

**Modes.** Semantic tokens resolve per mode through modes listed in the Style Dictionary config, until Style Dictionary reads DTCG Resolver documents (decision record 0026). v1 ships three color modes (light, dark, high contrast) and two density modes (comfortable, compact). A platform layer sits beside them for values that must differ by platform, such as font families and minimum touch target size.

**League and team colors.** Left out for now (decision 9). Every league and team uses Squilp's own accent, and Team identity shows a team's crest and name without a team color. Because components only use semantic accent roles, a brand layer can still be added after 1.0 without changing them.

**Naming.** Semantic names read `category.property.variant.state`, for example `color.text.danger.disabled`. Names describe purpose, never appearance. `color.background.accent` survives a rebrand; `color.background.blue` does not.

**Rules enforced in CI**

- Components never reference a primitive token directly.
- Every semantic color pair (text on background) meets its contrast target in every mode.
- No unused tokens and no broken references at build time.

## Foundations

Ten foundations come first, because every component is built from them. Each gets a docs page, a token set and a Figma variable collection before any component work starts.

| Foundation | v1 approach | Decision (24 Nov 2026) |
| --- | --- | --- |
| Color | Primitive ramps built in OKLCH for even lightness steps; semantic roles for background, text, border, icon and status | Decided: orange brand hue, carried over from Lock In's arena theme; one accent color, plus neutrals and four status colors |
| Typography | A modular scale exposed as semantic text styles (display, heading, body, label, code); maps to Dynamic Type on iOS and font scale on Android | Decided: system fonts on native (SF Pro on iOS, Roboto on Android) and Inter on web, with JetBrains Mono for code in the docs. Scores use each font's tabular figures. No font licensing needed in the apps |
| Layout | Breakpoint tokens, a column grid per breakpoint, safe-area handling on iOS and Android, and rules for how layouts reflow from phone to desktop | Decided: breakpoint tokens use Tailwind's default values (640, 768, 1024, 1280, 1536). Components design for three size classes aliased to them: compact under 640, medium 640–1023, expanded 1024 and up. React Native reads the same values through a hook. A large-screen display mode is planned for after 1.0 |
| Spacing | A 4 px base grid, semantic inset, stack and inline tokens | Decided: fixed steps on the 4 px grid on every platform; layouts change at breakpoints, not fluidly |
| Sizing | Control heights per density mode; minimum targets of 24 px web, 44 pt iOS, 48 dp Android | — |
| Radius | A short scale (none, sm, md, lg, full) set semantically per component family | Decided: soft. Buttons and inputs 8 px, cards 12 px, tags and badges pill-shaped |
| Elevation | Shadow plus surface tint per level; dark mode leans on tint | Decided: 3 levels. Raised (cards), overlay (menus, popovers, sheets), modal (dialogs) |
| Motion | Duration and easing tokens; every animation respects reduced-motion settings | Decided: functional only for v1, built on Lock In's three durations and three easings. A signature animation is planned for after 1.0 |
| Iconography | A semantic icon map: one name per meaning (such as icon.edit) that points to an SVG icon, kept in the token repo and served by the MCP server | Decided: Material Symbols (Apache 2.0) as SVG on every platform, rendered with react-native-svg on mobile. Volleyball icons are drawn as SVGs in the same style (decision 16) |
| Layering | Z-index tokens for sticky headers, dropdowns, overlays, modals and toasts, so stacking order is decided once | Decided: carried over from Lock In's z-index set (audit, 24 Nov 2026) |

### Data formatting

Scores, records and times look the same on every screen and platform because they come from shared formatting helpers, not from each component. The helpers live in @squilp/core and are shared by web and mobile, with one set of tests.

| Data | Rule |
| --- | --- |
| Set scores | Winner's score first in results (25–19); tabular figures so columns line up |
| Match result | Sets won, then set scores (2–1: 25–19, 22–25, 15–11) |
| Records and ratios | Wins–losses (7–2); set ratio to two decimals |
| Rankings | Ordinal with ties marked (T-3rd) |
| Dates and times | The viewer's locale format; the venue's time zone shown when it differs from the viewer's |
| Relative time | Only for live or recent events ("started 12 min ago"), with the exact time available to screen readers |

## Component library scope

v1 covers 44 components in seven categories. They are built in four waves, so each wave is shippable on its own. Priority, platforms, variants and status for each one live in the Component inventory sheet (see Supporting materials).

| Category | Components | Count |
| --- | --- | --- |
| Primitives | Text, Heading, Icon, Stack, Grid | 5 |
| Actions | Button, Icon button, Button group, Link | 4 |
| Inputs | Text field, Text area, Select, Combobox, Checkbox, Radio group, Switch, Slider, Search field, Date picker | 10 |
| Feedback | Alert, Toast, Progress bar, Spinner, Skeleton, Badge, Tooltip | 7 |
| Navigation | Tabs, Breadcrumbs, Pagination, Top app bar, Side navigation, Bottom navigation, Menu | 7 |
| Overlays | Dialog, Sheet, Popover | 3 |
| Data display | Card, List, Data table, Avatar, Tag, Divider, Accordion, Empty state | 8 |

**Waves**

1. Primitives, Actions, Card and Popover: proves the token pipeline end to end on all three platforms, and pulls in what Bracket needs so it can be rebuilt early.
2. Inputs: the hardest accessibility work, done while the scope is still fresh.
3. Feedback, Dialog and Sheet: focus management and announcements.
4. Navigation and Data display: completes the set and feeds the showcase app.

Some components are web-only or mobile-only by nature. Breadcrumbs and Pagination ship on web only, and Bottom navigation ships on iOS and Android only.

Data table is the heaviest core component, because VolleyXP depends on it everywhere. It needs sorting, filtering, sticky headers, row selection, and a stacked layout on phones.

### VolleyXP product layer

Volleyball-specific parts live in a product layer built only from core components and semantic tokens. They follow the same definition of done as core, but version separately so they can move faster.

| Component | Built from | Notes |
| --- | --- | --- |
| Bracket | Card, Popover, Stack | Flagship and case study centerpiece. Its design, with Match card and the match detail sheet, is final. Needs tree semantics, keyboard movement between rounds, and a round-by-round view on phones |
| Standings table | Data table, Badge | Rank, record and set ratio; highlights playoff lines |
| Match card | Card, Badge, Avatar | Set-by-set scores, live and final states |
| Schedule list | List, Tabs | Matches grouped by day, court or round |
| Team identity | Avatar, Text | Team crest and name, used across every page |
| Stat tile | Card, Text | A single figure with its label; promotion candidate |
| Filter bar | Select, Search field, Tag | Filters for season, division and team; promotion candidate |

**Promotion to core.** A product component moves to core when a second product needs it, or when it has nothing volleyball-specific in it. Promotion goes through the normal proposal process and gets a decision record.

## Accessibility standards

WCAG 2.2 AA is the floor for every component on every platform, and a component is not done until it passes the checklist below. Where a platform's own guidance asks for more, such as larger touch targets, the stricter rule wins.

**Built into tokens**

- Text contrast of 4.5:1 (3:1 for large text and UI parts) is checked in CI for every semantic pair in every mode.
- The high-contrast mode targets 7:1 for body text.
- Motion tokens fall back to no motion when reduced motion is on.
- Type tokens scale with Dynamic Type (iOS), font scale (Android) and browser zoom to 200% without loss of content.

**Definition of done per component**

| Check | Web | iOS | Android |
| --- | --- | --- | --- |
| Automated | axe-core in Storybook and CI | React Native Testing Library queries | React Native Testing Library queries, plus Accessibility Scanner on device |
| Screen reader | VoiceOver (iPhone Safari) and NVDA (Windows); one macOS VoiceOver pass before 1.0 for keyboard-heavy components | VoiceOver | TalkBack |
| Keyboard and focus | Full keyboard support following ARIA Authoring Practices patterns; visible focus ring | Full Keyboard Access and focus order | Keyboard and switch access, focus order |
| Text scaling | 200% zoom and 400% reflow | Largest accessibility text size | 200% font scale |
| Docs | Accessibility section: roles, keyboard map, what is announced | Same | Same |

Each component page records who tested it, when, and on which assistive technology. This audit trail is also strong portfolio evidence.

## Live and network states

VolleyXP shows scores that change during play and is used in gyms with poor signal, so live and network states are a system pattern, not something each screen invents. Every data component supports the states below.

| State | What the user sees | What a screen reader hears |
| --- | --- | --- |
| Live | A "Live" badge with text, not a color dot alone; scores update in place | Score changes announced politely, at most once per point |
| Updating | Existing data stays visible with a subtle progress indicator; no layout jump | Nothing, unless the update takes longer than a few seconds |
| Stale | A note with the time of the last update and a retry action | The note is read when focus reaches the component |
| Offline | A banner saying changes will sync later; actions stay available where they can be queued | Announced once when the connection drops and once when it returns |
| Couldn't save | The unsaved change stays visible, marked, with a retry action | Announced right away, assertively |

The Expo scorekeeper app is where this pattern is proven: a score entered offline is never lost, and the scorer always knows whether it has reached the server.

## Documentation site

The docs site is a product in its own right and the front door of the portfolio piece. It is built with Astro Starlight, pulls token values straight from the build output, and embeds live web examples from Storybook.

**Site structure**

- Getting started: install per platform, theming, contributing
- Foundations: one page per foundation, with live token tables in every mode
- Components: one page per component (template below)
- Patterns: forms, empty and error states, live and network states, navigation across platforms
- Decisions: the decision record log, newest first
- Changelog: generated from Changesets
- Contribute: the Proposal and Submission forms, and the public contribution queue
- AI: MCP server setup, `llms.txt`, and how agents should use the system

**Component page template**

1. Overview: what it is and one live example
2. When to use, and when to use something else
3. Anatomy: a labeled diagram of its parts
4. Variants and states, shown live
5. Platform notes: how it differs on web, iOS and Android, with screenshots
6. Accessibility: roles, keyboard map, what is announced, test record
7. Tokens: every token the component uses
8. API: props for React and React Native
9. Do and don't examples
10. Changelog for this component

Native screenshots are captured from the React Native stories running on an iPhone and an Android emulator.

## AI usability (MCP server)

Agents use the system through an MCP server that ships with 1.0. The server is the small part; the work is making every piece of the system machine-readable and keeping it from drifting away from the code.

**What it serves**

- Tokens: the DTCG source, with modes and alias chains resolved.
- Component metadata: one JSON file per component with status, platforms, props, variants, tokens used, accessibility requirements, and when to use it or something else. Generated from code where possible (TypeScript types, DocC, KDoc) and validated against a schema in CI.
- Guidelines and patterns: the docs site content as markdown.

**What it exposes**

| MCP part | Contents |
| --- | --- |
| Resources | Tokens, component docs, guidelines, patterns |
| Tools | `search_components`, `get_component`, `get_tokens` (by category and mode, with Tailwind class names), `resolve_token`, `check_usage` (flags raw values and components that do not exist) |
| Prompts | Starting points such as building a screen from system components |

**How we know it works**

1. Unit tests for each tool, and contract tests that check every response against the metadata schema.
2. Manual checks with MCP Inspector during development.
3. An agent eval set, run on every release. Tasks such as "build a standings page" or "add a match card to the team page" are graded on: only system components used, no raw values, axe passes, and the code builds.
4. The server reports its version and serves the data for the package version installed, so agents never get docs for the wrong release.

**Around the server**

- An `llms.txt` on the docs site and an AGENTS.md in the repo.
- Figma Code Connect, so the Figma MCP maps designs to the real components.
- Distribution as an npm package that runs locally, plus a read-only hosted endpoint on the docs site.
- [Adobe Spectrum's MCP servers](https://opensource.adobe.com/spectrum-design-data/ai) are the closest public reference.

## Design and code drift

Drift cannot be removed, only caught quickly. Each kind gets one source of truth and its own check, automated wherever the tools allow.

| Kind of drift | Source of truth | How it is caught |
| --- | --- | --- |
| Tokens: values differ between Figma and code | Code (the DTCG token repo) | Figma variables generated from the token build; a CI check diffs exported Figma variables against the tokens and fails or opens a pull request |
| Component API: Figma properties do not match code props | Code, with Figma names matching prop names exactly | Code Connect mappings; a CI check reads the Figma file's component properties and compares them with each component's metadata file |
| Visual: the built component does not match the design | Figma before release, code after | Visual regression tests (Chromatic on web, within the snapshot budget) catch changes after release; design QA on each pull request links the Figma frame and shows screenshots on every platform |
| Usage: products detach components or hardcode values | The system's components and tokens | Lint rules against raw values and Tailwind bracket values, and the MCP `check_usage` tool, run on VolleyXP in CI |

**Release discipline**

- The Figma library and the packages are published as one release, with one version number and one changelog.
- A component change is done only when Figma and code are updated in the same release.
- The inventory sheet tracks parity per surface (Figma, web, iOS, Android), so drift is visible at a glance.

**Plan limits.** Squilp uses Figma Professional (decision record 0023). The Variables REST API is limited to Enterprise plans, and library analytics for detach rates need an Organization plan, so token sync runs through the Figma MCP at release time, using one script saved in the repo, and usage drift is caught in code only. Code Connect is limited to one active library and one framework, so it maps React only.

## Governance

Governance is set up as if a team will use the system, even though the only consumer today is me. It costs little to run solo and is the second pillar of the portfolio story.

**Decision records.** Any choice that is hard to reverse or that I might question later gets a short record in `/decisions`, numbered and never deleted. Superseded records link to their replacement.

```markdown
# 0007: Use OKLCH for primitive color ramps
Status: Accepted · Date: 2026-12-02
## Context
What problem forced a decision.
## Options considered
Each option with its trade-offs.
## Decision
What was chosen, in one paragraph.
## Consequences
What gets easier, what gets harder, what to revisit.
```

**Component lifecycle**

1. Proposed: submitted through the Proposal form on the docs site (see Contribution).
2. Alpha: built on one platform behind an `experimental` label; API may change.
3. Beta: on all target platforms, accessibility checklist passed, docs page drafted.
4. Stable: API frozen; breaking changes need a major version.
5. Deprecated: kept for at least one major version with a migration note, then removed.

**Versioning.** Semantic versioning, with one version number across all platforms. Until 1.0, breaking changes are minor versions and everything else is a patch; the table applies from 1.0.

| Change | Version bump |
| --- | --- |
| Removed or renamed token, component or prop; changed default behavior | Major |
| New token, component, variant or prop | Minor |
| Bug fix, visual fix within the existing design intent, docs | Patch |

**Release process.** Every pull request carries a changeset. Merging to main publishes a release with a generated changelog and publishes every @squilp package to npm. Token renames ship with a codemod or an alias for one major version.

### Contribution

Contributions start on a form on the docs site, which creates a GitHub issue. GitHub is the record: labels, a project board, and links from proposal to pull request to release. The docs site is the front door.

**How a contribution flows**

1. The contributor signs in with GitHub on the docs site, so every submission has a name on it.
2. They fill in the Proposal form. A small serverless function turns it into a GitHub issue with the `proposal` label and adds it to the project board.
3. Once the proposal is accepted, they build it and fill in the Submission form, which links the pull request and confirms every requirement below.
4. CI checks every requirement it can. A reviewer checks the rest and records the decision on the issue.
5. A Contributions page on the docs site reads the GitHub API and shows every proposal and its status publicly.

**Proposal form** asks for: the problem, real use cases, and proof that nothing in the system already does this, plus prior art from other systems.

**Submission requirements.** A submission cannot be merged until all of these are met.

| Requirement | How it is checked |
| --- | --- |
| Tokens for all styles; no raw values | CI lint rule |
| Built from existing components and primitives | Review, plus the MCP `check_usage` tool |
| All states and variants designed in Figma with variables | Review |
| Works in every color and density mode | Visual tests across modes |
| WCAG 2.2 AA; zero axe violations | CI |
| Keyboard map and screen reader test on each platform, with date | Checkbox on the form and the test record |
| Built on web, iOS and Android, or a recorded reason why not | Review |
| Docs page written from the template | CI checks the page exists |
| Visual and unit tests | CI |
| Component metadata file and Code Connect mapping | CI validates against the schema |
| Changeset | CI |

The metadata requirement ties contributions to AI usability: a component cannot merge until agents can see it. A CONTRIBUTING guide and a pull request checklist mirror this table.

## Lock In audit rubric

Phase 0 checks every Lock In part against this rubric before anything moves to Squilp. Each part gets one verdict, a one-line reason, and a decision record when the call is not obvious. Results live in the Audit tab of the inventory sheet. The first pass was approved on 24 Nov 2026: of 56 parts, 13 keep, 35 rework and 8 drop.

**The first check, for every part:** can I explain why it exists, and would I choose it again today? Lock In grew by accepting suggestions without deciding on them. Squilp keeps nothing I cannot defend in an interview, and prefers common, widely used tools over custom ones.

| Verdict | Meaning |
| --- | --- |
| Keep | Meets every check below; moves to Squilp as it is, renamed to Squilp conventions |
| Rework | The idea or structure is sound but fails one or more checks; rebuilt in Squilp using the original as a starting point |
| Drop | Conflicts with a Squilp decision or is not needed; does not move over |

**Checks for tokens and tooling**

1. Fits the three tiers: primitive, semantic, and component only where needed.
2. Names follow `category.property.variant.state` and describe purpose, not appearance.
3. Values match the foundations decisions (orange accent, window size classes, soft radius, 3 elevation levels, functional motion).
4. Works in light, dark and high contrast, and passes the contrast checks.
5. Valid DTCG 2025.10, buildable by Style Dictionary v5 for web, iOS and Android.
6. Documented: every token or script says what it is for.

**Checks for components**

1. Uses only semantic or component tokens; no raw values.
2. Meets WCAG 2.2 AA, with the keyboard, focus and screen reader behavior in the definition of done.
3. Its API follows the cross-platform API conventions.
4. Has a clear place in the inventory: core, product layer, or not needed.
5. Has tests and stories that would carry over.

A part that fails a single check is usually Rework; a part that conflicts with a decision, such as Lock In's league themes under decision 9, is Drop.

## Roadmap

Six phases take Squilp to 1.0, starting with an audit of Lock In, and a phase starts only when the gate before it passes. Tasks for each phase live in the Roadmap tab of the inventory sheet (see Supporting materials). A phase's tasks are finished before the next phase starts, with the exceptions for phase 1 in decision record 0028.

Phases, each closed by a gate:

0. **Audit Lock In.** Gate: audit published; Squilp repo created.
1. **Set up.** Gate: a test token builds to CSS and React Native in CI.
2. **Foundations.** Gate: foundations locked; contrast checks pass in every mode.
3. **Wave 1 and the Bracket.** Gate: one token change restyles Button everywhere (portfolio milestone).
4. **Waves 2 to 4, the product layer and the scorekeeper app.** Gate: all 44 core components and the product layer at Beta.
5. **Launch Squilp 1.0.**

Gate 3 is the one that matters most. If one token change restyles Button on all three platforms, the architecture works and the remaining waves are repetition. It is also the **portfolio milestone**: the audit, the decision records, the pipeline demo and the rebuilt Bracket make a complete case study within weeks, while the rest of the library continues.

**Moving VolleyXP over.** Only VolleyXP's bracket, match card and match detail designs are final; Squilp rebuilds them to match. VolleyXP's other screens were generated without a plan, so they are redesigned on Squilp during phases 4 and 5 rather than migrated as they are, following a written migration guide. It also moves off styled-components, which has been in maintenance mode since 2025, to Squilp components plus Tailwind for page layout. Lock In is retired once nothing imports it.

**Rough timeline.** At about 30 hours a week from 30 Nov 2026, with a week off over the holidays, the portfolio milestone lands in early February and 1.0 around the end of May 2027. These are estimates to check against real progress at each gate.

| Phase | Estimate | Ends around |
| --- | --- | --- |
| 0. Audit Lock In | 1 week | 4 Dec 2026 |
| 1. Set up | 1.5 weeks | 15 Dec 2026 |
| 2. Foundations | 3 weeks (plus holiday week) | 15 Jan 2027 |
| 3. Wave 1 and the Bracket | 3 weeks | 5 Feb 2027 (portfolio milestone) |
| 4. Waves 2 to 4, the product layer and the scorekeeper app | 13 weeks | 7 May 2027 |
| 5. Launch 1.0 | 3 weeks | 28 May 2027 |

React Native (decision 10) shortened phases 3 and 4: two component codebases instead of three.

**After 1.0.** Ideas parked on purpose, to revisit once 1.0 ships:

- A large-screen display mode for brackets and scoreboards on gym TVs.
- A signature animation, such as a score change or a bracket advancing.
- League and team color theming (decision 9).
- Charts, building on Stat tile.
- A full Squilp logo, replacing the v1 wordmark.

## Portfolio case study plan

The case study tells one story: a system that grew without a plan was audited, rebuilt on purpose as Squilp, and a real product moved onto it without breaking. A single token source, governed with care, now produces accessible native components on three platforms. The four goals are its chapters, in priority order. Evidence is captured as the work happens, because it cannot be recreated afterwards.

| Chapter | The claim | Evidence to capture along the way |
| --- | --- | --- |
| 0. Before | I can diagnose a system honestly, including my own | The Lock In audit with keep, rework and drop calls; before screenshots and structure; the decision records for the rebuild |
| 1. Architecture | One source, three platforms, every mode | The token tier diagram; a screen recording of one token edit restyling web, iOS and Android side by side; build output stats |
| 2. Process and governance | Decisions are deliberate and traceable | Three or four decision records, including one I reversed; the lifecycle in use; the changelog; the VolleyXP migration guide |
| 3. Accessibility | Inclusive by default, proven by testing | Contrast checks in CI; screen reader walkthrough videos of Combobox and Bracket; the per-component test record |
| 4. Visual craft | A system with its own character | Before-and-after explorations against Lock In; VolleyXP in light, dark and high contrast; motion details |

**Habits that make the case study easy to write**

- [ ] Keep a short weekly work log in the repo: what changed, what was hard, what I learned.
- [ ] Screenshot or record every "before" state before changing it.
- [ ] Tag a git commit at each gate so the history can be shown.
- [ ] Note any time the system saved effort on a real personal project.

## Risks

The biggest risk is scope: 44 components on three platforms is a lot for one person. The plan contains it with waves and gates rather than by cutting the full-library goal.

| Risk | Effect | Fallback |
| --- | --- | --- |
| Scope outruns available time | 1.0 never ships; no case study | Waves 1 to 3 already make a credible 0.x release and case study; Wave 4 can follow |
| Native at launch plus data components stretch scope further | VolleyXP launch slips behind the system | The product layer keeps volleyball work out of core; core waves stay gated |
| Native platforms lag web | The multi-platform claim weakens | Gate 3 forces all three platforms early; a component reaches Beta only when every target platform is done |
| Component metadata drifts from code | Agents get wrong answers from the MCP server | Metadata generated from code and validated in CI; agent evals on every release |
| Figma sync gaps (composite tokens, non-px units) | Figma drifts from code | Code stays the source of truth; a sync script plus a CI check that flags drift |
| Polishing visuals before the architecture is proven | Effort spent in the wrong order | Visual craft is ranked last on purpose; brand exploration is time-boxed in Foundations |

## Resolved questions

All open questions were settled on 24 Nov 2026. New questions go here as they come up.

- Decided: packages use the @squilp scope on npm (claim the npm organization first), such as `@squilp/tokens`, @squilp/react and @squilp/mcp-server, @squilp/react-native and @squilp/core. Squilp gets a simple wordmark for now, and a full logo after 1.0.
- Decided: about 30 hours a week, which puts the portfolio milestone in early February 2027 and 1.0 around the end of May 2027 (see Roadmap).
- Decided: React for web. It fits VolleyXP and Storybook, and it is what most design systems roles use.
- Decided: Vercel hosts the docs site, the contribution form's function and the hosted MCP endpoint, alongside VolleyXP.
- Decided: the Squilp repo is public from day one, so the commit history, audit and decision records are visible while I job hunt. It uses the MIT license.
- Decided: the support matrix has two tiers with pinned minimums (decision record 0022).
- Decided: Figma runs on a Professional plan, and token sync runs through the Figma MCP with a saved script (decision record 0023).
- Decided: there is no Mac to test on, so VoiceOver runs on an iPhone, with one macOS pass before 1.0 (decision record 0024).
- Decided: until 1.0, breaking changes are minor versions and everything else is a patch (decision record 0025).

## Known gaps

These were considered on 24 Nov 2026 and deliberately left out of v1, to keep the scope achievable. Each can be picked up after 1.0 or sooner if VolleyXP needs it.

| Gap | Why it waits |
| --- | --- |
| Content guidelines (voice, error messages, terminology) | Lower risk than components; patterns docs cover the most common messages |
| Internationalization (translation, right-to-left layouts) | VolleyXP launches in English only; strings stay translatable so a retrofit is cheap |
| Performance budgets (bundle size limits) | Measure first once packages exist, then set limits |
| Adoption metrics (share of VolleyXP built from Squilp) | Easy to add once the migration starts; useful for the case study |
| Versioned docs (docs for older releases) | Only needed once a 2.0 exists |

**Decided in phase 1:** the support matrix (0022), the Figma plan and token sync (0023), checks without a Mac (0024) and versioning before 1.0 (0025).

## Supporting materials

| Material | What it holds |
| --- | --- |
| Design System Architecture (whiteboard, kept outside the repo) | Token tiers, the build to each platform and the docs site, and how components build on each other |
| Design System Inventory and Roadmap (sheet, kept outside the repo) | Components tab: all 44 core components plus the 7 VolleyXP product-layer components, with wave, lifecycle status, platforms, Figma parity, the Lock In part each replaces, variants and accessibility notes. Audit tab: 56 Lock In parts, each with a drafted verdict and reason. Roadmap tab: 63 tasks by phase plus 5 parked for after 1.0, starting with the Lock In audit, with status and hour estimates to fill in |
| [Reference research](reference-research.md) | Six public design systems compared, with the one idea worth borrowing from each |
