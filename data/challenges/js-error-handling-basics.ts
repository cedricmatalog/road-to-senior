import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-error-handling-basics',
  title: 'Safe JSON Parser',
  description: 'Write a function that parses JSON safely without throwing.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript', 'error-handling'],
  content: {
    overview: 'Functions that can fail should either return a result/error tuple or return a default value — never silently swallow errors. A safe wrapper around a throwing function is a common and useful pattern.',
    starterCode: `// Write safeParseJSON(str) that:
// - returns { ok: true, value: <parsed> } on success
// - returns { ok: false, error: <Error> } on failure
// Never throws.

function safeParseJSON(str) {
  // your code here
}`,
    solution: `function safeParseJSON(str) {
  try {
    return { ok: true, value: JSON.parse(str) }
  } catch (error) {
    return { ok: false, error }
  }
}`,
    explanation: 'The result object pattern (ok/value vs ok/error) is a clean alternative to throwing. Callers can check ok without needing try/catch, and the error is still available for logging. This mirrors Rust\'s Result type and Go\'s (value, err) returns.',
    testCases: [
      {
        description: 'returns ok:true with parsed value for valid JSON',
        testCode: `const result = safeParseJSON('{"name":"Alice"}')
assert.strictEqual(result.ok, true)
assert.deepStrictEqual(result.value, { name: 'Alice' })`,
      },
      {
        description: 'returns ok:false with error for invalid JSON',
        testCode: `const result = safeParseJSON('not json')
assert.strictEqual(result.ok, false)
assert.ok(result.error instanceof Error)`,
      },
      {
        description: 'never throws',
        testCode: `assert.doesNotThrow(() => safeParseJSON(undefined))`,
      },
    ],
  },
}
export default challenge
