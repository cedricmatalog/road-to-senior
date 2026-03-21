import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'estimation-first-task',
  title: 'Estimating Your First Real Task',
  description: 'You\'re asked to estimate a small feature. You have no idea how long it will take. What do you do?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['estimation'],
  content: {
    overview: 'Good estimates start with breaking down the task into concrete subtasks. An estimate is not a commitment — it\'s your best guess given what you know right now.',
    situation: `It's your third week. A senior asks: "How long do you think the password reset flow will take you?" You've never built one before. You know there's a form, an email, and some token logic — but you have no idea what's involved. What do you say?`,
    options: [
      {
        id: 'a',
        label: '"Let me think through the pieces and get back to you in 15 minutes — I want to break it down before I guess."',
        explanation: 'This is the right move. A 15-minute breakdown turns a vague guess into a reasoned estimate. List the subtasks: form UI, API endpoint, token generation, email sending, token validation, error states. Estimate each. Sum them up. Add a buffer for things you haven\'t done before (token generation, email integration). Then share your breakdown with the senior — not just the number. They can correct your assumptions before you start, not after you\'ve spent twice as long as expected.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Say "2 days" without thinking it through — you don\'t want to seem like you don\'t know',
        explanation: 'A random number without a breakdown is a guess, not an estimate. When you miss it (and you will, high or low), you have no way to understand why. Worse, the senior has no way to help you calibrate. Juniors are expected to learn to estimate — admitting you need 15 minutes to think it through is the right answer.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: '"I have no idea — I\'ve never built this before" and wait for them to tell you',
        explanation: '"I don\'t know" without any attempt at breakdown is a missed learning opportunity. Even as a junior, you can break the feature into pieces and estimate each one. That process — and being wrong — is how you learn to estimate. The senior expects rough estimates with uncertainty, not silence.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
