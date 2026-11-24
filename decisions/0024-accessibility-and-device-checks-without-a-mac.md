# 0024: Accessibility and device checks without a Mac

Status: Accepted · Date: 2026-11-24

## Context

The plan's checks assumed a Mac, for macOS VoiceOver, Accessibility Inspector and the iOS simulator. The owner has a Windows PC, an iPhone on iOS 27 and an Android phone, and no Apple Developer account yet.

## Options considered

- VoiceOver with macOS Safari: iPhone VoiceOver instead, a rented remote Mac, or a borrowed Mac.
- Accessibility Inspector: drop it, or run Apple's audit on a cloud Mac.
- iOS screenshots: take them on the iPhone, or run simulators on GitHub's macOS runners.
- Lowest supported iOS and Safari: rent devices, or raise the minimums to what can be tested.

## Decision

- **VoiceOver on the web:** every component is tested with VoiceOver and Safari on the iPhone. Keyboard-heavy components, such as Combobox, also get one pass with macOS VoiceOver before 1.0, on a borrowed or rented Mac.
- **Accessibility Inspector:** dropped. iOS relies on React Native Testing Library queries and VoiceOver on the iPhone.
- **iOS screenshots:** taken on the iPhone for now. GitHub's macOS runners are the next step when there are too many to take by hand.
- **iOS 18 and Safari 17.5:** tested on rented devices before each minor version, before each major version from 1.0, and before a component reaches Beta. Patches do not need it, because every merge to main can publish one.

## Consequences

- The iPhone covers the latest iOS in the support matrix (0022).
- Each test record says that macOS VoiceOver was not tested, until the pass before 1.0 covers it.
- Changes one detail of 0018: iOS screenshots in the docs come from the iPhone, not a simulator. The rest of 0018 stands.
- Testing the web on the iPhone needs no account. Development builds on it need a paid Apple Developer account, so one must be bought before the scorekeeper app needs a build that Expo Go cannot run.
