import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'refactoring-deep-nesting',
  title: 'Flatten Deep Nesting with Early Returns',
  description: 'Refactor a deeply nested function that uses multiple levels of if/else into a flat structure using early returns.',
  type: 'code',
  difficulty: 'junior',
  skills: ['refactoring'],
  content: {
    overview: `Deep nesting (the "arrow anti-pattern") is hard to read because you need to track multiple conditions simultaneously to understand the happy path. Early returns (guard clauses) handle error/edge cases at the top and leave the main logic flat and unindented.`,
    starterCode: `// Refactor processPayment to use early returns instead of nested ifs.
// Return { error: string } for failures, { success: true, amount } on success.

function processPayment(user, cart, card) {
  if (user) {
    if (user.verified) {
      if (cart && cart.items && cart.items.length > 0) {
        if (card && card.valid) {
          return { success: true, amount: cart.total }
        } else {
          return { error: 'Invalid card' }
        }
      } else {
        return { error: 'Empty cart' }
      }
    } else {
      return { error: 'User not verified' }
    }
  } else {
    return { error: 'No user' }
  }
}`,
    solution: `function processPayment(user, cart, card) {
  if (!user) return { error: 'No user' }
  if (!user.verified) return { error: 'User not verified' }
  if (!cart || cart.items.length === 0) return { error: 'Cart is empty' }
  if (!card || !card.valid) return { error: 'Invalid card' }

  const total = cart.items.reduce((sum, item) => sum + item.price, 0)
  return { success: true, total }
}`,
    explanation: `Guard clauses invert the condition and return early, eliminating the need to nest. The rule: if a condition is a prerequisite, check it at the top and bail out. The happy path — the thing the function actually does — is now at the bottom, flat and readable. Each guard clause reads like a sentence: "if no user, error. if not verified, error." Martin Fowler calls this "Replace Nested Conditional with Guard Clauses."`,
    hints: [
      'Invert each condition: instead of `if (user) { ... }`, write `if (!user) return { error: ... }`.',
      'Handle all the guard cases first — each one returns early if a prerequisite fails.',
      'The actual business logic (calculate total, return success) goes at the end, unindented.',
    ],
    testCases: [
      {
        description: 'processes valid payment',
        explanation: 'When all conditions are met, must return { success: true, total }.',
        testCode: `
function processPayment(user, cart, card) {
  if (!user) return { error: 'No user' }
  if (!user.verified) return { error: 'User not verified' }
  if (!cart || cart.items.length === 0) return { error: 'Cart is empty' }
  if (!card || !card.valid) return { error: 'Invalid card' }
  const total = cart.items.reduce((sum, item) => sum + item.price, 0)
  return { success: true, total }
}
const result = processPayment({ verified: true }, { items: [{ price: 10 }, { price: 20 }] }, { valid: true })
if (result.success && result.total === 30) { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify(result)) }`,
      },
      {
        description: 'returns errors for each guard case',
        explanation: 'Each failing prerequisite must return the corresponding error immediately.',
        testCode: `
function processPayment(user, cart, card) {
  if (!user) return { error: 'No user' }
  if (!user.verified) return { error: 'User not verified' }
  if (!cart || cart.items.length === 0) return { error: 'Cart is empty' }
  if (!card || !card.valid) return { error: 'Invalid card' }
  const total = cart.items.reduce((sum, item) => sum + item.price, 0)
  return { success: true, total }
}
const r1 = processPayment(null, {}, {})
const r2 = processPayment({ verified: false }, { items: [{}] }, { valid: true })
const r3 = processPayment({ verified: true }, { items: [] }, { valid: true })
if (r1.error && r2.error && r3.error) { console.log("PASS") }
else { console.log("FAIL: " + [r1.error, r2.error, r3.error].join(', ')) }`,
      },
    ],
  },
}
export default challenge
