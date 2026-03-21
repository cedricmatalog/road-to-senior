import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-reading-errors',
  title: 'Reading Stack Traces',
  description: 'Your app throws an error. How do you read the stack trace to find the bug?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging'],
  content: {
    overview: 'Stack traces tell you exactly where something went wrong and the chain of calls that led there. Reading them top-to-bottom is the fastest path to any bug.',
    situation: `Your Node.js app crashes with this error:\n\nTypeError: Cannot read properties of undefined (reading 'email')\n    at formatUser (utils/format.js:12:24)\n    at /routes/users.js:34:18\n    at Layer.handle (express/router/layer.js:95:5)\n\nYou've never seen this file structure before. Where do you look first?`,
    options: [
      {
        id: 'a',
        label: 'Open utils/format.js line 12 — that\'s where the error originates — and check what value is being passed in',
        explanation: 'The first line of your own code in the stack trace is always where the bug is. The Express router lines below it are framework internals — ignore them. Line 12 of format.js tried to access .email on something undefined. Your next question is: what gets passed to formatUser? Look at routes/users.js line 34 — that\'s the call site. Either it\'s passing undefined, or the argument doesn\'t have an email property. Add a console.log before the call to see what you\'re working with.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Search online for "TypeError: Cannot read properties of undefined" to understand what the error means',
        explanation: 'Googling a generic error message wastes time — this error is extremely common and the generic explanation won\'t help you find your specific bug. The stack trace already tells you exactly where to look. Use the internet for explaining error types you\'ve never seen before, not for finding bugs you can locate directly.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a try/catch around the whole route handler to prevent the crash',
        explanation: 'Catching the error without fixing it is worse — you\'ve hidden a real bug. The crash is telling you something is undefined that shouldn\'t be. Fix the root cause: figure out why the data is undefined and handle it properly (validate the input, return early, or provide a default).',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
