import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'communication-scope-creep',
  title: 'Handling Scope Creep Mid-Sprint',
  description: 'Halfway through a sprint, your PM asks you to add "one small thing." How do you respond?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['communication', 'estimation'],
  content: {
    overview: 'Scope creep is invisible until you make it visible. Your job is to surface tradeoffs — not to silently absorb extra work or rigidly enforce process.',
    situation: `It's Wednesday, sprint ends Friday. You're on track to deliver the 3 committed stories. Your PM messages: "Hey, can we also add the CSV export feature this sprint? The client is asking. It should be quick — just add a download button." You know from experience that "just a download button" involves backend changes, formatting logic, and browser compatibility work — it's probably 2 days of work. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Explain the actual scope and tradeoff: "CSV export is ~2 days. We can add it if we drop one of the committed stories — which should we move?"',
        explanation: 'Correct. Scope creep is real and it\'s your job to make the tradeoff visible. "Adding this means not finishing X — which do you prefer?" is a business decision, not an engineering one. Never just silently absorb extra work — it creates the illusion that scope doesn\'t cost anything. Give them the information they need to make an informed decision. If they say both must be done, escalate: "OK, but we\'ll need to work overtime or adjust the deadline."',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Say yes and try to do it all — you can work late if needed',
        explanation: 'This creates invisible overtime debt and trains stakeholders to underestimate scope. If you always absorb extra work without flagging it, you\'re teaching them that scope doesn\'t matter. When you eventually miss a deadline, it comes as a surprise to everyone. Make tradeoffs explicit upfront.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Say no — the sprint is committed and changes can go to the backlog',
        explanation: 'Technically correct process-wise, but too rigid. The right answer is to surface the tradeoff and let the business decide — not to hide behind process. Sometimes the new request is more valuable than a committed story. Your job is to make the cost visible, not to enforce sprint boundaries.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
