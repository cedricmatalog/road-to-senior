import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-feature-flags',
  title: 'Implementing Feature Flags',
  description: 'You need to roll out a risky feature gradually. How do you design the feature flag system?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['architecture', 'system-design'],
  content: {
    overview: 'Feature flags decouple deployment from release — you can ship code to production without users seeing it, then roll it out gradually. Essential for risk management on significant changes.',
    situation: `You're about to ship a major redesign of your checkout flow. It's been tested but you want to roll it out to 10% of users first, then 50%, then 100% — and be able to roll back instantly if metrics tank. You also want some users (beta testers, internal team) to always see the new version. How do you implement this?`,
    options: [
      {
        id: 'a',
        label: 'Use a flag service (LaunchDarkly/Unleash, or a simple DB table) with user percentage rollout and explicit override lists',
        explanation: 'Feature flags decouple deployment from release. The flag evaluator checks: (1) is the user in the override list? → always on/off, (2) hash the user ID to a stable 0-100 number, compare to rollout percentage → on/off. This gives: stable user experience (same user always sees same variant), instant rollback (change percentage to 0), beta testing (add user IDs to override list), gradual rollout (10% → 50% → 100%). A simple implementation is a database table: `{ flag_name, rollout_percentage, override_user_ids }`. Production teams use LaunchDarkly or Unleash to avoid building the evaluation logic, dashboard, and audit logging yourself.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Use an environment variable — set CHECKOUT_V2=true on 10% of servers',
        explanation: 'Server-level flags are coarse and create inconsistent experiences — a user\'s requests might hit different servers and see different versions. They also require a deployment to change the percentage. User-level flags provide consistent experience and instant toggling.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Ship the new checkout to a separate URL (/checkout-v2) and let users opt in',
        explanation: 'Opt-in via URL doesn\'t give you a controlled rollout — you can\'t measure impact on a random sample. You want to compare new vs old on equivalent populations, not self-selected ones. Opt-in attracts technically savvy users who aren\'t representative.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
