import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'mentoring-code-standards',
  title: 'Raising Code Standards Without Demoralising',
  description: 'A mid-level dev consistently writes working but hard-to-maintain code. How do you raise the bar?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['mentoring', 'code-review'],
  content: {
    overview: 'Code review comments address specific code. To change habitual patterns, you need a direct conversation — specific, non-judgmental, with a concrete improvement plan and a checkpoint.',
    situation: `A mid-level dev on your team (been there 8 months) consistently writes code that works but is hard to maintain: long functions, poor naming, no error handling for edge cases. You've left review comments like "consider extracting this" and "this could be clearer," but they keep submitting similar PRs. They're not junior — they understand the feedback — but the patterns aren't changing. How do you address this?`,
    options: [
      {
        id: 'a',
        label: 'Have a direct 1:1 conversation: name the pattern, explain the impact, agree on specific standards, and set a checkpoint to review progress',
        explanation: 'Code review comments are for specific code — they\'re not the right tool for changing habitual patterns. A direct conversation is. Be specific: "I\'ve noticed that functions in your PRs tend to be very long — the last three averaged 80 lines. This slows down reviewers and makes debugging harder. I\'d like to agree on a guideline: functions over 30 lines should be a flag to extract." Then follow up. The goal is clarity, not criticism — the dev may not realise this is a pattern, or may not know how to improve.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Keep leaving review comments — they\'ll eventually absorb the feedback',
        explanation: 'If comments aren\'t changing the behaviour after 8 months, more comments won\'t either. Review comments are reactive and easy to dismiss. A direct conversation is the tool for pattern-level feedback.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Pair program with them to model the right approach in real time',
        explanation: 'Pairing is valuable and should be part of the plan, but alone it doesn\'t address the pattern. Pairing shows them the standard once — the 1:1 conversation ensures they understand why and commit to applying it in their independent work.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
