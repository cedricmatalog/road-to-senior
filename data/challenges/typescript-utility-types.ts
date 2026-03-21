import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-utility-types',
  title: 'Implement Readonly and Partial',
  description: 'Implement your own `MyReadonly<T>` and `MyPartial<T>` utility types using mapped types.',
  type: 'code',
  difficulty: 'senior',
  skills: ['typescript'],
  content: {
    overview: `Mapped types iterate over the keys of an object type and transform each property. Understanding them from scratch reveals how TypeScript's built-in utility types work — they're all just mapped types under the hood.`,
    starterCode: `// Implement makeReadonly(obj) — returns a frozen copy of obj.
// Implement makePartial(obj) — returns obj unchanged (it's a type-level transform).

function makeReadonly(obj) {
  // your code here
}

function makePartial(obj) {
  // your code here
}`,
    solution: `type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

type MyPartial<T> = {
  [K in keyof T]?: T[K]
}

// Runtime stubs (types only exist at compile time)
function makeReadonly(obj) { return Object.freeze(obj) }
function makePartial(obj) { return obj }`,
    explanation: `\`[K in keyof T]\` iterates every key of T. \`T[K]\` is the type of that property (a lookup type). Adding \`readonly\` makes properties immutable; adding \`?\` makes them optional. The same syntax with \`-readonly\` or \`-?\` removes those modifiers. All of TypeScript's utility types — \`Partial\`, \`Required\`, \`Readonly\`, \`Pick\`, \`Omit\` — are built from this single pattern.`,
    hints: [
      '`[K in keyof T]: T[K]` is the identity mapped type — it copies T exactly. Start here.',
      'Add `readonly` before `[K in keyof T]` to make all properties readonly.',
      'Add `?` after `[K in keyof T]` to make all properties optional.',
    ],
    testCases: [
      {
        description: 'makeReadonly freezes the object',
        explanation: 'The runtime implementation — Object.freeze prevents property mutation.',
        testCode: `
function makeReadonly(obj) { return Object.freeze(obj) }
const obj = makeReadonly({ x: 1 })
try { obj.x = 2 } catch(e) {}
if (obj.x === 1) { console.log("PASS") } else { console.log("FAIL: property was mutated") }`,
      },
      {
        description: 'makePartial returns the object unchanged',
        explanation: 'MyPartial is a type-level transformation only — at runtime the object passes through.',
        testCode: `
function makePartial(obj) { return obj }
const result = makePartial({ a: 1, b: 2 })
if (result.a === 1 && result.b === 2) { console.log("PASS") } else { console.log("FAIL") }`,
      },
    ],
  },
}
export default challenge
