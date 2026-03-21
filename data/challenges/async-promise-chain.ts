import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-promise-chain',
  title: 'Fix a Broken Promise Chain',
  description: 'A promise chain is silently swallowing errors. Identify and fix the bug.',
  type: 'code',
  difficulty: 'junior',
  skills: ['async-js', 'error-handling'],
  content: {
    overview: `A \`.catch()\` handler that doesn't re-throw silently swallows errors — the promise resolves with \`undefined\` instead of rejecting. This is one of the most common Promise bugs in production code.`,
    solution: `function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(data => data.user)
    .catch(err => { throw err })
}`,
    explanation: `The bug is in the \`.catch()\` handler. Any value returned from \`.catch()\` resolves the promise — so \`console.log(err)\` returns \`undefined\`, and the chain resolves with \`undefined\` instead of rejecting. The fix is to re-throw inside catch (\`throw err\`) or remove it entirely. This is one of the most common Promise footguns: a \`.catch()\` that silently swallows errors by not re-throwing.`,
    hints: [
      'Look at the `.catch()` — what does it return? Any value returned from `.catch()` resolves the promise.',
      'The fix is one character: remove the `.catch()` entirely, or re-throw inside it.',
      'To re-throw: `.catch(err => { throw err })`',
    ],
    starterCode: `function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(data => data.user)
    .catch(err => console.log(err))
}`,
    testCases: [
      {
        description: 'returns the user object on success',
        explanation: 'The happy path — verifies the chain resolves to the user object from the JSON response.',
        testCode: `
const mockFetch = () => Promise.resolve({ json: () => Promise.resolve({ user: { id: 1 } }) })
global.fetch = mockFetch
fetchUser(1).then(user => {
  if (user && user.id === 1) { console.log("PASS") } else { console.log("FAIL: expected user object") }
})`,
      },
      {
        description: 'rejects (does not swallow) on network error',
        explanation: 'The core bug: if your .catch() returns instead of re-throwing, this resolves with undefined instead of rejecting.',
        testCode: `
global.fetch = () => Promise.reject(new Error('network error'))
fetchUser(1).then(() => {
  console.log("FAIL: should have rejected")
}).catch(err => {
  if (err.message === 'network error') { console.log("PASS") } else { console.log("FAIL: wrong error") }
})`,
      },
    ],
  },
}
export default challenge
