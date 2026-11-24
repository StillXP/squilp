# 0011: Contributions come in through a docs-site form that creates GitHub issues

Status: Accepted · Date: 2026-11-24

## Context

Lock In used a JSON file plus a GitHub issue per proposal.

## Options considered

- GitHub issue forms only.
- Form on the docs site that creates a GitHub issue.
- Form storing submissions in the docs site's database.

## Decision

Proposal and Submission forms on the docs site create GitHub issues through a serverless function, with GitHub sign-in. GitHub is the record; a public Contributions page reads its API. Submissions must meet the requirements table in the plan.

## Consequences

- The per-proposal JSON file is dropped.
- Lock In's Figma parity criteria carry over.
