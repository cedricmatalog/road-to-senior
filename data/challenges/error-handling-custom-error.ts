import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'error-handling-custom-error',
  title: 'Create Custom Error Classes',
  description: 'Your API catches all errors the same way and returns 500 for everything. Create typed error classes so handlers can tell a bad request from a missing record.',
  type: 'code',
  difficulty: 'mid',
  skills: ['error-handling'],
  content: {
    overview: `Custom error classes let callers distinguish error types with \`instanceof\` — essential for handling "user input was bad" differently from "record not found" differently from "network failed." Much cleaner than checking error message strings.`,
    starterCode: `// Create a ValidationError class that extends Error with:
// - message (from Error)
// - field (which field failed)
// - name === 'ValidationError'

class ValidationError extends Error {
  constructor(message, field) {
    // your code here
  }
}`,
    solution: `class ValidationError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(resource + ' with id ' + id + ' not found')
    this.name = 'NotFoundError'
    this.resource = resource
    this.id = id
  }
}`,
    explanation: `Always call \`super(message)\` first — it sets \`this.message\` and \`this.stack\`. Then set \`this.name\` to override the default "Error" name in stack traces and \`error.toString()\`. Custom fields (like \`field\` on ValidationError) let callers extract structured data without parsing the message string. This is how Express error handlers, React error boundaries, and API clients distinguish what to retry vs. what to surface to the user.`,
    hints: [
      'Use `class ValidationError extends Error` — call `super(message)` first.',
      'Set `this.name = "ValidationError"` to override the default "Error" in stack traces.',
      'Add custom fields as instance properties: `this.field = field`.',
    ],
    testCases: [
      {
        description: 'ValidationError is instanceof both ValidationError and Error',
        explanation: 'Custom errors must be catchable as either their specific type or the base Error class.',
        testCode: `
class ValidationError extends Error {
  constructor(message, field) { super(message); this.name = 'ValidationError'; this.field = field }
}
const e = new ValidationError('Name is required', 'name')
if (e instanceof ValidationError && e instanceof Error && e.field === 'name' && e.message === 'Name is required') {
  console.log("PASS")
} else { console.log("FAIL") }`,
      },
      {
        description: 'NotFoundError includes resource and id',
        explanation: 'NotFoundError must carry structured context, not just a message string.',
        testCode: `
class NotFoundError extends Error {
  constructor(resource, id) { super(resource + ' with id ' + id + ' not found'); this.name = 'NotFoundError'; this.resource = resource; this.id = id }
}
const e = new NotFoundError('User', 42)
if (e instanceof NotFoundError && e.resource === 'User' && e.id === 42) { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify({ resource: e.resource, id: e.id })) }`,
      },
      {
        description: 'instanceof distinguishes error types in catch',
        explanation: 'The whole point — callers use instanceof to route to the right handler.',
        testCode: `
class ValidationError extends Error { constructor(m) { super(m); this.name = 'ValidationError' } }
class NotFoundError extends Error { constructor(m) { super(m); this.name = 'NotFoundError' } }
function handle(err) {
  if (err instanceof ValidationError) return 'validation'
  if (err instanceof NotFoundError) return 'notfound'
  return 'unknown'
}
if (handle(new ValidationError('bad')) === 'validation' && handle(new NotFoundError('missing')) === 'notfound') {
  console.log("PASS")
} else { console.log("FAIL") }`,
      },
    ],
  },
}
export default challenge
