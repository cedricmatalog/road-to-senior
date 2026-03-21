import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'performance-debounce',
  title: 'Implement Debounce',
  description: 'Implement a `debounce` function that delays invoking a function until after a wait period has elapsed since the last call.',
  type: 'code',
  difficulty: 'mid',
  skills: ['performance'],
  content: {
    overview: `Debounce delays a function until calls stop arriving. Every call resets the timer — only the last call in a burst actually fires. Essential for search inputs, resize handlers, and any event that fires faster than you need to react.`,
    solution: `function debounce(fn, wait) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), wait)
  }
}`,
    explanation: `Debounce delays execution until a burst of calls stops. The key insight: store the timer in the closure — every call clears the previous one and sets a new one, so the function only fires after the last call plus the wait period. This is critical for search inputs and window resize handlers where you want to react to the final state, not every intermediate one. Throttle is the sibling pattern — it fires at most once per interval regardless of call frequency.`,
    hints: [
      'You need to store a timer reference between calls — use a variable in the closure.',
      'Each time the debounced function is called, clear the previous timer with `clearTimeout` and set a new one.',
      'The returned function should accept any arguments and pass them through to the original `fn`.',
    ],
    starterCode: `function debounce(fn, wait) {
  // return a debounced version of fn
}`,
    testCases: [
      {
        description: 'calls function after wait period',
        explanation: 'Basic timer behaviour — a single call must fire exactly once after the wait period elapses.',
        testCode: `
let calls = 0
const debounced = debounce(() => calls++, 50)
debounced()
setTimeout(() => {
  if (calls === 1) { console.log("PASS") } else { console.log("FAIL: expected 1 call, got " + calls) }
}, 100)`,
      },
      {
        description: 'only calls once for rapid successive calls',
        explanation: 'The core debounce contract — 3 rapid calls must produce exactly 1 invocation. Failing this means clearTimeout is missing.',
        testCode: `
let calls = 0
const debounced = debounce(() => calls++, 50)
debounced(); debounced(); debounced()
setTimeout(() => {
  if (calls === 1) { console.log("PASS") } else { console.log("FAIL: expected 1 call, got " + calls) }
}, 150)`,
      },
      {
        description: 'passes arguments to original function',
        explanation: 'The debounced wrapper must forward all arguments to fn — use rest/spread (...args) not a fixed parameter list.',
        testCode: `
let received = null
const debounced = debounce((x) => { received = x }, 30)
debounced(42)
setTimeout(() => {
  if (received === 42) { console.log("PASS") } else { console.log("FAIL: expected 42, got " + received) }
}, 80)`,
      },
    ],
  },
}
export default challenge
