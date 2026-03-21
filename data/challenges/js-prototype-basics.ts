import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-prototype-basics',
  title: 'Implement a Simple Linked List',
  description: 'Build a linked list node class with append and toArray methods.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'Linked lists are rarely used in JavaScript directly, but implementing one teaches you class syntax, prototype methods, and pointer-based thinking. These patterns appear in trees, queues, and LRU caches.',
    starterCode: `// Implement a LinkedList class with:
// - constructor(value) — creates a node with the value
// - append(value) — adds a node to the end of the list
// - toArray() — returns all values as an array, in order

class LinkedList {
  // your code here
}`,
    solution: `class LinkedList {
  constructor(value) {
    this.value = value
    this.next = null
  }

  append(value) {
    let current = this
    while (current.next) {
      current = current.next
    }
    current.next = new LinkedList(value)
    return this
  }

  toArray() {
    const result = []
    let current = this
    while (current) {
      result.push(current.value)
      current = current.next
    }
    return result
  }
}`,
    explanation: 'append walks to the tail by following .next pointers. toArray does the same to collect values. The key pattern: `let current = this; while (current.next) { current = current.next }` — this is how you traverse any linked structure.',
    testCases: [
      {
        description: 'creates a list with one value',
        testCode: `const list = new LinkedList(1)
assert.deepStrictEqual(list.toArray(), [1])`,
      },
      {
        description: 'appends values in order',
        testCode: `const list = new LinkedList(1)
list.append(2).append(3)
assert.deepStrictEqual(list.toArray(), [1, 2, 3])`,
      },
      {
        description: 'appending to an empty list',
        testCode: `const list = new LinkedList(5)
list.append(10)
assert.strictEqual(list.toArray().length, 2)`,
      },
    ],
  },
}
export default challenge
