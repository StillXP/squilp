# 0035: Token naming checks

Status: Accepted · Date: 2026-11-25

## Context

The plan sets token naming rules, but nothing checked them. Token categories are settled in phase 2.

## Options considered

- Check the rules the plan already sets: lowercase paths, known categories, and no color words in semantic names.
- Check only the path format now, and the rest in phase 2.

## Decision

The token build stops on:

- a path with anything but lowercase letters, numbers and single hyphens in each part
- a semantic token whose first word is not a known category
- a color word, such as `blue`, in a semantic name

Primitives may use color words, such as `color.blue.600`. A token with a raw value is a primitive, and one that points at another token is not, which follows the plan's tiers.

## Consequences

- The known categories are the plan's own examples of semantic tokens: `color`, `space` and `text`. Phase 2 adds each new one in `packages/tokens/names.js`.
- Component tokens, such as `button.primary.background.hover`, start with a component's name. They are rejected until the first one is needed and the check learns the component names.
- A primitive that points at another primitive is checked as semantic, so its name cannot have a color word.
- The check knows common color words, not every one. Review still covers the rest.
- Checks for unused tokens and for components that use primitives wait for tokens and components to exist.
