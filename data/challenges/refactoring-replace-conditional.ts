import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'refactoring-replace-conditional',
  title: 'Replace Conditionals with a Lookup Table',
  description: 'Refactor a long if/else chain that maps status codes to messages into a cleaner data-driven approach.',
  type: 'code',
  difficulty: 'junior',
  skills: ['refactoring'],
  content: {
    overview: `Long if/else chains that map one value to another are a code smell — they're verbose, hard to extend, and obscure the data. A lookup object (or Map) replaces branching logic with a data structure. Adding a new case is one line, not three.`,
    starterCode: `// Replace the if/else chain with a lookup table.
// getStatusMessage(code) returns the message for the HTTP status code,
// or 'Unknown' for unrecognised codes.

function getStatusMessage(code) {
  if (code === 200) return 'OK'
  else if (code === 201) return 'Created'
  else if (code === 400) return 'Bad Request'
  else if (code === 401) return 'Unauthorized'
  else if (code === 403) return 'Forbidden'
  else if (code === 404) return 'Not Found'
  else if (code === 500) return 'Internal Server Error'
  else return 'Unknown'
}`,
    solution: `const STATUS_MESSAGES = {
  200: 'OK',
  201: 'Created',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
}

function getStatusMessage(code) {
  return STATUS_MESSAGES[code] ?? 'Unknown Status'
}`,
    explanation: `The lookup table separates data from logic — the object is data (what maps to what), \`getStatusMessage\` is logic (how to look up). This makes the code easier to read, extend (add a new status with one line), and test. The \`??\` (nullish coalescing) handles unknown codes gracefully. The same pattern applies to any "translate X to Y" branching — action handlers, error messages, display names for enum values.`,
    hints: [
      'Define the mappings as an object literal: `{ 200: "OK", 404: "Not Found", ... }`.',
      'The function body becomes a single line: look up the code in the object.',
      'Use `?? "Unknown Status"` to handle codes not in the table.',
    ],
    testCases: [
      {
        description: 'returns correct message for known codes',
        explanation: 'Each status code in the table must map to its correct message.',
        testCode: `
const STATUS_MESSAGES = { 200: 'OK', 201: 'Created', 400: 'Bad Request', 404: 'Not Found', 500: 'Internal Server Error' }
function getStatusMessage(code) { return STATUS_MESSAGES[code] ?? 'Unknown Status' }
if (getStatusMessage(200) === 'OK' && getStatusMessage(404) === 'Not Found' && getStatusMessage(500) === 'Internal Server Error') {
  console.log("PASS")
} else { console.log("FAIL") }`,
      },
      {
        description: 'returns Unknown Status for unrecognised codes',
        explanation: 'Codes not in the lookup table must return the fallback string.',
        testCode: `
const STATUS_MESSAGES = { 200: 'OK', 404: 'Not Found' }
function getStatusMessage(code) { return STATUS_MESSAGES[code] ?? 'Unknown Status' }
if (getStatusMessage(418) === 'Unknown Status' && getStatusMessage(999) === 'Unknown Status') { console.log("PASS") }
else { console.log("FAIL") }`,
      },
    ],
  },
}
export default challenge
