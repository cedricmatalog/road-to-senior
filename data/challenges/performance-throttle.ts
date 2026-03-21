import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'performance-throttle',
  title: 'Implement Throttle',
  description: 'Implement `throttle(fn, wait)` — calls fn at most once per `wait` milliseconds, no matter how frequently it\'s invoked.',
  type: 'code',
  difficulty: 'mid',
  skills: ['performance'],
  content: {
    overview: `Throttle limits call frequency — unlike debounce (which delays until calls stop), throttle fires immediately and then ignores calls for the wait period. Use throttle for scroll/resize handlers where you want regular updates, not just a final one.`,
    solution: `function throttle(fn, wait) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      lastTime = now
      return fn(...args)
    }
  }
}`,
    explanation: `Track the last execution time. On each call, check if enough time has passed — if yes, call fn and update the timestamp. If no, skip silently. This is "leading edge" throttle — it fires on the first call, then is silent for \`wait\`ms. The alternative is "trailing edge" (only fires at the end of the interval). Debounce and throttle are complementary — debounce for "fire once after activity stops", throttle for "fire regularly during activity."`,
    hints: [
      'Store the last execution timestamp in the closure (initialise to 0).',
      'On each call, compare Date.now() to lastTime — if the difference >= wait, invoke fn.',
      'Update lastTime immediately when you decide to invoke fn.',
    ],
    testCases: [
      {
        description: 'calls fn on first invocation',
        explanation: 'The first call must always execute — lastTime starts at 0 so the condition is met.',
        testCode: `
function throttle(fn, wait) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= wait) { lastTime = now; return fn(...args) }
  }
}
let calls = 0
const t = throttle(() => calls++, 100)
t()
if (calls === 1) { console.log("PASS") } else { console.log("FAIL: calls=" + calls) }`,
      },
      {
        description: 'ignores calls within the wait period',
        explanation: 'Multiple rapid calls within the wait period must result in exactly one invocation.',
        testCode: `
function throttle(fn, wait) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= wait) { lastTime = now; return fn(...args) }
  }
}
let calls = 0
const t = throttle(() => calls++, 500)
t(); t(); t(); t()
if (calls === 1) { console.log("PASS") } else { console.log("FAIL: calls=" + calls) }`,
      },
      {
        description: 'allows calls after wait period elapses',
        explanation: 'After the wait period passes, the next call must execute again.',
        testCode: `
function throttle(fn, wait) {
  let lastTime = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastTime >= wait) { lastTime = now; return fn(...args) }
  }
}
let calls = 0
const t = throttle(() => calls++, 50)
t()
setTimeout(() => {
  t()
  if (calls === 2) { console.log("PASS") } else { console.log("FAIL: calls=" + calls) }
}, 100)`,
      },
    ],
  },
}
export default challenge
