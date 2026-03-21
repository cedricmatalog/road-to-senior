import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-api-versioning',
  title: 'Consuming a Breaking API Change',
  description: 'The API you depend on is shipping a breaking change next week. How do you update the frontend without a big-bang deploy?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'When an API you consume changes, the frontend needs a migration strategy — not a flag day. The safest approach is to make the new shape work alongside the old one first, then switch over, then clean up.',
    situation: `The backend team is renaming a field in the user API: \`user.name\` → \`user.firstName + user.lastName\`. They will run both fields in parallel for 4 weeks, then remove \`name\`. You have a React app with ~20 components that reference \`user.name\`. You need to migrate without breaking anything mid-deploy. What's your approach?`,
    options: [
      {
        id: 'a',
        label: 'Create a normalizer layer: map the API response to your internal shape in one place, migrate all components to the internal shape, then flip the normalizer to use the new fields when ready',
        explanation: 'This is the right pattern. A normalizer (a function that transforms the raw API response) is the only place that knows about the external API shape. All 20 components use the internal shape — they never reference raw API fields directly. To migrate: update the normalizer to read `firstName + lastName` (or fall back to `name` during the transition window), then remove the fallback after the old field is removed. This means a 1-line change in 1 file, not 20 components. It also insulates you from future API changes.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Update all 20 components at once in a single PR to read the new fields',
        explanation: 'A big-bang migration works if you can deploy atomically. But if any component is missed, or if the API switches before your deploy, something breaks. During the 4-week parallel window, you can do this safely — but the normalizer approach is less risky and easier to review: one diff, not 20.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a compatibility shim in each component: `const name = user.firstName ? \`${user.firstName} ${user.lastName}\` : user.name`',
        explanation: 'Spreading compatibility logic across 20 components creates 20 places to remember and clean up. When the old field is removed, you have 20 PRs or one large refactor. The normalizer approach concentrates this in one place. Never spread API-shape knowledge through your component tree.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
