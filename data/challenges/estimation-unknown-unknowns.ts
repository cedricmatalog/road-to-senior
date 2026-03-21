import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'estimation-unknown-unknowns',
  title: 'Estimating a Feature You\'ve Never Built Before',
  description: 'You\'re asked to estimate a real-time collaboration feature. Your team has zero experience with WebSockets. What\'s your approach?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['estimation'],
  content: {
    overview: 'When you\'ve never built something before, the right first step is a time-boxed spike. A few hours of research turns unknown unknowns into known unknowns — and makes your estimate credible.',
    situation: `Your team is asked to add real-time collaborative editing to your document app — think Google Docs-style multi-cursor editing. Nobody on the team has built this before. You're not sure if you'd use WebSockets, CRDTs, operational transforms, or a third-party service. The CTO wants a rough estimate by tomorrow. How do you approach it?`,
    options: [
      {
        id: 'a',
        label: 'Do a 2-hour spike to understand the options, then give a wide range with explicit assumptions and a recommendation to build a proof-of-concept before committing to a date',
        explanation: 'This is the right move for genuinely unknown territory. A 2-hour spike (read docs, scan existing solutions, identify the key decisions) gives you enough to give an educated range rather than a guess. Then be honest about the uncertainty: "Based on 2 hours of research, I estimate 6-12 weeks using a third-party service like Liveblocks, or 12-20 weeks building on raw WebSockets. I recommend a 1-week spike to build a prototype before we commit to a timeline — we have too many unknowns right now." This is honest and demonstrates maturity.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Give a confident estimate of 4 weeks — real-time features sound complex but are usually just WebSockets',
        explanation: 'Confident estimates without basis are the cause of most project overruns. Real-time collaborative editing has known hard problems (conflict resolution, presence, offline sync) that naive WebSocket implementations don\'t handle. An uninformed confident estimate commits the team to a number that may be wildly wrong.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Refuse to estimate until the team has done a full technical design — maybe 2 weeks of research',
        explanation: 'Two weeks of research before any estimate is too slow for a rough sizing question. A CTO asking for a tomorrow estimate wants ballpark direction, not a guaranteed date. A 2-hour spike and an honest range with explicit uncertainty is far more useful than a refusal.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
