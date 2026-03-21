import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'incident-response-runbook',
  title: 'Build a Runbook for a Critical Service',
  description: 'You\'re the only one who knows how to restart the queue processor. Fix that.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['incident-response', 'communication'],
  content: {
    overview: 'A runbook is operational documentation: step-by-step instructions for diagnosing and resolving known issues. If the only person who knows how to handle an incident is unavailable, the team is helpless. Runbooks distribute operational knowledge so any on-call engineer can act.',
    situation: `Every time the background job queue processor stalls (happens ~2x/month), you get paged because you\'re the only one who knows the fix: check the dead letter queue, clear poison messages, restart the worker with a specific environment flag.\n\nYour manager asks you to fix this knowledge silo. You have 2 hours. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Schedule a knowledge-sharing session to walk the team through the fix verbally',
        explanation: 'Verbal knowledge transfer doesn\'t survive. People forget, the team changes, and at 2am nobody remembers what you said in a meeting 3 months ago. Documentation is permanent; presentations are not.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Write a runbook with: symptoms, diagnosis steps (what to check first), resolution steps (exact commands with flags), and escalation path if those steps fail — link it from the alert',
        explanation: 'This is the right output. A runbook has four parts: (1) Symptoms — how does this incident present? What does the alert say? (2) Diagnosis — what do you check to confirm it\'s this issue? (3) Resolution — exact commands, with copy-pasteable flags, in order. (4) Escalation — who to call if this doesn\'t work. Linking the runbook directly from the alert means the on-call engineer doesn\'t have to search for it at 2am. The goal: anyone on the team can resolve this incident without calling you.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Automate the fix so the queue processor self-heals without human intervention',
        explanation: 'Automation is the ideal long-term solution, but it takes more than 2 hours and may not handle all cases (poison messages require judgment). A runbook is the right first step — it buys you time to automate properly and covers cases automation might miss.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Add a second engineer to the on-call rotation who you\'ll mentor through the fix next time it happens',
        explanation: 'Mentor-by-incident is better than nothing but it\'s slow (2x/month means months before they\'ve seen enough cases) and still leaves the team dependent on two specific people. A runbook scales to the entire team immediately.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
