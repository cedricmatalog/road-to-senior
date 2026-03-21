import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-api-versioning',
  title: 'API Versioning Strategy',
  description: 'You need to make a breaking change to a public API that existing clients depend on. How do you approach versioning?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Breaking changes to public APIs break trust. The right approach is always to run old and new in parallel with a sunset timeline — never silently change what clients depend on.',
    situation: `Your public REST API's \`/users\` endpoint returns a \`name\` field. You need to split it into \`firstName\` and \`lastName\` — a breaking change. You have ~50 external API consumers (some internal, some third-party). Existing consumers must not break. New consumers should use the improved schema. What's your approach?`,
    options: [
      {
        id: 'a',
        label: 'Introduce URL versioning (/v1/users and /v2/users), run both in parallel with a sunset timeline for v1',
        explanation: 'URL versioning is the most explicit and discoverable approach. /v1/users continues to return `name`. /v2/users returns `firstName` and `lastName`. Communicate a sunset date for v1 (3-6 months is common) so consumers have time to migrate. The parallel operation is the key: never silently break existing clients, always give them a migration path. Alternatively, keep `name` alongside the new fields in the same version (additive change) — but if you must remove `name`, versioning is the clean solution.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Make the breaking change and send an email to all known consumers with a 2-week heads-up',
        explanation: 'Two weeks is too short for external consumers, who may have release cycles, approval processes, or resource constraints. And "known consumers" often misses some. Breaking a public API without a parallel version running is a significant trust violation — even with warning.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add firstName and lastName fields but keep name too — clients can migrate at their own pace',
        explanation: 'Additive changes (keeping `name` and adding new fields) are the least disruptive option and often the right one. But if the requirement is to eventually remove `name`, this just defers the breaking change. If you need a clean schema long-term, versioning with a sunset is the right path.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
