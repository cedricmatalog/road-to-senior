import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'estimation-feature-scoping',
  title: 'Estimating Under Pressure',
  description: 'Your PM needs an estimate for a feature by end of day. You haven\'t scoped it yet. What do you do?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['estimation'],
  content: {
    overview: 'Estimation under pressure is a communication skill. A range with explicit assumptions is almost always better than refusing to estimate or fabricating false precision.',
    situation: `Your PM messages you at 10am: "How long will the new user notifications feature take? I need to tell the client by 3pm." You've seen the spec doc but haven't broken it down yet. The feature involves backend changes, a new UI component, email integration, and user preferences. You have no idea if there are hidden dependencies. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Give a rough range with explicit assumptions and unknowns, then offer a more precise estimate after a 30-minute breakdown',
        explanation: 'This is the senior move. A range like "3-7 days depending on the email provider integration complexity" is honest and actionable. State your assumptions explicitly — "this assumes the API design is already agreed, no backend auth changes needed." Then offer to sharpen the estimate after a quick breakdown. This builds trust because you\'re transparent about uncertainty rather than fabricating false precision.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Give a confident "2 weeks" estimate to give yourself buffer',
        explanation: 'Padding without basis is just guessing with extra steps. It also erodes trust when the feature ships in 4 days and you said 2 weeks. Buffer should come from explicitly identified risks, not arbitrary multiplication.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Tell the PM you can\'t estimate until you\'ve fully scoped the feature, and ask for more time',
        explanation: 'Technically correct but unhelpful. The PM has a real deadline. A rough range with caveats is almost always possible and far more useful than a refusal. Reserve "I can\'t estimate this" for genuinely unknown-unknown situations.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
