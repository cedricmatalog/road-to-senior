import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'ci-cd-deploy-strategy',
  title: 'Choose a Deploy Strategy for Zero Downtime',
  description: 'You need to deploy a breaking API change without taking the site down.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['ci-cd', 'system-design'],
  content: {
    overview: 'Zero-downtime deployments require thinking about the transition state — the window where old and new code run simultaneously. Breaking changes (renamed fields, removed endpoints, schema migrations) must be deployed in multiple steps, not one big bang.',
    situation: `You need to rename a field in your API response: \`user.name\` → \`user.fullName\`. The field is consumed by a mobile app (which updates slowly — some users are on 3-month-old versions), a web frontend (you control it), and two internal services.\n\nYou want zero downtime. What's your deployment plan?`,
    options: [
      {
        id: 'a',
        label: 'Deploy the rename, update all consumers simultaneously, and coordinate a maintenance window',
        explanation: 'Maintenance windows mean downtime. They also require perfect coordination across all consumers, including the mobile app you don\'t control. For a field rename, this level of disruption is unnecessary.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Use an expand-contract pattern: first deploy both fields simultaneously, migrate consumers to fullName, then remove name in a later deploy',
        explanation: 'This is the right approach. Expand: add fullName alongside name (both present). Migrate: update all consumers (web, internal services) to use fullName. Wait: monitor until old mobile app versions are below an acceptable threshold. Contract: remove name once old consumers are gone. This pattern works for any breaking change — field renames, schema migrations, API version deprecations. The key insight is that there is always a transition period; design for it explicitly.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Version the API: keep v1 with name, add v2 with fullName, migrate consumers to v2 over time',
        explanation: 'API versioning is a valid long-term strategy but it\'s heavy for a single field rename. You now have two versions to maintain indefinitely until all v1 consumers migrate. The expand-contract pattern achieves the same goal with less infrastructure overhead.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Deploy the rename immediately and update the mobile app to handle both field names with a fallback',
        explanation: 'Putting the backward-compatibility logic in the consumer is backwards. The API should be backward-compatible, not the consumer. Also, you can\'t force mobile app updates — some users will run old versions for months.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
