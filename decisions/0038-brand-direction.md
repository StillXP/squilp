# 0038: Brand direction

Status: Accepted · Date: 2026-11-25

## Context

0020 chose an orange brand hue, carried over from Lock In. Lock In's orange turned out to be Tailwind's default orange, value for value, so there was no orange to carry over. The time-boxed brand exploration compared hues on VolleyXP's match cards in light, dark and high contrast.

Contrast is the WCAG ratio. Difference is distance in OKLab, and anything under 0.10 was treated as too close, which is a rule of thumb and not a standard. The status colors were placeholders.

## Options considered

- Bright orange with dark text. Energetic, but its button is 2.7:1 against a light page, and its live score is too close to the green winning score with red-green color blindness.
- Deep orange with white text. 0.08 from the original danger red, and 0.02 with color blindness.
- Green. Competes with success, which marks winners and completed matches.
- Blue. Almost the same as the information color, and the closest to VolleyXP today.
- Purple. Clear of all four status colors, and takes white text at 5.2:1 in light mode.
- Destructive button: outlined, filled, or chosen by what is beside it. A dark rose instead of the original red looked less urgent.
- Live: purple, which also marks links and buttons, or red, which is also the danger color.
- Neutrals: plain, tinted purple, or cool like VolleyXP today.
- Wordmark: Tight, Dotted or Sport.

## Decision

For now:

- **Brand hue:** the purple from the exploration, OKLCH hue 300 and chroma up to 0.22, with the ramp below. Main buttons use 700 with white text in light mode, 400 with dark text in dark mode, and 800 with white text in high contrast.
- **Danger:** the original red, `#cc272e` (OKLCH hue 25).
- **Live:** the same red.
- **Neutrals:** plain, with no tint.
- **Wordmark:** Dotted, lowercase Inter with the dot of the i in the brand color.
- **Destructive buttons:** outlined with an icon beside a main action, and filled where the destructive action is the main one, such as in a confirmation dialog.
- **Confirmed from 0020:** soft radius and three elevation levels. The rest of 0020 stands.

| Step | Purple |
| --- | --- |
| 50 | `#f9f6ff` |
| 100 | `#f0eaff` |
| 200 | `#e2d4ff` |
| 300 | `#d0b7ff` |
| 400 | `#c09aff` |
| 500 | `#b17eff` |
| 600 | `#a25ff9` |
| 700 | `#884bd5` |
| 800 | `#6b37ab` |
| 900 | `#512a82` |
| 950 | `#311b4f` |

## Consequences

- Replaces the orange brand hue in 0020.
- The color task turns this purple ramp into tokens and builds the neutral and status ramps.
- Outlined destructive text needs a lighter red in dark mode to be readable. The filled red button is 2.4:1 against the dark dialog used in the exploration; its label is readable, and the color task should raise it.
- Red and green are hard to tell apart with red-green color blindness, so live and winning must also differ by more than color. How they look is designed with Match card and Bracket, and is not decided here.
- How Button's API offers the two destructive styles is decided with Button.
