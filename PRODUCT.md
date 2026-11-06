# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated in the request and then specified: React, TypeScript, Vite, Tailwind CSS, React Router, Lucide React, React Context with LocalStorage. Frontend demo only. GitHub Pages-style `base` defaults to `/` and can be set with an env variable. Inferred label: the stack was named in the brief, not chosen in an interview. No question tool was available in this session, so unanswered preference questions were not asked.

## Users

Homeowners planning a renovation who want design ideas, sustainable material options, a cost estimate, and a practical DIY sequence. Secondary audience: people reviewing the prototype in an investor, competition, or funding setting. Inferred from the brief's stated use (investor presentations, startup competitions, funding applications) and the seven-screen journey.

## Product Purpose

Habitatly is an interactive prototype of an AI-powered sustainable home renovation platform. A visitor uploads or chooses a room photo, sets room type, budget, styles, and goals, then walks through simulated analysis, design concepts, a materials estimator, a DIY checklist, and an illustrative environmental impact view. Success means the full journey works in the browser with persisted demo state and a commercial-product level of finish.

## Positioning

The mechanism is a single project thread that carries one room photo and the visitor's choices from discovery through an illustrative impact summary, combining interior concepts, sustainable material swaps, a live estimate, and a renovation checklist. It does not claim a live model, a saved cloud project, or verified savings.

## Operating Context

Used in a browser, including phone widths, as a self-contained demo. State lives in LocalStorage. A visible Reset demo control clears that state. No account, payment, or network AI call is part of the product.

## Capabilities and Constraints

- Seven routes: Home, Start Your Project, Smart Space Analysis, Design Studio, Materials & Budget, DIY Guide, Green Living.
- Simulated analysis animation only. No backend, database, authentication, payments, or real AI APIs.
- Prices are estimates. Platform statistics and impact figures are illustrative and must be labeled as such.
- Deep links must not crash; missing project data uses a prompt or a sensible default.
- Uploaded or sample images persist as data URLs.
- Do not invent awards, testimonials, team biographies, or backend claims.

## Brand Commitments

- Name: Habitatly
- Tagline: "Design Better. Live Greener."
- Personality named in the brief: modern, innovative, environmentally responsible, friendly, premium but accessible, creative, trustworthy, practical.
- Palette is binding: `#244C3B`, `#91A98C`, `#C7DB9A`, `#F8F8F3`, `#FFFFFF`, `#252D29`, `#78847B`.
- Original SVG logo: wordmark plus a minimal house or leaf mark.
- Typography limited by the brief to Inter, Manrope, or DM Sans.

## Evidence on Hand

Sample room assessments, design concepts, material examples, DIY steps, and illustrative statistics are specified in the product brief. There are no customer quotes, awards, case studies, or measured company results. Photos must be downloaded royalty-free files stored in the repo, not hotlinked placeholders.

## Product Principles

- One project, carried intact from the first photo to the last summary.
- Show the work: the visitor's photo, selections, quantities, and checklist progress stay visible downstream.
- Label every figure that is not a measurement. Estimates and illustrative stats stay honest.
- The interface should feel like a product a homeowner could start using, including empty, mobile, and reset states.
- Practical guidance sits beside the design imagery. Beauty without a next step is out of scope.

## Accessibility & Inclusion

Keyboard access for upload, checkboxes, and dialogs is required. Layouts must work on desktop, laptop, tablet, and phone. No separate formal standard was named.
