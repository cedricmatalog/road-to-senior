import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-type-guard',
  title: 'Write Type Guards',
  description: 'Implement type guard functions that let TypeScript narrow unknown API responses to known types.',
  type: 'code',
  difficulty: 'mid',
  skills: ['typescript'],
  content: {
    overview: `Type guards are functions that return \`value is Type\` — they narrow the type inside an if-block. Essential for handling API responses typed as \`unknown\`, validating user input, or working with discriminated unions at runtime.`,
    solution: `function isString(value) {
  return typeof value === 'string'
}

function isUser(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.id === 'number' &&
    typeof value.name === 'string'
  )
}

function isArrayOf(arr, guard) {
  return Array.isArray(arr) && arr.every(guard)
}`,
    explanation: `Type guards bridge runtime checks and compile-time types. \`isUser\` checks the shape of an unknown value — never assume an API response matches your type. Importantly, always check \`value !== null\` before accessing properties (\`typeof null === 'object'\` is a famous JavaScript footgun). \`isArrayOf\` is a higher-order guard — it applies a guard to every element, useful for typed arrays from API responses.`,
    hints: [
      'isString: just typeof value === "string".',
      'isUser: check typeof value === "object", value !== null, then check each expected property with typeof.',
      'isArrayOf: Array.isArray() first, then arr.every(item => guard(item)).',
    ],
    testCases: [
      {
        description: 'isString correctly identifies strings',
        explanation: 'Must return true for strings, false for numbers/null/objects.',
        testCode: `
function isString(value) { return typeof value === 'string' }
if (isString('hello') && !isString(42) && !isString(null)) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
      {
        description: 'isUser validates object shape',
        explanation: 'Must return true only for objects with numeric id and string name — and not null.',
        testCode: `
function isUser(value) {
  return typeof value === 'object' && value !== null &&
    typeof value.id === 'number' && typeof value.name === 'string'
}
const valid = { id: 1, name: 'Alice' }
const invalid = { id: '1', name: 'Alice' }
if (isUser(valid) && !isUser(invalid) && !isUser(null)) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
      {
        description: 'isArrayOf validates every element',
        explanation: 'Returns true only if every element passes the guard — false if any element fails.',
        testCode: `
function isString(value) { return typeof value === 'string' }
function isArrayOf(arr, guard) { return Array.isArray(arr) && arr.every(guard) }
if (isArrayOf(['a', 'b'], isString) && !isArrayOf(['a', 1], isString)) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
    ],
  },
}
export default challenge
