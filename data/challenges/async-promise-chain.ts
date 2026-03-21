import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-promise-chain',
  title: 'Fix a Broken Promise Chain',
  description: 'A promise chain is silently swallowing errors. Identify and fix the bug.',
  type: 'code',
  difficulty: 'junior',
  skills: ['async-js', 'error-handling'],
  content: {
    starterCode: `function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(data => data.user)
    .catch(err => console.log(err))
}`,
    testCases: [
      {
        description: 'returns the user object on success',
        testCode: `
const mockFetch = () => Promise.resolve({ json: () => Promise.resolve({ user: { id: 1 } }) })
global.fetch = mockFetch
fetchUser(1).then(user => {
  if (user && user.id === 1) { console.log("PASS") } else { console.log("FAIL: expected user object") }
})`,
      },
      {
        description: 'rejects (does not swallow) on network error',
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
