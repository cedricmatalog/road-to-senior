import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-promises-basics',
  title: 'Fetch and Transform Data',
  description: 'Write an async function that fetches data and transforms it before returning.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript', 'async-js'],
  content: {
    overview: 'async/await is syntactic sugar over Promises. Understanding when to use try/catch and how to chain async transforms is fundamental to any JavaScript backend or frontend work.',
    starterCode: `// fetchUser(id) returns a Promise that resolves to { id, name, age }
// Write getAdultUserName(id) that:
// - fetches the user
// - returns the name if age >= 18
// - returns null if age < 18
// - returns null if the fetch throws

async function getAdultUserName(id, fetchUser) {
  // your code here
}`,
    solution: `async function getAdultUserName(id, fetchUser) {
  try {
    const user = await fetchUser(id)
    return user.age >= 18 ? user.name : null
  } catch {
    return null
  }
}`,
    hints: [
      'Use try/catch around the await call to handle fetch failures.',
      'await fetchUser(id) gives you the user object — then check user.age.',
      'Return user.name if age >= 18, null otherwise. Return null in the catch block too.',
    ],
    explanation: 'try/catch around await is the standard error handling pattern for async functions. Return null on error rather than letting the exception propagate — unless the caller needs to know about the failure, in which case re-throw.',
    testCases: [
      {
        description: 'returns name for adult user',
        testCode: `const fetchUser = async (id) => ({ id, name: 'Alice', age: 25 })
const result = await getAdultUserName(1, fetchUser)
assert.strictEqual(result, 'Alice')`,
      },
      {
        description: 'returns null for minor',
        testCode: `const fetchUser = async (id) => ({ id, name: 'Bob', age: 16 })
const result = await getAdultUserName(1, fetchUser)
assert.strictEqual(result, null)`,
      },
      {
        description: 'returns null when fetch throws',
        testCode: `const fetchUser = async () => { throw new Error('Network error') }
const result = await getAdultUserName(1, fetchUser)
assert.strictEqual(result, null)`,
      },
    ],
  },
}
export default challenge
