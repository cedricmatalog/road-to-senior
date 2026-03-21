import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-serial-execution',
  title: 'Execute Async Tasks Serially',
  description: 'Implement `runSerial(tasks)` — runs an array of async functions one after another, passing the result of each to the next.',
  type: 'code',
  difficulty: 'mid',
  skills: ['async-js', 'promises-concurrency'],
  content: {
    overview: `Sometimes you need async operations to run in strict sequence — each waiting for the previous to finish before starting. This is the async equivalent of a reduce, and it's how database migration runners and build pipelines work.`,
    starterCode: `// runSerial(tasks) runs an array of async tasks one at a time (not in parallel).
// Each task is a function that returns a Promise.
// Return the result of the last task.

async function runSerial(tasks) {
  // your code here
}`,
    solution: `async function runSerial(tasks) {
  let result
  for (const task of tasks) {
    result = await task(result)
  }
  return result
}`,
    explanation: `A simple \`for...of\` loop with \`await\` runs tasks one at a time — the loop doesn't advance until each promise resolves. Each task receives the previous result, forming a pipeline. \`Array.prototype.reduce\` with promises works too but is harder to read. Note: \`tasks.forEach(async task => await task())\` does NOT work — \`forEach\` ignores the returned promise from the async callback.`,
    hints: [
      'A for...of loop with await runs tasks one at a time — the loop pauses at each await.',
      'Pass the result of each task to the next as its argument.',
      'Do NOT use forEach with async/await — forEach doesn\'t await the returned promise.',
    ],
    testCases: [
      {
        description: 'runs tasks in order',
        explanation: 'Tasks must execute sequentially — each task only starts after the previous resolves.',
        testCode: `
const order = []
const tasks = [
  async () => { order.push(1); return 1 },
  async (prev) => { order.push(2); return prev + 1 },
  async (prev) => { order.push(3); return prev + 1 },
]
runSerial(tasks).then(result => {
  if (JSON.stringify(order) === '[1,2,3]' && result === 3) { console.log("PASS") }
  else { console.log("FAIL: order=" + JSON.stringify(order) + " result=" + result) }
})`,
      },
      {
        description: 'passes result of each task to the next',
        explanation: 'Each task receives the return value of the previous task as its argument.',
        testCode: `
const tasks = [
  async () => 10,
  async (n) => n * 2,
  async (n) => n + 5,
]
runSerial(tasks).then(result => {
  if (result === 25) { console.log("PASS") } else { console.log("FAIL: got " + result) }
})`,
      },
    ],
  },
}
export default challenge
