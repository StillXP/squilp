# API conventions

React and React Native components share one API: the same component names, the same props and the same values. Where the platforms differ, such as events and accessibility props, a Squilp prop hides the difference, so product code reads the same on web and mobile. The reasons are in decision record 0031.

## Names

Docs and Figma use the component's readable name. Code uses the same words with each one capitalized and no spaces.

| Docs and Figma | Code |
| --- | --- |
| Button | `Button` |
| Text field | `TextField` |
| Top app bar | `TopAppBar` |

Props are written the same way everywhere, in Figma too: `variant=primary` in Figma is `variant="primary"` in code.

## Shared props

| Concept | Squilp | React (web) | React Native |
| --- | --- | --- | --- |
| Visual style | `variant="primary"` | The same | The same |
| Size | `size="md"` | The same | The same |
| Disabled | `disabled` | The same | The same |
| Action | `onPress` | Maps to `onClick` | `onPress` |
| Name of the control | `label` | Visible text, or `aria-label` | Visible text, or `accessibilityLabel` |
| Text or choice | `value` | The same | The same |
| Change to it | `onValueChange(value)` | Maps to the change event | Maps to the change event |
| On or off | `checked` | The same | The same |
| Change to it | `onCheckedChange(checked)` | Maps to the change event | Maps to the change event |

### label

`label` always names the control. Inputs show it. A control with no visible text, such as Icon button, uses it for screen readers only. Button's visible text is its children, and that text is its name.

### Values

Change handlers receive the new value, not an event.

### disabled

In Figma, `disabled` is a `true` or `false` variant property, the same name as the prop. `disabled=true` is drawn only for `state=default`. `state` itself exists only in Figma (0029).

## Styling

Components have no `className` or `style` prop. Space between components comes from Stack, Grid or an element the app wraps around them. A look a component cannot produce is a proposal for a new variant. Layout props are decided again with Bracket (0034).

## Rules

- Prop names and values match on both platforms. A prop that only makes sense on one is marked platform-only in the metadata.
- Squilp's own props (`onPress`, `label`) hide platform differences instead of exposing `onClick` or `accessibilityLabel`.
- The component metadata file, in `packages/core/metadata/components/`, records the API once, with any platform-only props flagged, so the docs site and the MCP server show it correctly.
- A new component needs its row below before work starts.

## Components

| Component | Code | Its own props and values | Platform-only |
| --- | --- | --- | --- |

No component has started yet.
