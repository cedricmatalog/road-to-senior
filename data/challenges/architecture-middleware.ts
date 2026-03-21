import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-middleware',
  title: 'Build a Middleware Pipeline',
  description: 'Implement `compose(middlewares)` — chains middleware functions Express-style, where each calls `next()` to pass control to the next one.',
  type: 'code',
  difficulty: 'senior',
  skills: ['architecture', 'closures-scope'],
  content: {
    overview: `Middleware pipelines are how Express, Koa, and Redux handle cross-cutting concerns (logging, auth, error handling) without modifying core logic. Each middleware runs, does its thing, and calls next() to continue the chain — or doesn't, to short-circuit.`,
    solution: `function compose(middlewares) {
  return function(ctx, finalHandler) {
    let index = -1
    function dispatch(i) {
      if (i <= index) throw new Error('next() called multiple times')
      index = i
      const fn = middlewares[i] || finalHandler
      if (!fn) return
      fn(ctx, () => dispatch(i + 1))
    }
    dispatch(0)
  }
}`,
    explanation: `The dispatcher maintains an index to prevent calling next() multiple times (a common bug). Each middleware receives ctx (shared state) and a next function that dispatches to the next middleware. If no middleware handles the request, the finalHandler runs. This is the core of Koa's compose and a simplified version of Express's app.use chain. The index guard catches middleware bugs early.`,
    hints: [
      'Maintain an index to track which middleware is currently running.',
      'The `next` function passed to each middleware calls `dispatch(i + 1)` — the next in the chain.',
      'Guard against next() being called multiple times by checking if the index has already advanced.',
    ],
    testCases: [
      {
        description: 'runs middlewares in order',
        explanation: 'Each middleware must execute in the order they were composed.',
        testCode: `
function compose(middlewares) {
  return function(ctx, final) {
    let index = -1
    function dispatch(i) {
      index = i
      const fn = middlewares[i] || final
      if (!fn) return
      fn(ctx, () => dispatch(i + 1))
    }
    dispatch(0)
  }
}
const order = []
const m1 = (ctx, next) => { order.push(1); next() }
const m2 = (ctx, next) => { order.push(2); next() }
const m3 = (ctx, next) => { order.push(3); next() }
compose([m1, m2, m3])({}, () => order.push('final'))
if (JSON.stringify(order) === '[1,2,3,"final"]') { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify(order)) }`,
      },
      {
        description: 'middleware can short-circuit by not calling next',
        explanation: 'If a middleware omits next(), subsequent middlewares must not run.',
        testCode: `
function compose(middlewares) {
  return function(ctx, final) {
    let index = -1
    function dispatch(i) {
      index = i
      const fn = middlewares[i] || final
      if (!fn) return
      fn(ctx, () => dispatch(i + 1))
    }
    dispatch(0)
  }
}
const order = []
const m1 = (ctx, next) => { order.push(1); next() }
const m2 = (ctx, next) => { order.push(2) } // no next()
const m3 = (ctx, next) => { order.push(3); next() }
compose([m1, m2, m3])({}, () => {})
if (JSON.stringify(order) === '[1,2]') { console.log("PASS") }
else { console.log("FAIL: " + JSON.stringify(order)) }`,
      },
    ],
  },
}
export default challenge
