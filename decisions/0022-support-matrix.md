# 0022: Support matrix: two tiers with pinned minimums

Status: Accepted · Date: 2026-11-24

## Context

Squilp needed minimum iOS, Android and browser versions before any component is built. The chosen tools already set floors: Expo SDK 58 (iOS 16.4, Android 7), Tailwind v4 (Chrome 111, Safari 16.4, Firefox 128) and, for VolleyXP, Next.js (Chrome, Edge and Firefox 111, Safari 16.4). One person tests everything, so each supported version has a cost.

## Options considered

- Tool floors: support everything the tools support. Widest reach (about 92% of web usage), most old versions to test.
- Two tiers: a narrower range that is tested, with older versions left working where the tools allow.
- Latest only: last two browser versions, iOS 26 and Android 13. Least testing, drops many phones.

## Decision

Two tiers.

| Platform | Supported | Best effort |
| --- | --- | --- |
| Chrome and Edge | 125 | None |
| Safari (macOS and iOS) | 17.5 | None |
| Firefox | 128 | None |
| Samsung Internet | None | 27 |
| iOS app | 18 | 16.4 |
| Android app | 10 (API 29) | 7 (API 24) |
| React | 19 | None |
| Node | 22 (22.13 or newer for Expo SDK 57 and 58) | None |
| Expo | The two latest SDKs, currently 57 and 58 (React Native 0.86 and 0.88) | None |

Each number is the minimum for its tier. Supported means tested, with bugs fixed. Best effort means it runs but fixes are not promised. Anything lower is unsupported.

- The browser minimums are Baseline Widely available on 2026-11-24, with Firefox raised from 126 to 128 for Tailwind. The Browserslist query is `baseline widely available on 2026-11-24, not firefox < 128`.
- iOS 18 covers the three latest major versions (18, 26, 27). Android 10 is the first version with a system-wide dark theme, which the color modes follow.
- The numbers are pinned and reviewed once a year, after the fall iOS release. The Expo row is the exception: it moves with each SDK release.
- Samsung Internet is best effort because it is built on Chromium. 27 is the version Baseline matches to the pinned date.
- After 1.0, raising a minimum is a major version, except that dropping an old Expo SDK is a minor version.
- Automated and manual checks run on the lowest supported and latest versions, not every version between.
- Screen reader pairs: NVDA with Chrome, VoiceOver with Safari, TalkBack with Chrome on the web; VoiceOver and TalkBack in the apps.

## Consequences

- Reach at the time of the decision is an estimate: about 88% of global web usage, 93% of iOS Safari usage and 94% of Android devices (caniuse, and Google Play data). VolleyXP's own analytics replace these once they exist.
- Components may use any web feature that is Baseline Widely available on the pinned date. Newer features need a fallback.
- The React Native package must not raise the install floor above iOS 16.4 and Android 7 without a new decision.
- There is no Mac to test on, only an iPhone and an Android phone, so checks that need macOS, the iOS simulator or several iOS versions follow 0024.
