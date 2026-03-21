import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'refactoring-extract-function',
  title: 'Refactor: Extract and Simplify',
  description: 'Refactor a tangled order-processing function into smaller, well-named pure functions without changing its behavior.',
  type: 'code',
  difficulty: 'mid',
  skills: ['refactoring', 'testing'],
  content: {
    overview: `Extract Function is the most-used refactoring: if you need a comment to explain what a block does, that block should be a named function. The goal is for \`processOrder\` to read like a sentence describing intent, not implementation details.`,
    solution: `function calcSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

function applyDiscount(subtotal, discountCode) {
  const rates = { SAVE10: 0.10, SAVE20: 0.20 }
  return subtotal * (1 - (rates[discountCode] ?? 0))
}

function formatTotal(total) {
  return 'Order total: $' + total.toFixed(2)
}

function processOrder(items, discountCode) {
  return formatTotal(applyDiscount(calcSubtotal(items), discountCode))
}`,
    explanation: `Extract Function is the most-used refactoring. The rule: if you need a comment to explain what a block of code does, that block should be a named function. Each extracted function here has a single responsibility — calculate, discount, format — making the main function read like a specification. Pure helper functions are also independently testable. The result: \`processOrder\` becomes five words that describe intent, not implementation.`,
    hints: [
      'Identify the three distinct concerns: calculating item totals, applying a discount, and formatting the output. Extract each into its own function.',
      'Each extracted function should be pure — same input always gives same output, no side effects.',
      'The main `processOrder` function should just orchestrate the three helpers. Aim for it to fit in 5 lines.',
    ],
    starterCode: `// Refactor this without breaking the tests.
// Extract at least 3 helper functions from processOrder.

function processOrder(items, discountCode) {
  let subtotal = 0
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].qty
  }
  let discount = 0
  if (discountCode === 'SAVE10') discount = subtotal * 0.10
  else if (discountCode === 'SAVE20') discount = subtotal * 0.20
  const total = subtotal - discount
  return 'Order total: $' + total.toFixed(2)
}`,
    testCases: [
      {
        description: 'returns correct total without discount',
        explanation: 'Baseline — verifies the refactored functions still produce the correct output for the no-discount case.',
        testCode: `
const result = processOrder([{ price: 10, qty: 2 }, { price: 5, qty: 4 }], null)
if (result === 'Order total: $40.00') { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'applies SAVE10 discount',
        explanation: 'Verifies the discount logic is correct after extraction — 10% off $100 = $90.',
        testCode: `
const result = processOrder([{ price: 100, qty: 1 }], 'SAVE10')
if (result === 'Order total: $90.00') { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'applies SAVE20 discount',
        explanation: 'Verifies the second discount tier — 20% off $100 = $80.',
        testCode: `
const result = processOrder([{ price: 50, qty: 2 }], 'SAVE20')
if (result === 'Order total: $80.00') { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'handles empty cart',
        explanation: 'Edge case — reduce on an empty array with initial value 0 must produce $0.00, not undefined or an error.',
        testCode: `
const result = processOrder([], null)
if (result === 'Order total: $0.00') { console.log("PASS") } else { console.log("FAIL: got " + result) }`,
      },
    ],
  },
}
export default challenge
