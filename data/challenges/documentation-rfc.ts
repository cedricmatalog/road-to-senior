import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'documentation-rfc',
  title: 'Write an RFC for a Breaking API Change',
  description: 'You want to change authentication across all services. Write an RFC to get buy-in.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['documentation', 'communication'],
  content: {
    overview: 'An RFC (Request for Comments) is a proposal for a significant change that requires broader alignment before implementation begins. Unlike an ADR (which documents a past decision), an RFC is written before the work starts — it invites feedback, surfaces concerns, and builds shared understanding. A good RFC prevents the worst outcome in software: building the wrong thing with confidence.',
    situation: `You want to migrate all internal services from API key authentication to JWT-based auth. This affects 6 services owned by 3 teams, requires coordinated rollout, and has security implications. You\'re convinced it\'s the right move but you need buy-in from the other teams before starting.\n\nYour manager suggests "just start building and we\'ll align as we go." What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Agree with your manager — start building a proof of concept and share it when it\'s ready',
        explanation: 'Building first and aligning later is the classic way to create wasted work. When the PoC is done, other teams will have concerns that require architectural changes. The JWT library you chose may conflict with their stack. The rollout sequence may be incompatible with their release schedule. These problems are cheap to solve in a document; expensive to solve in code.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Write an RFC with: problem statement, proposed solution, alternatives considered, rollout plan, open questions, and a comment period — share it with all affected teams before writing code',
        explanation: 'This is the right process for a cross-team breaking change. An RFC forces you to articulate the problem clearly (which often surfaces that you\'ve misunderstood it), document the alternatives you rejected (and why), and identify open questions before they become blockers. A comment period (1-2 weeks) gives other teams time to read it and raise concerns. What comes back in comments is often invaluable — the other team knows their system better than you do. RFCs save far more time than they cost.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Schedule a meeting with all 3 teams to discuss the change before starting',
        explanation: 'A meeting is better than nothing, but people need time to think — they can\'t evaluate a complex proposal in real time. A written RFC can be read asynchronously, referenced later, and commented on with specifics. Meetings produce decisions; RFCs produce informed decisions.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Migrate one service as a pilot, then ask for feedback before rolling out to others',
        explanation: 'Piloting is a valid engineering strategy, but for a breaking API change affecting 6 services, you need alignment on the approach before touching even one service. If the pilot reveals your approach was wrong, you now have one service on the wrong path that needs migrating back.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
