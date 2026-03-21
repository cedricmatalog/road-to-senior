import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'error-handling-async-pipeline',
  title: 'Error Boundaries in an Async Pipeline',
  description: 'Implement `runPipeline(steps, input)` — runs async steps in sequence, stopping at the first error and returning `{ ok, result, failedAt }`.',
  type: 'code',
  difficulty: 'senior',
  skills: ['error-handling', 'async-js'],
  content: {
    overview: `Async pipelines need structured error handling — you need to know not just that something failed, but which step failed and why. Returning a result object instead of throwing lets callers handle failures without try/catch wrapping every call.`,
    solution: `async function runPipeline(steps, input) {
  let value = input
  for (let i = 0; i < steps.length; i++) {
    try {
      value = await steps[i](value)
    } catch (err) {
      return { ok: false, result: null, failedAt: i, error: err.message }
    }
  }
  return { ok: true, result: value, failedAt: null, error: null }
}`,
    explanation: `Each step receives the previous step's output. On failure, we return early with the step index (\`failedAt\`) so callers know exactly where the pipeline broke — useful for logging, retry logic, or showing the user a specific error. The result shape is consistent regardless of success or failure, making it easy to handle in calling code without branching on exception types.`,
    hints: [
      'Loop through steps with for...of or a for loop — await each step.',
      'Wrap each step in try/catch — on catch, return { ok: false, failedAt: index, error: err.message }.',
      'On success, return { ok: true, result: finalValue }.',
    ],
    testCases: [
      {
        description: 'returns ok result when all steps succeed',
        explanation: 'Each step\'s output becomes the next step\'s input — final value is the last step\'s result.',
        testCode: `
async function runPipeline(steps, input) {
  let value = input
  for (let i = 0; i < steps.length; i++) {
    try { value = await steps[i](value) }
    catch (err) { return { ok: false, result: null, failedAt: i, error: err.message } }
  }
  return { ok: true, result: value, failedAt: null, error: null }
}
const steps = [async x => x * 2, async x => x + 1]
runPipeline(steps, 5).then(r => {
  if (r.ok && r.result === 11) { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify(r)) }
})`,
      },
      {
        description: 'returns failedAt index on error',
        explanation: 'When a step throws, failedAt must be the index of that step.',
        testCode: `
async function runPipeline(steps, input) {
  let value = input
  for (let i = 0; i < steps.length; i++) {
    try { value = await steps[i](value) }
    catch (err) { return { ok: false, result: null, failedAt: i, error: err.message } }
  }
  return { ok: true, result: value, failedAt: null, error: null }
}
const steps = [async x => x + 1, async () => { throw new Error('step 2 failed') }, async x => x]
runPipeline(steps, 0).then(r => {
  if (!r.ok && r.failedAt === 1 && r.error === 'step 2 failed') { console.log("PASS") }
  else { console.log("FAIL: " + JSON.stringify(r)) }
})`,
      },
    ],
  },
}
export default challenge
