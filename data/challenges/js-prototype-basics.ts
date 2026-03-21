import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-prototype-basics',
  title: 'Implement a Simple Linked List',
  description: 'Build a linked list — the same pointer-based structure used inside browser history, undo stacks, and task queues.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'Linked lists show up in real systems more than you\'d expect: browser history (each page links to the previous), undo/redo stacks, LRU caches, and scheduler queues. Implementing one teaches you class syntax, prototype methods, and pointer-based thinking — the same mental model you need to understand trees and other linked structures.',
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
    hints: [
      'Each node needs a value and a next property. Set next to null in the constructor.',
      'append: walk to the last node by following .next until current.next is null, then set current.next = new LinkedList(value).',
      'toArray: start at this, push current.value, move to current.next — repeat until current is null.',
    ],
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
