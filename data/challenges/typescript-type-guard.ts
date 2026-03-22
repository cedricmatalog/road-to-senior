import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-type-guard',
  title: 'Write Type Guards',
  description: 'Your app receives JSON from an external API typed as `unknown`. Write type guards so TypeScript knows the shape before you use the data.',
  type: 'code',
  difficulty: 'mid',
  skills: ['typescript'],
  content: {
    overview: `Type guards are functions that return \`value is Type\` — they narrow the type inside an if-block. Essential for handling API responses typed as \`unknown\`, validating user input, or working with discriminated unions at runtime.`,
    starterCode: `// isString(value) returns true if value is a string.
// isApiResponse(value) returns true if value has a numeric status and string data.

function isString(value) {
  // your code here
}

function isApiResponse(value) {
  // your code here
}`,
    solution: `function isString(value) {
  return typeof value === 'string'
}

function isApiResponse(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof value.status === 'number' &&
    typeof value.data === 'string'
  )
}`,
    explanation: `Type guards bridge runtime checks and compile-time types. \`isApiResponse\` checks the shape of an unknown value — never assume an API response matches your type. Importantly, always check \`value !== null\` before accessing properties (\`typeof null === 'object'\` is a famous JavaScript footgun). The pattern is the same for any shape: check it's an object, not null, then check each expected property with typeof.`,
    hints: [
      'isString: just typeof value === "string".',
      'isApiResponse: check typeof value === "object" && value !== null first — then check each property.',
      'Check typeof value.status === "number" and typeof value.data === "string".',
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
        description: 'isApiResponse validates object shape',
        explanation: 'Must return true only for objects with a numeric status and string data — and not null.',
        testCode: `
function isApiResponse(value) {
  return typeof value === 'object' && value !== null &&
    typeof value.status === 'number' && typeof value.data === 'string'
}
const valid = { status: 200, data: 'ok' }
const invalid = { status: '200', data: 'ok' }
if (isApiResponse(valid) && !isApiResponse(invalid) && !isApiResponse(null)) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
      {
        description: 'isApiResponse rejects missing fields',
        explanation: 'Partial objects that are missing status or data should return false.',
        testCode: `
function isApiResponse(value) {
  return typeof value === 'object' && value !== null &&
    typeof value.status === 'number' && typeof value.data === 'string'
}
if (!isApiResponse({ status: 200 }) && !isApiResponse({ data: 'ok' }) && !isApiResponse({})) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
    ],
  },
}
export default challenge
