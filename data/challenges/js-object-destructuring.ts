import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-object-destructuring',
  title: 'Destructuring and Defaults',
  description: 'Extract values from nested objects with fallback defaults.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'Destructuring with defaults makes function arguments self-documenting and prevents "cannot read property of undefined" errors. It\'s one of the most-used ES6 patterns.',
    starterCode: `// Extract user display info from a user object.
// Return { name, email, role } where role defaults to 'viewer'
// if not present. Handle missing user gracefully (return null).

function getUserInfo(user) {
  // your code here
}`,
    solution: `function getUserInfo(user) {
  if (!user) return null
  const { name, email, role = 'viewer' } = user
  return { name, email, role }
}`,
    explanation: 'Destructuring with a default (role = \'viewer\') is cleaner than role || \'viewer\' because it only applies when the value is undefined, not when it\'s 0 or false. Always guard against null/undefined inputs at the function boundary.',
    testCases: [
      {
        description: 'extracts name, email, and role',
        testCode: `const result = getUserInfo({ name: 'Alice', email: 'a@x.com', role: 'admin' })
assert.deepStrictEqual(result, { name: 'Alice', email: 'a@x.com', role: 'admin' })`,
      },
      {
        description: 'defaults role to viewer when missing',
        testCode: `const result = getUserInfo({ name: 'Bob', email: 'b@x.com' })
assert.deepStrictEqual(result, { name: 'Bob', email: 'b@x.com', role: 'viewer' })`,
      },
      {
        description: 'returns null for null input',
        testCode: `assert.strictEqual(getUserInfo(null), null)`,
      },
    ],
  },
}
export default challenge
