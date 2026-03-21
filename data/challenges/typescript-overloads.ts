import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-overloads',
  title: 'Format a Value with Overloads',
  description: 'Implement `format(value)` that formats numbers as currency and strings as title case — with correct return types for each input type.',
  type: 'code',
  difficulty: 'senior',
  skills: ['typescript'],
  content: {
    overview: `Function overloads let you express that a function returns different types based on what it receives. Without them, TypeScript infers a union return type — forcing callers to narrow every time they use the result. Overloads make the caller's life easier at the cost of more type declarations.`,
    solution: `function format(value) {
  if (typeof value === 'number') {
    return '$' + value.toFixed(2)
  }
  return value.replace(/\\b\\w/g, c => c.toUpperCase())
}`,
    explanation: `The runtime implementation uses a simple \`typeof\` check. The TypeScript overload signatures sit above it (in real TS code) — each signature pairs an input type with a specific return type, so \`format(42)\` is typed as \`string\` and callers don't need to narrow. The implementation signature (\`(value: number | string): string\`) is not callable from outside — only the overload signatures are. This is a design tool to express richer type relationships than a union allows.`,
    hints: [
      'For numbers: use toFixed(2) and prepend "$".',
      'For strings: title case means capitalising the first letter of each word — use replace with a regex.',
      '`/\\b\\w/g` matches the first character of each word.',
    ],
    testCases: [
      {
        description: 'formats numbers as currency',
        explanation: 'Numbers must be formatted as $X.XX with two decimal places.',
        testCode: `
function format(value) {
  if (typeof value === 'number') return '$' + value.toFixed(2)
  return value.replace(/\\b\\w/g, c => c.toUpperCase())
}
if (format(9.5) === '$9.50' && format(100) === '$100.00') { console.log("PASS") }
else { console.log("FAIL: " + format(9.5) + ", " + format(100)) }`,
      },
      {
        description: 'formats strings as title case',
        explanation: 'Each word\'s first letter must be capitalised.',
        testCode: `
function format(value) {
  if (typeof value === 'number') return '$' + value.toFixed(2)
  return value.replace(/\\b\\w/g, c => c.toUpperCase())
}
if (format('hello world') === 'Hello World') { console.log("PASS") }
else { console.log("FAIL: got " + format('hello world')) }`,
      },
    ],
  },
}
export default challenge
