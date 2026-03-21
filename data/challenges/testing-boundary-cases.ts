import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-boundary-cases',
  title: 'Handle Edge Cases in a Validator',
  description: 'You\'re building a sign-up form. Implement `validateAge(age)` that guards against every bad input a real user — or attacker — might submit.',
  type: 'code',
  difficulty: 'junior',
  skills: ['testing', 'error-handling'],
  content: {
    overview: `User input is untrusted. A real sign-up form will receive negative numbers, floats, strings, NaN from a broken frontend, and Infinity from a crafted request. Boundaries — zero, negatives, floats, non-numbers — are where most validation bugs hide. This challenge flips the usual approach: the test cases tell you what edge cases you need to handle.`,
    starterCode: `// validateAge(age) returns { valid: true } or { valid: false, error: string }.
// Valid age: a finite number between 0 and 150 (inclusive).

function validateAge(age) {
  // your code here
}`,
    solution: `function validateAge(age) {
  if (typeof age !== 'number' || !Number.isFinite(age)) {
    return { valid: false, error: 'Age must be a number' }
  }
  if (!Number.isInteger(age)) {
    return { valid: false, error: 'Age must be an integer' }
  }
  if (age < 0) {
    return { valid: false, error: 'Age cannot be negative' }
  }
  if (age > 150) {
    return { valid: false, error: 'Age is unrealistically large' }
  }
  return { valid: true, error: null }
}`,
    explanation: `Input validation on a real form needs to handle what browsers and HTTP clients actually send. \`Number.isFinite\` catches NaN and Infinity — both have typeof "number", so a simple typeof check misses them. \`Number.isInteger\` catches floats from decimal inputs. The order matters: check type before using arithmetic on the value. Each error message should say *what's wrong*, not just "invalid" — both for users and for debugging bad API calls.`,
    hints: [
      'Check typeof first — strings, null, and undefined will slip through arithmetic comparisons.',
      'Number.isFinite() rejects NaN and Infinity. Number.isInteger() rejects floats.',
      'Consider: negative numbers, zero (valid!), floats like 25.5, very large numbers like 999.',
    ],
    testCases: [
      {
        description: 'accepts valid ages',
        explanation: 'Zero and typical ages must be valid.',
        testCode: `
function validateAge(age) {
  if (typeof age !== 'number' || !Number.isFinite(age)) return { valid: false, error: 'Age must be a number' }
  if (!Number.isInteger(age)) return { valid: false, error: 'Age must be an integer' }
  if (age < 0) return { valid: false, error: 'Age cannot be negative' }
  if (age > 150) return { valid: false, error: 'Age is unrealistically large' }
  return { valid: true, error: null }
}
if (validateAge(0).valid && validateAge(25).valid && validateAge(150).valid) { console.log("PASS") }
else { console.log("FAIL: 0=" + validateAge(0).valid + " 25=" + validateAge(25).valid + " 150=" + validateAge(150).valid) }`,
      },
      {
        description: 'rejects negative, float, and non-number inputs',
        explanation: 'Each invalid type must return valid: false with a message.',
        testCode: `
function validateAge(age) {
  if (typeof age !== 'number' || !Number.isFinite(age)) return { valid: false, error: 'Age must be a number' }
  if (!Number.isInteger(age)) return { valid: false, error: 'Age must be an integer' }
  if (age < 0) return { valid: false, error: 'Age cannot be negative' }
  if (age > 150) return { valid: false, error: 'Age is unrealistically large' }
  return { valid: true, error: null }
}
const cases = [
  validateAge(-1), validateAge(25.5), validateAge('25'), validateAge(NaN), validateAge(999)
]
if (cases.every(r => !r.valid && r.error)) { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify(cases)) }`,
      },
    ],
  },
}
export default challenge
