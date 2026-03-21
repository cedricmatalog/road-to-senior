import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-timeout-race',
  title: 'Add a Timeout to Any Promise',
  description: 'Implement `withTimeout(promise, ms)` — rejects with a timeout error if the promise doesn\'t resolve within the given milliseconds.',
  type: 'code',
  difficulty: 'mid',
  skills: ['async-js', 'error-handling'],
  content: {
    overview: `\`Promise.race\` is the tool for "whichever settles first wins." Pairing a real promise with a timeout promise lets you add a deadline to any async operation — a fundamental pattern in network clients, API calls, and user-facing loading states.`,
    solution: `function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timed out after ' + ms + 'ms')), ms)
  )
  return Promise.race([promise, timeout])
}`,
    explanation: `\`Promise.race\` resolves or rejects with whichever promise settles first. A timeout promise that rejects after \`ms\` milliseconds acts as a deadline. If the real promise resolves first, the timeout is ignored (though the setTimeout still fires — a minor leak in this implementation; production versions cancel the timer on success). This pattern is the basis of \`AbortController\`-based fetch timeouts.`,
    hints: [
      'Create a "timeout promise" that rejects after `ms` milliseconds using setTimeout.',
      'Use Promise.race([originalPromise, timeoutPromise]) — whichever settles first wins.',
      'The timeout promise should reject with a descriptive Error, not just a string.',
    ],
    testCases: [
      {
        description: 'resolves if promise settles before timeout',
        explanation: 'If the promise resolves quickly, withTimeout must pass the value through.',
        testCode: `
withTimeout(Promise.resolve(42), 100).then(val => {
  if (val === 42) { console.log("PASS") } else { console.log("FAIL: got " + val) }
}).catch(e => console.log("FAIL: unexpected rejection " + e.message))`,
      },
      {
        description: 'rejects if promise takes too long',
        explanation: 'If the promise doesn\'t settle within ms, withTimeout must reject with a timeout error.',
        testCode: `
const slow = new Promise(resolve => setTimeout(() => resolve('late'), 200))
withTimeout(slow, 50).then(() => {
  console.log("FAIL: should have timed out")
}).catch(err => {
  if (err instanceof Error && err.message.includes('Timed out')) { console.log("PASS") }
  else { console.log("FAIL: wrong error: " + err) }
})`,
      },
    ],
  },
}
export default challenge
