import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-pub-sub',
  title: 'Build a Typed Pub/Sub Store',
  description: 'Multiple UI components need to react to the same cart state changes without passing props through every layer. Build a minimal state store they can all subscribe to.',
  type: 'code',
  difficulty: 'mid',
  skills: ['architecture'],
  content: {
    overview: `A pub/sub state store decouples state management from the components that use it. Components subscribe to state changes; nothing knows about each other directly. This is the core pattern behind Redux, Zustand, and Jotai.`,
    starterCode: `// createStore(initialState) creates a simple state store with:
// - getState() — returns current state
// - setState(partial) — merges partial state and notifies listeners
// - subscribe(listener) — registers a listener, returns unsubscribe fn

function createStore(initialState) {
  // your code here
}`,
    solution: `function createStore(initialState) {
  let state = initialState
  const listeners = new Set()
  return {
    getState() { return state },
    setState(updater) {
      state = typeof updater === 'function' ? updater(state) : { ...state, ...updater }
      listeners.forEach(fn => fn(state))
    },
    subscribe(fn) {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
  }
}`,
    explanation: `Three core operations: read state, write state, react to state changes. setState accepts either a partial object (merged) or an updater function (for derived updates). subscribe returns an unsubscribe function — the caller is responsible for cleanup. The Set prevents duplicate listener registrations. This is functionally equivalent to Zustand's create() in about 15 lines.`,
    hints: [
      'Store state in a closure variable. getState() returns it directly.',
      'setState accepts an object (merge with spread) or a function (call with current state).',
      'subscribe adds a listener to a Set and returns a function that removes it.',
    ],
    testCases: [
      {
        description: 'getState returns current state',
        explanation: 'getState must return the current state object.',
        testCode: `
function createStore(initial) {
  let state = initial
  const listeners = new Set()
  return {
    getState() { return state },
    setState(u) { state = typeof u === 'function' ? u(state) : { ...state, ...u }; listeners.forEach(fn => fn(state)) },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
  }
}
const store = createStore({ count: 0 })
if (store.getState().count === 0) { console.log("PASS") } else { console.log("FAIL") }`,
      },
      {
        description: 'subscribers are notified on setState',
        explanation: 'All registered listeners must be called with the new state after every setState.',
        testCode: `
function createStore(initial) {
  let state = initial
  const listeners = new Set()
  return {
    getState() { return state },
    setState(u) { state = typeof u === 'function' ? u(state) : { ...state, ...u }; listeners.forEach(fn => fn(state)) },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
  }
}
const store = createStore({ count: 0 })
const updates = []
store.subscribe(s => updates.push(s.count))
store.setState({ count: 1 })
store.setState(s => ({ count: s.count + 1 }))
if (JSON.stringify(updates) === '[1,2]') { console.log("PASS") } else { console.log("FAIL: " + updates) }`,
      },
      {
        description: 'unsubscribe stops notifications',
        explanation: 'After calling the returned unsubscribe function, the listener must not be called.',
        testCode: `
function createStore(initial) {
  let state = initial
  const listeners = new Set()
  return {
    getState() { return state },
    setState(u) { state = typeof u === 'function' ? u(state) : { ...state, ...u }; listeners.forEach(fn => fn(state)) },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn) }
  }
}
const store = createStore({ count: 0 })
const updates = []
const unsub = store.subscribe(s => updates.push(s.count))
store.setState({ count: 1 })
unsub()
store.setState({ count: 2 })
if (JSON.stringify(updates) === '[1]') { console.log("PASS") } else { console.log("FAIL: " + updates) }`,
      },
    ],
  },
}
export default challenge
