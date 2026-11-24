# 0021: Tooling and project setup

Status: Accepted · Date: 2026-11-24

## Context

Several setup choices were open: web framework, repo tooling, publishing, hosting and visibility.

## Decision

React for web. pnpm workspaces with Turborepo. Changesets, with every package published to npm under @squilp. Vercel hosts the docs site, the contribution form function and the hosted MCP endpoint. The repo is public from day one under the MIT license. Packages: tokens, core, react, react-native, mcp-server.

## Consequences

- To decide in phase 1: the support matrix, the Figma plan, and 0.x versioning until 1.0.
