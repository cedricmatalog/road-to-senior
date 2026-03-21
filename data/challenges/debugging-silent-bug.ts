import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-silent-bug',
  title: 'Debug a Silent Failure',
  description: "A function returns undefined instead of the expected result, but throws no error. What's your debugging approach?",
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging'],
  content: {
    situation: `You're debugging a function called \`getActiveUsers()\` that should return an array. Callers are getting \`undefined\` instead. The function calls \`fetch()\`, parses JSON, and filters the result. No errors appear in the console. What do you do first?`,
    options: [
      {
        id: 'a',
        label: 'Add console.log at each step of the function to trace where undefined appears',
        explanation: "Good instinct and often the fastest path. Adding strategic logs at the fetch response, JSON parse, and filter step quickly narrows down where undefined enters. In production you'd use a debugger, but for quick investigation this is perfectly valid.",
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Rewrite the function from scratch since something must be fundamentally wrong',
        explanation: "Never rewrite before you understand the bug. You'll likely reproduce the same bug. Always diagnose before fixing.",
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Check if the function has a missing return statement',
        explanation: "A missing return is a plausible cause, but checking it first without evidence is guessing. You might get lucky, but systematic logging is more reliable for any non-obvious bug.",
        isRecommended: false,
      },
    ],
  },
}
export default challenge
