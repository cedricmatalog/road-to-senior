import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-react-components',
  title: 'Testing React Components Effectively',
  description: 'What should your React component tests actually verify, and how?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['testing'],
  content: {
    overview: 'React Testing Library\'s guiding principle: test what users experience, not implementation details. Tests that assert on class names, component state, or internal method calls break on every refactor. Tests that assert on visible text, accessible roles, and user interactions survive refactors and catch real regressions.',
    situation: `You're reviewing a PR that adds tests for a \`LoginForm\` component. The tests:
1. Assert that the component's internal \`isLoading\` state is \`true\` after submit
2. Check that a specific CSS class \`"btn-spinner"\` appears on the button
3. Check that the \`onSubmit\` prop function is called with the raw form data

A senior dev comments: "These tests will break every time we refactor." What's wrong, and what should the tests do instead?`,
    options: [
      {
        id: 'a',
        label: 'Test user-visible behaviour: the button shows "Loading..." text (or becomes disabled), an error message appears when login fails, and the user gets redirected on success',
        explanation: 'Internal state (`isLoading`), CSS class names (`btn-spinner`), and prop call signatures are implementation details — they can all change without breaking the feature. What the user experiences cannot be hidden: the button visually indicates loading (text change or disabled attribute, which testing-library can query by role/text), error messages appear as visible text, and navigation happens. Tests written this way survive refactors from class-based state to React Query, from a spinner class to a spinner component, and from inline handlers to custom hooks — because the user experience didn\'t change.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'The tests are fine — verifying internal state and class names gives precise feedback on what broke',
        explanation: 'Internal state and class names give false precision — they tell you exactly what implementation detail changed, but not whether the feature is broken. A test that fails when you rename `btn-spinner` to `button--loading` doesn\'t protect users; it protects a CSS class name. These tests add maintenance cost without adding regression protection.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a snapshot test — if the rendered output changes, the test fails and you review the diff',
        explanation: 'Snapshot tests are brittle by default — every styling or markup change requires a snapshot update, and developers learn to update snapshots without reviewing the diff carefully. They catch accidental changes but generate noise on intentional ones. Use snapshots sparingly, for small stable components, not as a primary testing strategy.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
