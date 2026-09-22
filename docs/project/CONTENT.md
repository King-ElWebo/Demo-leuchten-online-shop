# Content source of truth

Specification status: TEMPLATE_NOT_CONFIGURED

This file owns the actual approved copy, products, projects, structured content data, contact details, and media assignments. Implementation modules such as `products.ts` or `projects.ts` may be derived from this document, but do not maintain conflicting manual sources of truth. Scope and behavior belong in [`SITE.md`](SITE.md), visual use and motion direction in [`DESIGN.md`](DESIGN.md), and completion checks in [`ACCEPTANCE.md`](ACCEPTANCE.md).

Do not use Lorem Ipsum. Do not replace supplied copy with generic AI marketing language.

## Brand content

- **Brand name:** [REQUIRED: replace before production run]
- **Tagline:** [REQUIRED: replace before production run]
- **Short descriptor:** [REQUIRED: replace before production run]
- **Voice constraints:** [REQUIRED: replace before production run]
- **Required capitalization, punctuation, and naming:** [REQUIRED: replace before production run]

## Navigation labels

| Label                                     | Destination/action                        | Mobile label if different                 | Rewrite allowed? |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ---------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | Yes/No           |

## Page-by-page copy

Repeat this section for every route in [`SITE.md`](SITE.md).

### Route: [REQUIRED: replace before production run]

- **Metadata title:** [REQUIRED: replace before production run]
- **Metadata description:** [REQUIRED: replace before production run]
- **Primary headline:** [REQUIRED: replace before production run]
- **Supporting copy:** [REQUIRED: replace before production run]
- **Primary CTA label and destination:** [REQUIRED: replace before production run]
- **Secondary CTA label and destination:** [REQUIRED: replace before production run]

| Section/content ID                        | Eyebrow                                   | Headline                                  | Body copy                                 | CTA                                       | Rewrite rule                      |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | --------------------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | Exact/shortenable/rewrite allowed |

## Products, projects, cases, or other entities

Choose the relevant entity name and define every field required by the site. Remove irrelevant fields instead of creating empty universal models.

| ID                                        | Name/title                                | Summary                                   | Detail copy                               | Price/metadata                            | Route/action                              | Order                                     |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] |

## About content

- **Short about:** [REQUIRED: replace before production run]
- **Long about or story:** [REQUIRED: replace before production run]
- **People, credentials, or dates:** [REQUIRED: replace before production run]
- **Facts that require verification:** [REQUIRED: replace before production run]

## Contact information

- **Public email:** [REQUIRED: replace before production run]
- **Telephone:** [REQUIRED: replace before production run]
- **Address/location:** [REQUIRED: replace before production run]
- **Opening/response hours:** [REQUIRED: replace before production run]
- **Social labels and URLs:** [REQUIRED: replace before production run]
- **Contact CTA behavior:** [REQUIRED: replace before production run]

## Footer content

- **Footer statement:** [REQUIRED: replace before production run]
- **Navigation groups:** [REQUIRED: replace before production run]
- **Copyright/attribution:** [REQUIRED: replace before production run]
- **Newsletter or contact prompt, if specified:** [REQUIRED: replace before production run]

## Legal and demo notices

- **Fictional/demo disclosure:** [REQUIRED: replace before production run]
- **Privacy, terms, cookie, or accessibility links:** [REQUIRED: replace before production run]
- **Rights and attribution language:** [REQUIRED: replace before production run]

Never add non-functional legal links merely to fill a footer. Use an accurate demo notice when real legal documents do not exist.

## Image and media assignments

Production assets should be stable local files under `public/media/` unless the project explicitly approves another source.

| ID                                        | File path                                 | Intended use                              | Aspect ratio                              | Focal point                               | Alt text                                  | Source                                    | License/rights                            | Mobile crop/alternate                     |
| ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] | [REQUIRED: replace before production run] |

### Alt-text requirements

- Describe the information or purpose the image contributes in context.
- Use empty alt text only for genuinely decorative images.
- Do not repeat adjacent captions or begin with “image of”.
- Identify people, products, works, and meaningful setting details accurately.
- Record any complex-image long description requirement here: [REQUIRED: replace before production run]

## Responsive content behavior

- **Mobile-specific content changes:** [REQUIRED: replace before production run]
- **Content that may be shortened and approved short form:** [REQUIRED: replace before production run]
- **Content that changes order:** [REQUIRED: replace before production run]
- **Media that changes by viewport:** [REQUIRED: replace before production run]

## Content that must never be rewritten

- [REQUIRED: replace before production run]

Include legal language, names, quoted statements, facts, prices, technical specifications, and brand phrases requiring exact preservation.

## Content readiness checklist

- [ ] Every visible text location has approved copy or an explicit derivation rule.
- [ ] Every CTA has a label and real destination or action.
- [ ] Entity values, prices, dates, and metadata are complete and internally consistent.
- [ ] Every media assignment has rights information and an alt-text decision.
- [ ] Responsive shortening never changes meaning.
- [ ] No conflicting manually maintained content source exists.
- [ ] Status is `READY`.
