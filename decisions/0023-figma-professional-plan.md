# 0023: Figma runs on a Professional plan

Status: Accepted · Date: 2026-11-24

## Context

The plan left token sync open until the Figma plan was known. Figma limits the Variables REST API, both reading and writing, to Enterprise, so a Professional plan cannot sync variables from CI.

## Options considered

- Automated sync through the Variables REST API. Needs Enterprise.
- Sync through a plugin at release time. Works on Professional, but the plugin has to be built and maintained.
- Sync through the Figma MCP with a script saved in the repo. Works on Professional with no plugin to build; free in beta, later usage-based.

## Decision

Squilp uses Figma Professional. Token sync runs through the Figma MCP at release time, with one script saved in the repo. Agents run that script unchanged and never write variables freehand.

Code Connect maps React, because VolleyXP is the first product. Mapping React Native instead would serve only the scorekeeper app, and switching between them leaves the inactive framework out of the Figma MCP.

## Consequences

- The drift check cannot read variables from Figma through the API. It compares the tokens with a variables export saved to the repo.
- Code Connect works, but Professional allows one active library and one active framework, so React and React Native cannot both be mapped at once.
- Library analytics need an Organization plan, so usage drift is caught in code only.
- React Native has no Code Connect mapping. The shared API means most of a React snippet carries over.
- Sync needs an agent and a browser sign-in, so it is not a CI job.
- The MCP returns at most 48 KB per call, so exports may need splitting.
- The script is tested on a draft file first. If the MCP becomes expensive, the same script can be wrapped in a plugin.
