# 0008: Build native components in React Native

Status: Accepted · Date: 2026-11-24

## Context

SwiftUI plus Compose plus React means three component codebases for one person.

## Options considered

- SwiftUI and Jetpack Compose: most native, three codebases.
- React Native: one codebase for both phones, shares React's API and JavaScript tooling.

## Decision

Native components are built in React Native as @squilp/react-native. Lock In's React Native package is the starting point.

## Consequences

- Two component codebases instead of three; about six weeks off the timeline.
- React and React Native share one API (see the cross-platform API conventions).
- Style Dictionary builds a React Native theme instead of Swift and Kotlin.
