# 0009: Squilp is usable by AI agents through an MCP server

Status: Accepted · Date: 2026-11-24

## Context

Agents increasingly write UI code. Without system data they invent values and components.

## Options considered

- Docs only.
- An MCP server backed by machine-readable component metadata.

## Decision

Squilp ships an MCP server serving tokens (with Tailwind class names), component metadata and guidelines. Every component has a metadata file validated in CI. An agent eval set runs on every release.

## Consequences

- A component cannot merge until agents can see it.
- Metadata is generated from code where possible to avoid drift.
