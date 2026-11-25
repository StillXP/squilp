# 0031: Component API conventions

Status: Accepted · Date: 2026-11-25

## Context

The plan had a short table for the API that React and React Native share. It did not say how names with several words are written, how `disabled` works in Figma, what `label` means for a control with visible text, how inputs report changes, or whether apps can restyle components.

## Options considered

- Names: "Text field" in docs and Figma with `TextField` in code, or `TextField` everywhere.
- `disabled` in Figma: a variant property that matches the prop, or Lock In's `state=disabled`, which breaks the rule that names match.
- `label`: it names every control, or a separate prop for screen readers.
- Changes: `onValueChange(value)` and `onCheckedChange(checked)`, or `onChange(value)`, which looks like React's event handler.
- `className` and `style`: not accepted, or accepted so apps can override anything.
- Location: `docs/api-conventions.md`, or the plan.

## Decision

- **Names:** the readable name in docs and Figma. Code joins the same words, each capitalized.
- **`disabled` in Figma:** `disabled=true/false`, with `true` drawn only for `state=default`.
- **`label`:** always names the control. Inputs show it, and a control with no visible text uses it for screen readers only. Button's visible text is its children.
- **Changes:** `value` with `onValueChange(value)`, and `checked` with `onCheckedChange(checked)`.
- **Styling:** components have no `className` or `style` prop. Space comes from Stack, Grid or a wrapper.
- **Location:** `docs/api-conventions.md`. The plan links to it.

## Consequences

- The Figma property check can match component and prop names by rule, with no list of exceptions except `state`.
- Apps cannot use Tailwind to change how a component looks. Adding a styling prop later is not a breaking change; removing one would be.
- Stack and Grid have to cover real layouts early, or apps will need many wrappers.
- Whether inputs can also manage their own value, with a starting value, is decided with the first input in wave 2.
