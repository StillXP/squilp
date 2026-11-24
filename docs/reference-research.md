# Reference research

Six public design systems each do one thing this plan needs especially well. None should be copied whole; each row names the one idea worth borrowing and where it lands in the plan. Checked 24 Nov 2026.

| System | Platforms | Worth borrowing | Where it lands in the plan |
| --- | --- | --- | --- |
| Adobe Spectrum 2 | Web, iOS, Android, desktop | Layered token data (foundation, platform, product) with a platform manifest that pins foundation values and applies typed overrides; a token dependency visualizer | Token architecture: the platform layer; the docs site could show the same dependency graph |
| Material 3 Expressive | Android (Compose), web, Flutter | Color roles generated from five key colors, each with a 13-tone palette; a theme builder that exports platform code | Foundations: color ramps and semantic roles |
| Shopify Polaris | Web (web components, any framework) | One HTML-like API across every surface; moved from React to web components, stable since Oct 2025 | Open question on React vs web components (since settled: React, decision record 0021) |
| IBM Carbon | Web (React, web components) | A public accessibility test status per component, plus a component checklist that allows only tokenized color and type | Accessibility: the per-component test record; Governance: the pull request checklist |
| GOV.UK Design System | Web | Written contribution criteria reviewed by a working group; a per-component WCAG 2.2 change log | Governance: proposal stage of the lifecycle; Accessibility docs section |
| Atlassian Design System | Web | Tokens rolled out together with dark mode, plus a Figma plugin that applies tokens and migrates old colors; the system run as a product with its own roadmap | Figma tooling; token rename codemods; the portfolio framing |

## What this means for the plan

- Spectrum's platform manifest is the closest match to this plan's multi-platform aim. Read its spec before locking the token architecture.
- Polaris going framework-agnostic is a real data point for the web framework question, since the system should serve any personal project.
- Carbon and GOV.UK show that a public accessibility record is itself evidence. Publishing the test record per component strengthens the accessibility chapter of the case study.

## Sources

- [Design Tokens specification reaches first stable version](https://w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/), W3C DTCG, 28 Oct 2025
- [Figma: import design tokens as variables](https://help.figma.com/hc/en-us/articles/15343816063383-Modes-for-variables)
- Polaris: unified and for the web, Shopify, 21 May 2025
