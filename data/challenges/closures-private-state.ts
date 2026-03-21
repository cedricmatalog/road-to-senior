import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-private-state',
  title: 'Private State with Closures',
  description: 'Implement a bank account object where the balance can only be changed through deposit and withdraw — it cannot be accessed or set directly.',
  type: 'code',
  difficulty: 'mid',
  skills: ['closures-scope', 'architecture'],
  content: {
    overview: `Before private class fields existed, closures were the only way to create truly private state in JavaScript. The key: define the variable inside the factory function's scope — it's inaccessible from outside but visible to the returned methods.`,
    starterCode: `// createAccount(initialBalance) returns an object with:
// - deposit(amount) — adds to balance
// - withdraw(amount) — subtracts from balance (no overdraft)
// - getBalance() — returns current balance
// Balance must not be directly accessible.

function createAccount(initialBalance) {
  // your code here
}`,
    solution: `function createAccount(initialBalance) {
  let balance = initialBalance
  return {
    deposit(amount) {
      if (amount > 0) balance += amount
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) balance -= amount
    },
    getBalance() {
      return balance
    },
  }
}`,
    explanation: `\`balance\` lives in \`createAccount\`'s scope — it cannot be read or written from outside. Only the three returned methods can touch it. This is true encapsulation: not just "please don't touch this" (convention), but "you literally cannot touch this" (enforcement). The pattern is especially useful for financial state, authentication tokens, or any value that must only change via controlled operations.`,
    hints: [
      'Declare `balance` inside `createAccount`, not on the returned object.',
      'The returned methods close over `balance` — they can read and write it even after `createAccount` returns.',
      'Add guards: deposit should reject negative amounts, withdraw should reject overdrafts.',
    ],
    testCases: [
      {
        description: 'deposit increases balance',
        explanation: 'deposit() must update the internal balance, readable via getBalance().',
        testCode: `
const acc = createAccount(100)
acc.deposit(50)
if (acc.getBalance() === 150) { console.log("PASS") } else { console.log("FAIL: " + acc.getBalance()) }`,
      },
      {
        description: 'withdraw decreases balance',
        explanation: 'withdraw() must reduce the balance for valid amounts.',
        testCode: `
const acc = createAccount(100)
acc.withdraw(30)
if (acc.getBalance() === 70) { console.log("PASS") } else { console.log("FAIL: " + acc.getBalance()) }`,
      },
      {
        description: 'balance is not directly accessible',
        explanation: 'The balance property must not exist on the returned object — it should be undefined.',
        testCode: `
const acc = createAccount(100)
if (acc.balance === undefined) { console.log("PASS") } else { console.log("FAIL: balance is exposed as " + acc.balance) }`,
      },
      {
        description: 'withdraw does not allow overdraft',
        explanation: 'Withdrawing more than the balance should be a no-op — balance stays unchanged.',
        testCode: `
const acc = createAccount(50)
acc.withdraw(100)
if (acc.getBalance() === 50) { console.log("PASS") } else { console.log("FAIL: " + acc.getBalance()) }`,
      },
    ],
  },
}
export default challenge
