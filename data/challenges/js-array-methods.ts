import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'js-array-methods',
  title: 'Array Transformation Pipeline',
  description: 'Use map, filter, and reduce to process a list of orders.',
  type: 'code',
  difficulty: 'junior',
  skills: ['javascript'],
  content: {
    overview: 'map, filter, and reduce are the foundation of data transformation in JavaScript. Chain them to express complex logic clearly without loops.',
    starterCode: `// Given an array of orders, return the total revenue
// from orders that are 'completed' only.
// Each order has: { id, status, amount }

function completedRevenue(orders) {
  // your code here
}`,
    solution: `function completedRevenue(orders) {
  return orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0)
}`,
    explanation: 'filter first to narrow down only completed orders, then reduce to sum the amounts. This is clearer than a for loop because each step has one job: filter selects, reduce aggregates.',
    testCases: [
      {
        description: 'sums only completed orders',
        testCode: `const orders = [
  { id: 1, status: 'completed', amount: 50 },
  { id: 2, status: 'pending', amount: 30 },
  { id: 3, status: 'completed', amount: 20 },
]
assert.strictEqual(completedRevenue(orders), 70)`,
      },
      {
        description: 'returns 0 when no completed orders',
        testCode: `const orders = [
  { id: 1, status: 'pending', amount: 50 },
]
assert.strictEqual(completedRevenue(orders), 0)`,
      },
      {
        description: 'handles empty array',
        testCode: `assert.strictEqual(completedRevenue([]), 0)`,
      },
    ],
  },
}
export default challenge
