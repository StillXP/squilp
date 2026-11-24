# 0010: The MCP server is read-only

Status: Accepted · Date: 2026-11-24

## Context

Lock In's hub server had API keys, three roles, a SQLite database and tools that edit tokens.

## Options considered

- Keep editing through the server.
- Read-only server; changes go through pull requests.

## Decision

The Squilp MCP server is read-only: no keys, roles, database or editing tools. Every change goes through a pull request.

## Consequences

- Much less code to maintain and explain.
- Hosted read-only on Vercel and runnable locally from npm.
