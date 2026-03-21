import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'promises-concurrency-parallel',
  title: 'Run Promises in Parallel with Concurrency Limit',
  description: 'Implement a function that runs async tasks in parallel but limits how many can run at once.',
  type: 'code',
  difficulty: 'senior',
  skills: ['promises-concurrency', 'async-js'],
  content: {
    overview: `Running tasks serially is too slow; running all at once overwhelms the server. A concurrency limit lets you saturate available capacity without overloading it — the "worker pool" pattern that underpins database connection pools, HTTP request batching, and build tools.`,
    solution: `async function runWithConcurrency(tasks, limit) {
  const results = new Array(tasks.length)
  let index = 0

  async function runNext() {
    const i = index++
    if (i >= tasks.length) return
    results[i] = await tasks[i]()
    await runNext()
  }

  const workers = Array.from({ length: Math.min(limit, tasks.length) }, runNext)
  await Promise.all(workers)
  return results
}`,
    explanation: `The "worker pool" pattern: start \`limit\` workers simultaneously, each taking the next available task when it finishes. The trick is using a shared \`index\` counter (not a queue) so workers self-schedule without coordination. \`Promise.all(workers)\` waits for all workers to drain the task list. This avoids both extremes — running everything serially (slow) or launching 1000 concurrent requests (overwhelms the server/network).`,
    hints: [
      'Start by launching up to `limit` tasks immediately. When one finishes, launch the next queued one.',
      'Keep a counter of active tasks and an index into the tasks array. In the `.then()` of each task, decrement active and start the next.',
      'Use `Promise.all` on the initial batch — but you\'ll need to refill the pool as tasks complete. A recursive "slot" approach works cleanly.',
    ],
    starterCode: `async function runWithConcurrency(tasks, limit) {
  // tasks: Array<() => Promise<any>>
  // limit: max concurrent tasks
  // returns: Promise<any[]> — results in original order
}`,
    testCases: [
      {
        description: 'returns results in original order',
        explanation: 'Results must map to tasks by index regardless of completion order — a common mistake is returning in completion order.',
        testCode: `
const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3),
]
runWithConcurrency(tasks, 2).then(results => {
  if (JSON.stringify(results) === '[1,2,3]') { console.log("PASS") }
  else { console.log("FAIL: got " + JSON.stringify(results)) }
})`,
      },
      {
        description: 'respects concurrency limit',
        explanation: 'Tracks how many tasks run at the same time — must never exceed the limit. Promise.all(allTasks) would fail this.',
        testCode: `
let concurrent = 0; let maxConcurrent = 0
const makeTask = () => () => new Promise(resolve => {
  concurrent++
  if (concurrent > maxConcurrent) maxConcurrent = concurrent
  setTimeout(() => { concurrent--; resolve(null) }, 20)
})
const tasks = Array.from({ length: 6 }, makeTask)
runWithConcurrency(tasks, 2).then(() => {
  if (maxConcurrent <= 2) { console.log("PASS") }
  else { console.log("FAIL: max concurrent was " + maxConcurrent) }
})`,
      },
    ],
  },
}
export default challenge
