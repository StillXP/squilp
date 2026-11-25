# 0036: Versions and release pull requests

Status: Accepted · Date: 2026-11-25

## Context

0021 chose Changesets and npm. The plan said merging to `main` publishes a release, but a release has to commit new version numbers, and `main` only accepts pull requests. How apps load the token variables was also open (0030).

## Options considered

- First publish: after the tokens are real, or now. npm versions are permanent, and the packages are shells with one test token.
- Starting a release: a release pull request opened by GitHub Actions, or by a GitHub App, which needs a stored key.
- Tool: Changesets, or pnpm's own versioning, which adds no tool but would replace part of 0021.
- Loading tokens: an app imports `tokens.css` itself, or the Tailwind theme imports it, which leaves out apps without Tailwind.

## Decision

- **First publish:** in phase 2. The packages stay private until then.
- **Release:** a change to a published package carries a changeset, and CI fails without one. GitHub Actions collects them in a release pull request, and merging it starts the release.
- **Tool:** `@changesets/cli` 3.0.3 and `changesets/action` 2.1.2, with the built-in changelog. The five packages always share one version.
- **Loading tokens:** `@squilp/tokens/tokens.css`, before the Tailwind theme, and `@squilp/tokens/react-native`.

## Consequences

- Publishing from CI is not set up. It is decided next: Changesets does not support npm's staged publishing.
- While packages are private, Changesets ignores them, so no changeset is needed yet.
- The release pull request's checks wait for a click, because GitHub's own bot opens it.
- The action is pinned to a commit, because it can write to the repo.
- A change that needs no release uses an empty changeset.
- Each package has its own changelog. The docs site joins them into one.
- `tokens.css` and the React Native tokens hold only the test token, and the React Native tokens have no types yet. Both come with phase 2.
