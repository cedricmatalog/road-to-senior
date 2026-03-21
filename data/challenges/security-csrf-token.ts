import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-csrf-token',
  title: 'Implement CSRF Token Validation',
  description: 'Implement `validateRequest(req)` — checks that state-changing requests include a valid CSRF token matching the session.',
  type: 'code',
  difficulty: 'mid',
  skills: ['security'],
  content: {
    overview: `CSRF attacks trick a logged-in user's browser into making requests to your API. The defence: require a secret token known only to your frontend (not readable by third-party sites due to CORS). The token is included in form/API requests and validated server-side.`,
    starterCode: `// validateRequest(req, session) returns true if the request is safe.
// GET/HEAD/OPTIONS are always safe. Other methods must have a
// req.headers['x-csrf-token'] matching session.csrfToken.

function validateRequest(req, session) {
  // your code here
}`,
    solution: `function validateRequest(req, session) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']
  if (safeMethods.includes(req.method)) return true
  const token = req.headers['x-csrf-token'] || req.body?.csrfToken
  if (!token) return false
  return token === session.csrfToken
}`,
    explanation: `GET/HEAD/OPTIONS are safe methods — they shouldn't change state so they don't need CSRF protection. POST/PUT/DELETE/PATCH must carry the token. The token can come from a custom header (preferred for AJAX) or a hidden form field. Comparing to the session's token is the validation — if they match, the request came from your own frontend (which has access to the token), not a third-party page. Use \`crypto.timingSafeEqual\` in production to prevent timing attacks.`,
    hints: [
      'Skip validation for safe methods (GET, HEAD, OPTIONS) — return true.',
      'Extract the token from the request header or body.',
      'Compare it to the session\'s stored token — if missing or mismatched, return false.',
    ],
    testCases: [
      {
        description: 'allows GET requests without token',
        explanation: 'GET is a safe method — no CSRF token required.',
        testCode: `
function validateRequest(req, session) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']
  if (safeMethods.includes(req.method)) return true
  const token = req.headers?.['x-csrf-token'] || req.body?.csrfToken
  if (!token) return false
  return token === session.csrfToken
}
const session = { csrfToken: 'secret123' }
if (validateRequest({ method: 'GET', headers: {} }, session)) { console.log("PASS") }
else { console.log("FAIL: GET should be allowed") }`,
      },
      {
        description: 'rejects POST without token',
        explanation: 'POST without a CSRF token is a potential attack — must return false.',
        testCode: `
function validateRequest(req, session) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']
  if (safeMethods.includes(req.method)) return true
  const token = req.headers?.['x-csrf-token'] || req.body?.csrfToken
  if (!token) return false
  return token === session.csrfToken
}
const session = { csrfToken: 'secret123' }
if (!validateRequest({ method: 'POST', headers: {} }, session)) { console.log("PASS") }
else { console.log("FAIL: POST without token should be rejected") }`,
      },
      {
        description: 'allows POST with valid token',
        explanation: 'POST with matching token must be allowed.',
        testCode: `
function validateRequest(req, session) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS']
  if (safeMethods.includes(req.method)) return true
  const token = req.headers?.['x-csrf-token'] || req.body?.csrfToken
  if (!token) return false
  return token === session.csrfToken
}
const session = { csrfToken: 'secret123' }
const req = { method: 'POST', headers: { 'x-csrf-token': 'secret123' } }
if (validateRequest(req, session)) { console.log("PASS") }
else { console.log("FAIL: valid token should be accepted") }`,
      },
    ],
  },
}
export default challenge
