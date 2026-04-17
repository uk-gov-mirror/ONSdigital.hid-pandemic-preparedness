# Project Overview

This document is a practical orientation guide to how the application is put together today. It complements the more formal material under `doc/` by focusing on runtime flow, composition, and the main places to extend safely.

## At a glance

- Framework: Astro 5 with React integration
- Content source: Storyblok, with local JSON fixtures used for most local development
- Rendering model: mostly static site generation, with a separate server build for preview
- Search: Pagefind indexes built output for static client-side search
- UI development: Storybook for isolated component work
- Deployment shape: static app plus separate AWS Lambda functions for preview SSR and environment auth

## How pages are composed

The application has a small number of Astro page entry points:

- `src/pages/[...slug].astro` is the main catch-all route for Storyblok-driven pages
- `src/pages/search.astro` is a dedicated static search page
- `src/pages/404.astro` handles not-found content

The main runtime flow for content pages is:

1. `getStaticPaths()` in `src/pages/[...slug].astro` calls `fetchStories()` to enumerate all stories for static generation.
2. For each story, the route param uses `story.path` if present, otherwise `story.full_slug`.
3. At build time, Astro receives the story via `Astro.props`. In preview/server mode, the page fetches the story on request using `fetchStory(Astro.url.pathname)`.
4. The page builds shared page context such as breadcrumbs and normalized references.
5. The Storyblok content type in `story.content.component` is used to choose an Astro layout from `src/layouts/layoutMap.ts`.
6. The selected layout renders shared chrome through `BaseLayout.astro`, then renders page-specific content sections.

This means Astro owns the route, top-level data fetching, and page shell selection. Storyblok controls which layout is used and which body blocks appear inside that layout.

## Layout layer

`src/layouts/layoutMap.ts` is the switchboard between Storyblok page-level components and Astro layout files.

Current layouts are:

- `BasicPage`
- `FilterableResources`
- `HomePage`
- `SupportingInformation`
- `Unit`

Each layout accepts the same broad shape of props:

- `story`
- `breadcrumbs`
- optional `referencesData`

Most layouts then:

- wrap content in `BaseLayout.astro`
- render a page header
- render page body blocks by mapping `story.content.Body` through `DynamicComponent.astro`

`BaseLayout.astro` is important because it centralizes page-level chrome and some shared data fetching. It fetches the `navbar` and `footer` stories separately, applies global styles and Bootstrap JS, and renders the shared references section when the page exposes reference data.

## Astro and React responsibilities

This codebase uses Astro for page orchestration and React for many interactive or complex presentational components.

Astro is mainly responsible for:

- routing
- top-level data fetching
- layout selection
- composing page shells
- deciding hydration strategy for React components

React is mainly responsible for:

- interactive UI
- richer content widgets
- components that benefit from client-side state or browser APIs
- Storybook-driven UI development and testing

You can see the boundary most clearly in `src/components/DynamicComponent.astro`, which receives a Storyblok blok and chooses which component to render.

## React islands and hydration

This project uses Astro island directives rather than making the whole site a client-rendered React app.

Representative patterns:

- `client:load`: used for components that must be interactive immediately, such as the NavBar
- `client:visible`: used for components that can wait until they enter the viewport, which helps limit client JS cost
- `client:only="react"`: used when a component should render only on the client

Examples in the current code:

- `NavBar` is loaded with `client:load` from `BaseLayout.astro`
- `Header` on the home page is hydrated with `client:visible`
- `Unit` content is rendered as a visible island in `src/layouts/Unit.astro`
- several Storyblok-driven blocks such as `Table`, `Formula`, `Video`, `Iframe`, and `ToolsCarousel` are hydrated from `DynamicComponent.astro`
- `Code` is rendered with `client:only="react"`

The practical rule is: keep as much as possible in Astro/static output, and only hydrate the parts that genuinely need client behavior.

## Storyblok fetch flow

The Storyblok integration has two modes:

