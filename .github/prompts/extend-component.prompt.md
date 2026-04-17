---
agent: "agent"
description: "Extend an existing component safely"
---

Update an existing component in this repository

Process:
- Inspect the currnet component API and usages.
- Preserve existing behaviour unless the task expiicity asks for a breaking change.
- There may be an edge case where the component has been made to be quite specific to a single use, and in this case it may be better to reframe the existing component to be a more suitable generic agnostic component for both the existing use and the new use, and then create a new component that composes the generic component for the existing use case. This is a judgement call that should be made based on the specific circumstances of the task and the component in question. I have a feeling there might be a few cases of this in the platform as is where we might have to do this.
- Reuse existing utilities and patterns
- Explain whether the new feature belongs in:
  - shared UI
  - storyblok block wrapper
  - storyblock mapping layer
- update stories and tests.
- call out acessibility or storyblock schema implications if there are any.

Task:
${input:task:Describe the change}
