# Working on Squilp: instructions for AI agents

Read this before making any change. It applies to any coding agent.

## The most important rule: propose, don't decide

Lock In, the system Squilp replaces, became messy because tools and patterns were chosen by whoever suggested them first. Squilp avoids that.

- **Never choose a technology, library, dependency, pattern or folder structure on your own.** If a task needs a choice that no decision record covers, stop. Present two or three options with their tradeoffs and a recommendation, then wait for the owner's decision.
- **Never add a dependency without approval.** Name the package, why it is needed, and the alternatives.
- **When the owner decides something new, write a decision record** in `decisions/`, using the next number and the existing format (Context, Options considered, Decision, Consequences). Superseded records stay, marked "Superseded by NNNN".
- **Stay inside the current roadmap phase.** If you notice useful work outside it, list it at the end of your reply instead of doing it.

## Sources of truth

1. `decisions/`: what has been decided and why. These win over everything else.
2. `docs/plan.md`: the full plan, including foundations, the accessibility definition of done, the contribution requirements and the roadmap.
3. `case-study/before/`: what Lock In and VolleyXP looked like before. Do not copy from Lock In unless the audit marked that part Keep or Rework.

## Rules for code

- **Tokens only.** No raw colors, sizes or durations in components. Components use semantic tokens, never primitives.
- **One API for React and React Native.** Same component names, props and values; Squilp props such as `onPress` and `label` hide platform differences. Follow `docs/api-conventions.md`.
- **Accessibility is part of done:** WCAG 2.2 AA, keyboard and focus behavior, screen reader labels, and the checks listed in the plan.
- **Styling:** CSS Modules with CSS variables on web, `StyleSheet` with the Squilp theme on React Native. Apps use Tailwind with Squilp's theme only: no default palette, no bracket values.
- **Every component** has a metadata file, stories, tests and a docs page before it reaches Beta.
- **Commits** use the Conventional Commits format (`feat:`, `fix:`, `docs:` and so on). Changes to published packages carry a changeset.

## Ask before

- Deleting or renaming files you did not create in this session.
- Changing anything in `decisions/` other than adding a new record or marking one superseded.
- Changing the token names or the component API conventions.

## Current phase

Phase 1: set up. See the roadmap in `docs/plan.md`. Decisions made in this phase start at 0022.
