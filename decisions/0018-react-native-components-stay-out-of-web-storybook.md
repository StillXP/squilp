# 0018: React Native components stay out of web Storybook

Status: Accepted · Date: 2026-11-24

## Context

react-native-web would put native components in the docs and in Chromatic, at the cost of setup and snapshots.

## Options considered

- react-native-web in Storybook.
- On-device Storybook and React Native Testing Library.

## Decision

React Native components use on-device Storybook and React Native Testing Library. The docs show simulator screenshots. Chromatic stays web-only.
