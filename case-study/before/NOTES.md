# Before: Lock In and VolleyXP, 24 Nov 2026

The starting point for Squilp. Captured during phase 0, before any rebuild work.

## What stays: designs that are final

Only these VolleyXP designs are set. Squilp rebuilds them to match; everything else in VolleyXP was generated without a plan and will be redesigned on Squilp.

| Screenshot | What it shows |
| --- | --- |
| volleyxp-bracket-desktop.png | The bracket: round columns, connectors, seeds, set scores, winner highlight, status and court/time under each match |
| volleyxp-match-detail-desktop.png | Match detail: teams, where the winner advances, where the loser places, share and video actions |
| volleyxp-match-detail-phone.png | The same match detail as a sheet on a phone |

## Problems to fix

| Screenshot | Problem | Where Squilp fixes it |
| --- | --- | --- |
| volleyxp-bracket-phone.png | On a phone the bracket keeps its desktop columns: later rounds are cut off at the right edge, and labels like "W12" are clipped | Bracket rebuild: round-by-round phone view (phase 3) |
| volleyxp-bracket-desktop.png | No keyboard path between matches or rounds | Bracket rebuild: arrow-key navigation |
| lockin-storybook-intro.png | Theme switcher for Default, Arena and Arcade; accessibility panel checks WCAG 2.1, not 2.2 | Decision 0007 (no themes); WCAG 2.2 AA baseline |
| lockin-storybook-button-props.png | Web Button takes onClick and aria-label | API conventions: onPress and label on both platforms |
| lockin-storybook-button-spec.png | The React Native example uses accessibilityLabel and onPress while web uses aria-label and onClick: two APIs for one component | Decision 0008 and the shared API |
| lockin-hub-overview.png | Hub server with sign-in roles, API keys, 3 themes and 14 unreleased changes: much more than a design system needs to run | Decision 0010: read-only MCP server |
| lockin-hub-tokens.png | Brand row duplicates blue; light and dark live inside one value | Decisions 0007 and 0012: one token set per mode |
| figma-lockin-cover.png, lockin-hub-overview.png, lockin-storybook-button-spec.png | The same system reports different facts on each surface: Figma says v0.3.1, 14 components, 250 variables; the hub says v0.1.0, 15 components, 290 tokens; Storybook says v0.4.0 | One version across packages and the Figma library (0021); the drift checks in the plan |
| figma-lockin-button-page.png | Figma imports @lockin/react while the code publishes @stillxp/react; 4 props differ, 5 are code-only, 2 are Figma-only | The API drift check; Figma property names match code props |

## What was already good

| Screenshot | Strength carried into Squilp |
| --- | --- |
| lockin-storybook-button-spec.png | Spec-driven docs: variants, states, do and don't, related components, from one JSON spec the MCP server also serves |
| lockin-storybook-datatable.png | DataTable already has sorting, row selection, density, sticky headers and a stacked phone layout, with a required caption for screen readers |
| lockin-hub-tokens.png | Every semantic token documented with its light and dark source |
| figma-lockin-button-page.png | A "Where Figma and code differ" table on every component page, with the full variant matrix and a prototype; keep this practice |

VolleyXP's remaining screens are not captured: they will be redesigned, not migrated.
