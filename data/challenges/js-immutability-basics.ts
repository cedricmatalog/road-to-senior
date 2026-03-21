import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-immutability-basics',
  title: 'Update State Without Mutation',
  description: 'A React component isn\'t re-rendering after state updates. The cause: the state object is being mutated directly instead of replaced.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'Directly mutating an object or array is one of the most common React bugs: `user.name = "Alice"` doesn\'t trigger a re-render because the reference hasn\'t changed. React, Redux, and any system that tracks changes by reference comparison requires you to return new objects and arrays. Spread syntax and array methods like `filter` and `map` always return new references without touching the original.',
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
    hints: [
      'updateUser: use object spread — { ...user, ...changes } creates a new object with all original properties plus the changes applied on top.',
      'addTag: use array spread — [...tags, newTag] returns a new array without touching the original.',
      'removeTag: .filter() always returns a new array. Filter out the tag you want to remove.',
    ],
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
