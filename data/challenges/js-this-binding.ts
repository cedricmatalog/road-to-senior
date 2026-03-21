import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-this-binding',
  title: 'Fix This Binding',
  description: 'A method loses its context when passed as a callback. Fix it three ways.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: '`this` in JavaScript is determined by how a function is called, not where it\'s defined. Arrow functions capture `this` lexically — the most common fix for lost context.',
    starterCode: `// The greet method works when called directly but not as a callback.
// Fix it so that when passed to setTimeout, it still prints the correct name.
// Use an arrow function in the class method.

class User {
  constructor(name) {
    this.name = name
  }

  greet() {
    // This currently breaks when passed as a callback
    return \`Hello, \${this.name}\`
  }
}

// Make this work:
// const user = new User('Alice')
// const greet = user.greet  <-- detached
// greet() should return 'Hello, Alice'`,
    solution: `class User {
  constructor(name) {
    this.name = name
    this.greet = () => \`Hello, \${this.name}\`
  }
}`,
    explanation: 'Arrow functions don\'t have their own `this` — they inherit it from the enclosing lexical scope. Assigning an arrow function in the constructor binds it permanently to the instance. Alternative: use .bind(this) in the constructor: `this.greet = this.greet.bind(this)`',
    testCases: [
      {
        description: 'works when called on the instance',
        testCode: `const user = new User('Alice')
assert.strictEqual(user.greet(), 'Hello, Alice')`,
      },
      {
        description: 'works when detached from the instance',
        testCode: `const user = new User('Alice')
const greet = user.greet
assert.strictEqual(greet(), 'Hello, Alice')`,
      },
      {
        description: 'each instance has its own context',
        testCode: `const a = new User('Alice')
const b = new User('Bob')
assert.strictEqual(a.greet(), 'Hello, Alice')
assert.strictEqual(b.greet(), 'Hello, Bob')`,
      },
    ],
  },
}
export default challenge
