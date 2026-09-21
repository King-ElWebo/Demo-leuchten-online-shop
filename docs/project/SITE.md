# Site specification

Specification status: TEMPLATE_NOT_CONFIGURED

This file owns the current showcase’s purpose, scope, routes, user journeys, and functional behavior. Describe each section’s purpose and content before deciding its layout. Creative decisions belong in [`DESIGN.md`](DESIGN.md), approved wording in [`CONTENT.md`](CONTENT.md), and completion checks in [`ACCEPTANCE.md`](ACCEPTANCE.md).

Change the status to `READY` only when every required field is resolved and no required marker remains.

## Project identity and purpose

- **Project name:** [REQUIRED: replace before production run]
- **Industry:** [REQUIRED: replace before production run]
- **Project type:** [REQUIRED: replace before production run]
- **Portfolio purpose:** [REQUIRED: replace before production run]
- **Target audience:** [REQUIRED: replace before production run]
- **Desired user impression:** [REQUIRED: replace before production run]
- **Brand premise:** [REQUIRED: replace before production run]

## Sitemap and routes

List every public route. Route paths are the source for `tests/e2e/routes.ts`.

| Route                                     | Page purpose                              | Primary audience need                     | Direct-load requirement |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | Yes                     |

## Navigation

- **Primary navigation model:** [REQUIRED: replace before production run]
- **Global navigation labels and destinations:** [REQUIRED: replace before production run]
- **Mobile navigation behavior:** [REQUIRED: replace before production run]
- **Footer or secondary navigation:** [REQUIRED: replace before production run]
- **Active, external, download, and back-link behavior:** [REQUIRED: replace before production run]

## Route sections

Repeat this block for every route. State why the section exists and what it communicates before suggesting composition.

### Route: [REQUIRED: replace before production run]

**Page purpose:** [REQUIRED: replace before production run]

| Section                                   | Purpose                                   | Required content/data                     | Required action or interaction            | Priority          |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | Primary/secondary |

## Primary user journeys

For each journey, name the entry point, ordered steps, successful outcome, and any mobile difference.

1. **Journey:** [REQUIRED: replace before production run]
   - Entry: [REQUIRED: replace before production run]
   - Steps: [REQUIRED: replace before production run]
   - Success: [REQUIRED: replace before production run]
   - Mobile difference: [REQUIRED: replace before production run]

## Features and interactions

| Feature or interaction                    | User purpose                              | Trigger                                   | Expected result                           | Keyboard/touch behavior                   | Failure or fallback                       |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] |

## Content and data entities

Name only entities the showcase actually needs. Keep the default flow simple: typed local data → page/server component → section → presentational component.

| Entity                                    | Fields                                    | Ordering/filtering rules                  | Owning content section     |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | -------------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [`CONTENT.md`](CONTENT.md) |

## Responsive behavior expectations

- **Desktop information hierarchy:** [REQUIRED: replace before production run]
- **Tablet transformation:** [REQUIRED: replace before production run]
- **Mobile task and content priority:** [REQUIRED: replace before production run]
- **Elements that recompose rather than stack:** [REQUIRED: replace before production run]
- **Wide-screen maximum behavior:** [REQUIRED: replace before production run]
- **Touch alternatives to hover:** [REQUIRED: replace before production run]

Detailed visual transformations belong in [`DESIGN.md`](DESIGN.md). Objective viewport checks belong in [`ACCEPTANCE.md`](ACCEPTANCE.md).

## SEO and metadata

- **Default title and title pattern:** [REQUIRED: replace before production run]
- **Default description:** [REQUIRED: replace before production run]
- **Per-route metadata:** [REQUIRED: replace before production run]
- **Canonical/base URL:** [REQUIRED: replace before production run]
- **Open Graph image assignment:** [REQUIRED: replace before production run]
- **Indexing rule for the final environment:** [REQUIRED: replace before production run]
- **Structured data, sitemap, or robots requirements:** [REQUIRED: replace before production run]

## Functional requirements

- [REQUIRED: replace before production run]
- Every listed route must load directly and through navigation.
- Every visible control must perform its documented action.
- Local media must resolve without runtime network dependencies unless explicitly approved.

## Explicit non-goals

- [REQUIRED: replace before production run]
- Backend features not required by the showcase
- Features added only to imitate a reference

## Allowed simplifications

Document conscious reductions that preserve the intended experience.

- [REQUIRED: replace before production run]

## Completion risks

| Risk                                      | Impact                                    | Mitigation or required input              | Owner               |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | User/agent/external |

## Open decisions

Critical open decisions block `READY`. Minor implementation choices may be resolved from the specification hierarchy.

- [REQUIRED: replace before production run]

## Readiness checklist

- [ ] All required markers above have been replaced.
- [ ] Every route and section has a stated purpose and content requirement.
- [ ] Navigation, journeys, interactions, entities, and responsive expectations agree.
- [ ] SEO and functional requirements are testable.
- [ ] Non-goals and allowed simplifications constrain scope.
- [ ] Status is `READY`.

Implementation must follow the stable architecture in [`ENGINEERING.md`](../system/ENGINEERING.md).
