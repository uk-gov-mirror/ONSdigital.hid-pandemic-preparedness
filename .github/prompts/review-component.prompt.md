---
agent: "agent"
description: "Review a component for accessibility, reuse and question any potential issues with the implementation or integration of the component and if it could be made more generic and reusable. Also check if the component is following existing project patterns and conventions."
---

Review the selected component or files in this repository

Process:
- First inspect existing components
- Reuse existing primitives where possible
- Use typescript that matches existing
- update all relevant files including stories and tests.
- include accessibility considerations in the implementation and call them out in the PR description.

Return:
1. Rating of the component's accessibility, reusability and adherence to project patterns on a scale of 1-10, with 10 being the best. Provide a brief explanation for the rating.
2. Critical issues
3. Medium issues
4. Quick Wins
5. Exact files to change