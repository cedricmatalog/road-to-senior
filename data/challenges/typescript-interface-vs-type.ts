import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-interface-vs-type',
  title: 'Union Types and Type Aliases',
  description: 'A drawing tool needs to calculate the area of different shapes. Model each shape as a type and use a union so one function handles all of them.',
  type: 'code',
  difficulty: 'junior',
  skills: ['typescript'],
  content: {
    overview: 'A union type (`A | B`) means a value can be either type A or type B. Combined with a discriminant field — a literal like `kind: "circle"` — TypeScript can narrow the type inside an `if` branch, giving you autocomplete and a compile error if you forget a case. This pattern is used everywhere: API responses, event types, Redux actions.',
    starterCode: `// You're building a canvas drawing tool that supports circles and rectangles.
// The same getArea function needs to handle both.
//
// Define a Shape union type (Circle | Rectangle), each with a 'kind' field
// as a discriminant, then implement getArea(shape: Shape): number.

type Shape = any // replace with your union type

function getArea(shape: Shape): number {
  // your code here
  return 0
}`,
    solution: `type Circle = { kind: 'circle'; radius: number }
type Rectangle = { kind: 'rectangle'; width: number; height: number }
type Shape = Circle | Rectangle

function getArea(shape: Shape): number {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
  return shape.width * shape.height
}`,
    explanation: 'Define each variant as its own type with a literal `kind` field, then union them: `type Shape = Circle | Rectangle`. Inside `getArea`, checking `shape.kind === \'circle\'` narrows the type — TypeScript knows it\'s a Circle in that branch and a Rectangle in the else.',
    hints: [
      'Define each shape as its own type first: `type Circle = { kind: \'circle\'; radius: number }`',
      'The `Shape` union is `Circle | Rectangle`',
      'Inside `getArea`, check `shape.kind === \'circle\'` — TypeScript narrows the type automatically in that branch',
    ],
    testCases: [
      {
        description: 'calculates circle area',
        testCode: `const result = getArea({ kind: 'circle', radius: 5 })
assert.ok(Math.abs(result - Math.PI * 25) < 0.01, result + ' !== ' + Math.PI * 25)`,
      },
      {
        description: 'calculates rectangle area',
        testCode: `assert.strictEqual(getArea({ kind: 'rectangle', width: 4, height: 6 }), 24)`,
      },
      {
        description: 'handles zero-dimension rectangle',
        testCode: `assert.strictEqual(getArea({ kind: 'rectangle', width: 0, height: 5 }), 0)`,
      },
    ],
  },
}
export default challenge
