import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'mentoring-onboarding',
  title: 'Onboarding a New Team Member',
  description: 'A new mid-level engineer joins your team next Monday. You\'ve been asked to own their onboarding. What\'s your plan?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['mentoring', 'communication'],
  content: {
    overview: 'Structured onboarding is the highest-leverage investment you can make in a new teammate. The first week sets the trajectory for the next three months.',
    situation: `A mid-level engineer with 3 years of experience (different stack) joins your team Monday. They'll be expected to contribute independently within 4-6 weeks. The codebase is large and has quirks that aren't documented. You're their onboarding buddy. There's no formal onboarding process. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Give them a structured first week: architecture walkthrough, a small starter task, daily check-ins, and a doc of team conventions and gotchas',
        explanation: 'Structured onboarding is the highest-leverage thing you can do for a new teammate. The architecture walkthrough gives them the mental map. A small, well-scoped first task gets them shipping early (builds confidence) and surfaces tooling/process questions in a low-risk context. Daily check-ins catch blockers before they become multi-day stalls. Documenting team conventions helps them and every future hire. The common mistake is throwing them into a large feature immediately — complex tasks without context leads to frustration and slow ramp-up.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Point them to the docs and existing code — they\'re mid-level, they\'ll figure it out',
        explanation: 'Mid-level experience doesn\'t transfer automatically to a new codebase. Even experienced engineers need orientation. "Read the code" without guidance wastes a week on confusion that a 30-minute walkthrough would eliminate. Your domain knowledge is the bottleneck, not their intelligence.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Assign them to shadow a senior for two weeks before they write any code',
        explanation: 'Shadowing for two weeks with no output is too slow — both for the new hire (passive learning is less effective) and the team (they need to contribute). A better model is 20% learning, 80% doing from day one, with support available as needed.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
