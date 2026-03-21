import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'incident-response-triage',
  title: 'You\'re On-Call at 2am',
  description: 'Production is alerting. Walk through the triage process.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['incident-response', 'debugging'],
  content: {
    overview: 'Incident response is a skill. The worst thing you can do during an incident is immediately start changing things. The best engineers slow down, establish what they know vs. what they assume, mitigate before root-causing, and communicate continuously.',
    situation: `It\'s 2:17am. You get paged: "Checkout error rate spiked to 8% (normal: 0.1%). Started ~10 minutes ago." You\'re the only on-call engineer.\n\nIn the past 30 minutes: a teammate deployed a dependency update to the payments service. Traffic is normal. No other services are alerting.\n\nWhat do you do first?`,
    options: [
      {
        id: 'a',
        label: 'Start reading the payment service code to find what the dependency update changed',
        explanation: 'Code review during an active incident is slow. Users are failing checkout right now. The first action should be to reduce impact, not find the root cause. You can root cause after the blast radius is contained.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Immediately roll back the payments service deployment, notify stakeholders, then investigate root cause',
        explanation: 'This is the right order of operations. You have a strong hypothesis (recent deployment correlates with the spike) and a clear mitigation (rollback). The cost of a rollback is low; the cost of 8% checkout failures is high. Rollback first, investigate after. Simultaneously notify stakeholders ("investigating a checkout issue, mitigation in progress") — they need to know before customers escalate. Root cause analysis happens after the incident is resolved.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Check if the issue is affecting all users or a subset, then decide whether to rollback',
        explanation: 'Scoping the impact is useful, but it shouldn\'t delay mitigation when you have a clear hypothesis. If the rollback works, scope becomes irrelevant. If it doesn\'t work, you\'ve lost 5 minutes. Gather data in parallel — notify stakeholders and initiate rollback while you scope.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Wake up the teammate who deployed to ask them what changed',
        explanation: 'Waking people up during an incident should be a last resort, not a first move. You have enough information to act: a recent deploy, a correlated spike. Try the obvious mitigation first. Escalate to others if rollback doesn\'t resolve it or if you need expertise you don\'t have.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
