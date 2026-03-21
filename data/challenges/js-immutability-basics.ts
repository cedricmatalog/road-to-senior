import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-immutability-basics',
  title: 'Update State Without Mutation',
  description: 'Transform objects and arrays without mutating the originals.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'Mutating objects directly causes bugs in React state, Redux reducers, and anywhere you need to compare old and new values. Spread syntax and array methods like map/filter return new references.',
    starterCode: `// updateUser(user, changes) should return a NEW object with changes applied.
// The original user object must not be modified.
// addTag(tags, newTag) should return a NEW array with newTag appended.
// removeTag(tags, tag) should return a NEW array without the given tag.

function updateUser(user, changes) {
  // your code here
}

function addTag(tags, newTag) {
  // your code here
}

function removeTag(tags, tag) {
  // your code here
}`,
    solution: `function updateUser(user, changes) {
  return { ...user, ...changes }
}

function addTag(tags, newTag) {
  return [...tags, newTag]
}

function removeTag(tags, tag) {
  return tags.filter(t => t !== tag)
}`,
    explanation: 'Object spread `{ ...user, ...changes }` creates a shallow copy with changes applied. Array spread `[...tags, newTag]` appends without mutation. filter always returns a new array. These patterns are the foundation of immutable state management.',
    testCases: [
      {
        description: 'updateUser returns new object with changes',
        testCode: `const user = { name: 'Alice', age: 25 }
const updated = updateUser(user, { age: 26 })
assert.strictEqual(updated.age, 26)
assert.strictEqual(user.age, 25)`,
      },
      {
        description: 'addTag returns new array with tag appended',
        testCode: `const tags = ['js', 'ts']
const result = addTag(tags, 'react')
assert.deepStrictEqual(result, ['js', 'ts', 'react'])
assert.strictEqual(tags.length, 2)`,
      },
      {
        description: 'removeTag returns new array without the tag',
        testCode: `const tags = ['js', 'ts', 'react']
const result = removeTag(tags, 'ts')
assert.deepStrictEqual(result, ['js', 'react'])`,
      },
    ],
  },
}
export default challenge
