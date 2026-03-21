import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'mentoring-performance-review',
  title: 'Giving a Difficult Performance Review',
  description: 'A junior dev who tries hard but isn\'t meeting expectations needs honest feedback. How do you frame it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['mentoring', 'communication'],
  content: {
    overview: 'Honest feedback is the kindest thing you can give an underperformer. Vague or softened feedback sends a false signal — they continue off-track until a surprise correction.',
    situation: `It's performance review time. A junior dev on your team is enthusiastic, works long hours, and is well-liked. But after 9 months they're still needing significant hand-holding on tasks that should be independent, missing edge cases in their code, and their output velocity is below where a junior at 9 months should be. They clearly expect positive feedback. How do you give honest feedback without crushing them?`,
    options: [
      {
        id: 'a',
        label: 'Be honest and specific: name the gap clearly, separate it from effort and intent, and give them a concrete improvement plan with a timeline',
        explanation: 'Honest feedback is the kindest thing you can give an underperformer. Sugarcoating sends a false signal — they continue thinking they\'re on track until a surprise PIP or termination. Name the gap precisely ("at 9 months I expect you to complete X independently — you\'re still needing Y level of guidance"). Acknowledge effort and intent separately — "I see how hard you\'re working, and that matters — but effort alone isn\'t the measure here." Then be concrete: "By month 12, I want to see Z. Here\'s how we get there." This is harder than being vague, but it gives them a real chance to course-correct.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Focus on the positives — enthusiasm and effort — and mention the gaps gently so as not to discourage them',
        explanation: 'This is the "feedback sandwich" and it consistently fails. If positive feedback dominates, people remember the positive and discount the negative. They leave the review thinking they\'re doing well. You\'ve done them a disservice. Soft feedback for hard problems is not kindness — it\'s conflict avoidance.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Escalate to your manager and let them deliver the difficult feedback',
        explanation: 'If you\'re the tech lead or senior responsible for this person, this is your feedback to give. Passing it to a manager says "I can\'t have hard conversations" and removes any personal relationship from the feedback, making it more damaging and less actionable.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