- local fixture mode for development and tests
- real Content Delivery API mode for preview or live fetching

This behavior is centralized in `src/helpers/fetchContent.ts`.

### Client selection

`fetchContent.ts` chooses the client based on environment variables:

- `ASTRO_USE_LOCAL_DATA=true`: use `LocalClient`, which reads JSON from `src/content/`
- `ASTRO_USE_LOCAL_DATA=false`: use the Storyblok API client from `@storyblok/astro`
- `ASTRO_PREVIEW=true`: fetch draft content
- `ASTRO_PREVIEW=false`: fetch published content

This is one of the most important project conventions. Most app code does not care where content came from because both clients expose the same `get(...)` shape.

### Local content mode

`src/helpers/LocalClient.ts` mimics the Storyblok client and reads from:

- `src/content/stories/*.json`
- `src/content/stories.json`
- `src/content/datasource_entries*.json`

That allows offline or stable local development without depending on the external CMS on every run.

### Story fetching

The main helpers are:

- `fetchStories(params?)`: paginates through Storyblok stories and is used by static route generation and other list-style fetches
- `fetchStory(pathParam, params?)`: fetches a single story and normalizes `/` to `home`
- `fetchDatasourceEntries(slug, name?, locale?)`: fetches Storyblok datasource entries

`resolve_links: "story"` is applied during story fetches so linked content can be resolved consistently.

## Storyblok mapping flow

There are two layers of mapping in this repo:

### Page-level mapping

At the page level, the mapping is simple and explicit:

- Storyblok page component name -> Astro layout via `LAYOUT_MAP`
- Storyblok body blok component name -> Astro or React section via `DynamicComponent.astro`

If you add a new page-level content type in Storyblok, you usually need to update:

1. the schema/types
2. `src/layouts/layoutMap.ts`
3. the relevant layout file

If you add a new body blok, you usually need to update:

1. the schema/types
2. `src/components/DynamicComponent.astro`
3. the component implementation
4. related Storybook stories

### Rich text embedded blok mapping

Embedded components inside rich text use a separate mapping path. `src/components/RichTextComponent.tsx` maps a smaller set of blok component names such as `Formula`, `Table`, `Tip`, `Video`, and `Iframe` to React components.

That distinction matters because not every blok is rendered from the page body array. Some are rendered from within Storyblok rich text content.

## Reference normalization flow

`src/helpers/updateReferences.ts` performs a useful normalization step before rendering pages.

It:

- scans the story JSON for `Reference` bloks using JSONPath
- deduplicates them using a subset of reference fields
- assigns global numeric labels
- writes those labels back into the cloned story content

The result is that references can appear in multiple places in Storyblok content but still render as a clean, deduplicated references list at page level.

## Routing model

Routing is intentionally simple:

- all Storyblok-driven content routes go through `src/pages/[...slug].astro`
- route params are generated from Storyblok slugs and optional custom paths
- `search.astro` is a conventional Astro page, not Storyblok-driven

Important routing details:

- homepage is represented as `home` in Storyblok and normalized from `/` in `fetchStory()`
- `story.path` takes precedence over `story.full_slug` when present
- breadcrumbs are derived from `story.full_slug` by `src/helpers/buildBreadcrumbs.ts`
- some layouts derive sibling or parent navigation by querying stories that share a slug prefix

This means URL structure mostly follows Storyblok content structure, with optional overrides when `path` is defined on a story.

## Search flow

Search is static-first and built around Pagefind.

Key pieces:

- `astro.config.mjs` enables the `astro-pagefind` integration
- `src/pages/search.astro` renders the search interface
- unit pages generate hidden "ghost" chapter content in `src/layouts/Unit.astro` so Pagefind can index chapter-level text and link users to section anchors

This is a good example of the project choosing static build-time enhancement over a live search API.

## APIs and service boundaries

There are no first-party Astro API routes in `src/pages` at the moment. The operational API-style behavior sits outside the Astro app in separate Lambda packages.

