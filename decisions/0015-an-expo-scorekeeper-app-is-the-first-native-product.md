# 0015: An Expo scorekeeper app is the first native product

Status: Accepted · Date: 2026-11-24

## Context

VolleyXP is a web app, so @squilp/react-native had no real consumer.

## Options considered

- A scorekeeper app.
- An example app only.
- Postpone React Native to after 1.0.

## Decision

A small Expo scorekeeper app (enter scores offline, sync when back online) is built only from Squilp.

## Consequences

- Proves the live and network states pattern.
- About two weeks added before 1.0; the first thing to cut if time runs short.
