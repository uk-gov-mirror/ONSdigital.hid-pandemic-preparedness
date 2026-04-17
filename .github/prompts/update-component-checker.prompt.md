---
agent: "agent"
description: "Regenerate the Storyblok types and review a component or the platform for any misalignment of rearranged or changed component definitions, allowed nested blocks, field names/types in Storyblok and check whether renderers need code updates"
---

Review and amend the selected component or files or whole app in this repository

Definiition:
- npm run generate-storyblok-types will update the generated TypeScript definitions, not the renderers.
- What that command does in this repo is:
    • pull the current Storyblok component definitions from your space
    • regenerate files like storyblok-components.d.ts
    • keep the repo’s schema/types aligned with whatever is configured in Storyblok
- That is documented in README.md:222 and implemented in generateTypes.sh.
- What it does not do:
    • it does not create or update Astro/React renderer code
    • it does not add support to Dynamic.tsx
    • it does not add support to DynamicComponent.astro
    • it does not make unsupported blok combinations suddenly work on the frontend
- So for example, if you changed Storyblok to allow Code inside UnitOverview or UnitSection, then running npm run generate-storyblok-types should update the generated types to reflect that new allowed schema. But the unit renderer would still need manual code changes before the site can actually display those bloks.
- The clean mental model is:
    • Storyblok CMS change: updates the content model
    • npm run generate-storyblok-types: updates the repo’s generated type definitions to match that model
    • manual frontend code change: updates the renderer so the UI can actually display the new content
    • rebuild/deploy: makes production use that new code

Process:
- run npm run generate-storyblok-types to update the generated types
- review the component or platform for any misalignment of rearranged or changed component definitions, allowed nested blocks, field names/types in Storyblok and check whether renderers need code updates
- update all relevant files including stories and tests.


Return:
1. types that have changed
5. Exact files to change, if any