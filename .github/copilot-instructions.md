# .github/copilot-instructions.md

This repository is an astro + react + typescript platformwith all content driven by storyblok.

Rules:

- Core Rules
  - Prefer reusing and extending existing components over creating new ones. Search in 'src/components/molecules' and 'src/components/organisms' mostly.
  - Always check the Storyblok content structure before adding new fields or components.
  - When adding new fields to Storyblok, ensure that they are properly documented and that the content editors understand how to use them effectively.
  - When working with Storyblok, ensure that you are following the best practices for content modeling and organization to make it easier for content editors to manage and update the content.
  - Always test your code changes thoroughly to ensure that they work as intended and do not introduce new issues or bugs.
  - When working on a feature or bug fix, consider the potential impact on performance and optimize your code where necessary to ensure a smooth user experience.
  - Regularly review and refactor your code to improve its quality and maintainability, and to ensure that it continues to meet the needs of the project and its users.
  - When in doubt, consult the documentation or ask for guidance from the team.
  - Always write clear and concise commit messages that describe the changes made.
  - Ensure that all code changes are properly tested and reviewed before merging.
  - When working on a feature or bug fix, create a new branch from the main branch and submit a pull request for review.
  - Keep the pull request focused on a single issue or feature to make it easier to review.
  - Regularly pull changes from the main branch to keep your branch up to date and avoid merge conflicts.
  - Use descriptive names for variables, functions, and components to improve code readability.
  - Avoid hardcoding values; instead, use constants or configuration files where appropriate.
  - Document any complex logic or decisions in the code with comments to help other developers understand the reasoning behind it.
  - When adding new dependencies, Always ask permission first, and ensure before you ask that they are necessary and do not bloat the project unnecessarily.
  - Always consider the performance implications of your code changes and optimize where possible.
  - When working on a feature or bug fix, consider the potential impact on other parts of the codebase and ensure that your changes do not introduce new issues or regressions.
  - Always be mindful of security best practices and ensure that your code does not introduce vulnerabilities or risks to the platform or its users.
  - When working with third-party libraries or APIs, ensure that you are following their documentation and best practices to avoid issues and ensure compatibility with the project.
  - Remember that the ultimate goal is to create a high-quality, user-friendly platform that helps users stay informed and prepared for health emergencies, and that we all have a role to play in achieving that goal through our code contributions and collaboration as a team.

- Front-end Guidance:
  - Accessibility: Ensure that the component is accessible to all users, including those with disabilities, by following best practices for accessibility and testing with assistive technologies.
  - Performance: Optimize the component for performance by minimizing unnecessary re-renders, using efficient algorithms, and avoiding excessive use of resources.
  - Reusability: Design the component to be reusable across different parts of the application, with
  - Semantic HTML: Use semantic HTML elements and attributes to improve the accessibility and SEO of the component, and to ensure that it is properly structured and easy to understand for both developers and users.
  - Keyboard Navigation: Ensure that the component can be easily navigated and interacted with using a keyboard, and that it provides appropriate focus states and feedback for users who rely on keyboard navigation.
  - Visible focus states: Ensure that the component provides visible focus states for interactive elements to improve accessibility and usability for all users.
  - Accessible labels and names: Ensure that all interactive elements within the component have accessible labels and names that accurately describe their purpose and function, to improve accessibility for users with assistive technologies.
  - Loading / empty states: Ensure that the component provides appropriate loading and empty states to improve the user experience and provide feedback to users when data is being fetched or when there is no content to display.
  - If a component is edited, update or add Storybook stories for the main states.

- Storyblok:
  - Treat storyblok schema and generated types as the source of truth.
  - Do not invent fields or assume optional fields are always present.
  - Prefer explicit mapping functions from storyblok bloks to component props.
  - Keep relation resolution and slug logic centralised.
  - when data is shared across entries, prefer storyblok references rather than duplicated local assumptions

- Storybook:
  - Stories should document real component states, not artificial ones.
  - Include all best practise states
  - Include at least one story that exercies keyboard interaction for interactive components
  - Keep args realistic and aligned with storyblok driven content shapes.

  - Testing:
  - Test user visible behaviour and component states, not implementation details.

  - Devops / Workflow:
  - For branches, we will create a branch for each new piece of work, with a preface of the type of work, e.g. feature, bugfix. the Jira issue number and issue name to be included in the branch name, for example: feature/JIRA-1234-add-new-component or bugfix/JIRA-5678-fix-rendering-issue.
  - For pull requests, we will have a more simple title that describes the change, for example: "Add new component for displaying user profiles" or "Fix rendering issue in unit overview component". The pull request description should include a more detailed explanation of the changes made, the reasoning behind them, and any relevant information for reviewers to understand the context and impact of the changes.
  - We will only do one pull request per issue, and we will ensure that the pull request is focused on a single issue or feature to make it easier to review and avoid introducing unrelated changes.
  - We will regularly pull changes from the main branch to keep our branches up to date
  - After MVP we will consider implementing a more formal branching strategy, creating release branches for each new release and using feature branches for ongoing development work, that we will then merge into the release branches when they are ready for release. This will help us to better manage our codebase and ensure that we can easily track and manage changes across different releases.

- Preservation:
  - Follow established patterns and conventions for naming, formatting, and structuring your code to maintain consistency across the codebase.
  - Keep shared UI components presentation focused and avoid adding business logic or data fetching directly within them.
  - Keep storyblok-specific mapping, routing logic and relation handling outide shared UI where possible.
  - Preserve existing functionality and behavior of the component while making improvements or adding new features, to ensure that it continues to meet the needs of the project and its users without introducing new issues or regressions.
  - Preserve existing component apis unless te task explicity requires a new API.
  - Update or add Storbook stories when a component changes.
  - Reuse existing styles, utilities, and layout primitives where possible.
  - Do not invent Storyblok field names or route shapes. Use the existing schema and current code patterns.
  - When making changes, explain:
    - Which files should change
    - What existing code should be reused
    - What Storyblok data shape is expected