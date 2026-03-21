import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-pure-functions',
  title: 'Write a Testable Cart Module',
  description: 'Refactor a shopping cart implementation to be pure and testable — no global state, no side effects.',
  type: 'code',
  difficulty: 'mid',
  skills: ['testing', 'refactoring'],
  content: {
    overview: `Pure functions take all inputs as arguments and return new values without mutating anything. They're trivially testable — no setup, no teardown, no mocks. This is the same principle behind React state updates and Redux reducers.`,
    solution: `function addItem(cart, item) {
  const existing = cart.find(i => i.id === item.id)
  if (existing) {
    return cart.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
  }
  return [...cart, item]
}

function removeItem(cart, id) {
  return cart.filter(i => i.id !== id)
}

function total(cart) {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0)
}`,
    explanation: `Pure functions make testing trivial — same input always gives same output, no setup or teardown needed. The key shift here is from mutating a shared object to returning new state. \`[...cart, item]\` and \`cart.filter()\` create new arrays instead of modifying the original. This immutability is what makes the functions predictable and composable, and it's the same principle behind React state updates and Redux reducers.`,
    hints: [
      'Pure functions take all their inputs as arguments and return new values — never mutate the input.',
      'Instead of a class with `this.items`, use functions that take the current cart state and return a new one.',
      'Each function signature: `addItem(cart, item) => newCart`, `removeItem(cart, id) => newCart`, `total(cart) => number`.',
    ],
    starterCode: `// Implement these pure cart functions.
// cart is an array of { id, name, price, qty } objects.

function addItem(cart, item) {
  // add item or increase qty if id already exists
}

function removeItem(cart, id) {
  // remove item by id, return new cart
}

function total(cart) {
  // sum of price * qty for all items
}`,
    testCases: [
      {
        description: 'addItem adds a new item to the cart',
        explanation: 'Basic insertion — starting from an empty cart, one item should produce a cart of length 1.',
        testCode: `
const cart = addItem([], { id: 1, name: 'Book', price: 10, qty: 1 })
if (cart.length === 1 && cart[0].id === 1) { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify(cart)) }`,
      },
      {
        description: 'addItem increments qty for existing item',
        explanation: 'Adding the same item twice should merge into one entry with combined qty, not create a duplicate.',
        testCode: `
let cart = addItem([], { id: 1, name: 'Book', price: 10, qty: 1 })
cart = addItem(cart, { id: 1, name: 'Book', price: 10, qty: 1 })
if (cart.length === 1 && cart[0].qty === 2) { console.log("PASS") }
else { console.log("FAIL: qty=" + cart[0]?.qty + " len=" + cart.length) }`,
      },
      {
        description: 'removeItem removes item by id',
        explanation: 'Removes by id and leaves the rest intact — a common mistake is removing by index instead.',
        testCode: `
let cart = addItem([], { id: 1, name: 'Book', price: 10, qty: 1 })
cart = addItem(cart, { id: 2, name: 'Pen', price: 2, qty: 3 })
cart = removeItem(cart, 1)
if (cart.length === 1 && cart[0].id === 2) { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify(cart)) }`,
      },
      {
        description: 'total computes correct sum',
        explanation: 'Verifies price × qty accumulation across multiple items — must use reduce, not a simple sum of prices.',
        testCode: `
const cart = [{ id: 1, name: 'Book', price: 10, qty: 2 }, { id: 2, name: 'Pen', price: 3, qty: 3 }]
const t = total(cart)
if (t === 29) { console.log("PASS") } else { console.log("FAIL: expected 29, got " + t) }`,
      },
      {
        description: 'addItem does not mutate original cart',
        explanation: 'Purity check — the original array must be untouched. Using push() or splice() instead of spread would fail this.',
        testCode: `
const original = [{ id: 1, name: 'Book', price: 10, qty: 1 }]
const newCart = addItem(original, { id: 2, name: 'Pen', price: 2, qty: 1 })
if (original.length === 1 && newCart.length === 2) { console.log("PASS") }
else { console.log("FAIL: original was mutated") }`,
      },
    ],
  },
}
export default challenge
