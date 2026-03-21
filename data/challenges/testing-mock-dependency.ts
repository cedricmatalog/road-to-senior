import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-mock-dependency',
  title: 'Test with a Stub Dependency',
  description: 'Refactor `sendWelcomeEmail` to accept its email-sending dependency as a parameter, then write tests that stub it.',
  type: 'code',
  difficulty: 'mid',
  skills: ['testing'],
  content: {
    overview: `Dependency injection makes functions testable without hitting real infrastructure. Instead of calling a real email service, the function accepts the sender as an argument — in tests you pass a fake, in production you pass the real one.`,
    starterCode: `// sendWelcomeEmail(user, emailService) sends a welcome email via emailService.
// Returns false if user has no email. Returns true on success.
// emailService.send({ to, subject, body }) is the injected dependency.

function sendWelcomeEmail(user, emailService) {
  // your code here
}`,
    solution: `function sendWelcomeEmail(user, emailService) {
  if (!user.email) return false
  emailService.send({
    to: user.email,
    subject: 'Welcome!',
    body: 'Hello ' + user.name,
  })
  return true
}`,
    explanation: `By accepting \`emailService\` as a parameter rather than importing it directly, the function becomes testable without any mocking library. Tests pass a simple stub object \`{ send: () => {} }\` — they can track calls, verify arguments, or simulate failures. This is "constructor injection" or "argument injection" — the simplest form of dependency injection, no framework needed.`,
    hints: [
      'Move the email service from a hardcoded import to a parameter.',
      'Call emailService.send() with the email data object.',
      'Return false early if the user has no email address.',
    ],
    testCases: [
      {
        description: 'calls emailService.send with correct data',
        explanation: 'The stub must receive { to, subject, body } with the user\'s email and name.',
        testCode: `
function sendWelcomeEmail(user, emailService) {
  if (!user.email) return false
  emailService.send({ to: user.email, subject: 'Welcome!', body: 'Hello ' + user.name })
  return true
}
let sent = null
const stub = { send: (data) => { sent = data } }
sendWelcomeEmail({ name: 'Alice', email: 'alice@example.com' }, stub)
if (sent && sent.to === 'alice@example.com' && sent.body === 'Hello Alice') { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify(sent)) }`,
      },
      {
        description: 'returns false and skips send for user with no email',
        explanation: 'Guard against missing email — send must not be called and function returns false.',
        testCode: `
function sendWelcomeEmail(user, emailService) {
  if (!user.email) return false
  emailService.send({ to: user.email, subject: 'Welcome!', body: 'Hello ' + user.name })
  return true
}
let called = false
const stub = { send: () => { called = true } }
const result = sendWelcomeEmail({ name: 'Bob' }, stub)
if (!called && result === false) { console.log("PASS") }
else { console.log("FAIL: called=" + called + " result=" + result) }`,
      },
    ],
  },
}
export default challenge