### Preview runtime

`lambda/preview/` exists to support the server-rendered preview deployment.

- Astro is built with `ASTRO_OUTPUT=server`
- `@astrojs/node` is used in middleware mode
- `lambda/preview/handler.mjs` wraps Astro's server entry with `serverless-http`
- the preview deployment can fetch draft Storyblok content and use Storyblok live preview support

In other words, the preview environment is not a different app. It is the same Astro app built for SSR and adapted to run behind AWS Lambda.

### Environment auth

`lambda/auth/` provides a separate authentication flow for protected environments.

It:

- serves simple HTML pages from `lambda/auth/templates/`
- validates a submitted password
- issues and verifies an `auth_token` cookie using JWT
- reads its secret configuration from AWS Secrets Manager

This auth layer is infrastructure-facing, not part of the Astro page routing tree.

## Configuration that changes runtime behavior

The most important runtime switches are:

- `ASTRO_OUTPUT`: `static` for the main site, `server` for preview SSR
- `ASTRO_USE_LOCAL_DATA`: local JSON fixtures vs real Storyblok API
- `ASTRO_PREVIEW`: published vs draft content version
- `PREVIEW_CDN_BASE_URL`: asset prefix for the preview deployment
- `STORYBLOK_ACCESS_TOKEN`: Storyblok API access

These are wired in `astro.config.mjs` and `src/helpers/fetchContent.ts`, so changes here have wide impact.

## Types and schema expectations

The repository guidance is correct to treat Storyblok schema and generated types as the source of truth.

Important files:

- `src/types/storyblok.d.ts`
- `src/types/bloks/storyblok-components.d.ts`

Those generated types should be updated when Storyblok schemas change. Avoid inventing field names in components or docs. If the schema changes, the generated types, mappings, and UI components should move together.

## Styling and UI composition

Styling is a mix of:

- Bootstrap as a base SCSS framework
- project SCSS overrides and global styles under `src/styles`
- component-scoped styles where needed

The app imports Bootstrap JS bundle in `BaseLayout.astro` and relies on that for some behavior such as popovers.

## Testing and Storybook

The project leans on:

- Storybook for isolated component development
- Vitest and Testing Library for user-facing component and helper tests
- ESLint and Prettier for static quality gates

When changing an existing UI component, updating or adding Storybook stories is part of the expected workflow in this repo.

## Safe extension points

If you need to change the app, these are the usual places:

- new page content type: Storyblok schema, generated types, `layoutMap.ts`, layout file
- new body blok: Storyblok schema, generated types, `DynamicComponent.astro`, component, Storybook story
- new rich text embedded blok: schema/types, `RichTextComponent.tsx`, component renderer
- new shared fetched content: probably `BaseLayout.astro` or a helper in `src/helpers`
- new route behavior: `src/pages/[...slug].astro`, `buildBreadcrumbs.ts`, or the relevant layout helper logic

## Things that are easy to miss

- `doc/` already contains formal architecture records and requirements; this `docs/overview` folder is a lightweight runtime guide.
- `src/content/` is not just mock data. It is part of the intended local-development workflow.
- preview is a separate deployment mode, not just a flag inside the static site.
- `DynamicComponent.astro` and `layoutMap.ts` are the two most important dispatch files for Storyblok-driven rendering.
- search indexing for unit content depends on hidden ghost markup, so changes there can break search quality without breaking visible UI.

## Suggested reading order

If you are new to the repo, read these files in this order:

1. `src/pages/[...slug].astro`
2. `src/helpers/fetchContent.ts`
3. `src/helpers/LocalClient.ts`
4. `src/layouts/layoutMap.ts`
5. `src/layouts/BaseLayout.astro`
6. `src/components/DynamicComponent.astro`
7. `src/helpers/updateReferences.ts`
8. `astro.config.mjs`
9. `lambda/preview/README.md`
10. `lambda/auth/README.md`