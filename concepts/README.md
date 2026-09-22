# Concept Sprint workspace

This folder is optional. Use it for limited design-direction experiments when the creative thesis is not yet locked.

A direction should contain only enough to compare:

- hero
- navigation
- one representative content section
- one product/project treatment
- rough motion concept

Concept prototypes must not silently become production dependencies. After selection, transfer durable decisions into [`DESIGN.md`](../docs/project/DESIGN.md), rebuild production code under the normal architecture, and archive or remove rejected directions when they no longer help.

## Stitch handoff record

When Stitch is used, create a concise Markdown note here that records:

- **Stitch project ID or link:** project identifier or accessible link
- **Screen IDs or links:** every screen considered for the selected or rejected directions
- **Prompts used:** enough detail to reproduce the intended visual request without secrets
- **Selected direction:** the chosen or synthesized direction and why it best fits the project specifications
- **Rejected alternatives and reasons:** meaningful differences and the evidence behind rejection
- **Layout and typography decisions:** composition, grid, hierarchy, type roles, rhythm, and image behavior
- **Asset assumptions:** required assets, rights constraints, placeholders, crops, and local-production implications
- **Implementation deviations:** deliberate changes made to satisfy the real stack, semantics, accessibility, performance, or content
- **Responsive interpretation:** how the concept transforms across the required viewports
- **Motion opportunities:** useful interaction states or choreography to evaluate during the dedicated motion pass

Do not store credentials, tokens, authentication details, or temporary secrets. Stitch-generated frontend code may inform visual intent, but production code must be implemented in the repository's actual Next.js/React architecture and must satisfy all engineering and acceptance contracts.
