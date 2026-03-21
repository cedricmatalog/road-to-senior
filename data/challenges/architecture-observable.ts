import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-observable',
  title: 'Build a Simple Observable',
  description: 'Implement a minimal Observable with `subscribe`, `next`, `error`, and `complete` — the pattern behind RxJS.',
  type: 'code',
  difficulty: 'senior',
  skills: ['architecture', 'closures-scope'],
  content: {
    overview: `An Observable represents a stream of values over time. Unlike Promises (one value, eventually), Observables emit multiple values. Implementing one from scratch reveals the design behind RxJS, event streams, and reactive UI frameworks.`,
    starterCode: `// createObservable(producer) creates an observable.
// producer receives a subscriber { next, error, complete }.
// subscribe(observer) runs the producer and returns { unsubscribe }.

function createObservable(producer) {
  // your code here
}`,
    solution: `function createObservable(producer) {
  return {
    subscribe(observer) {
      const sub = {
        next(value) { if (!sub.closed && observer.next) observer.next(value) },
        error(err) { if (!sub.closed) { sub.closed = true; if (observer.error) observer.error(err) } },
        complete() { if (!sub.closed) { sub.closed = true; if (observer.complete) observer.complete() } },
        closed: false,
      }
      producer(sub)
      return { unsubscribe() { sub.closed = true } }
    }
  }
}`,
    explanation: `The producer receives a subscriber object with \`next\`, \`error\`, and \`complete\` methods. The \`closed\` flag prevents delivering values after completion or error. \`subscribe\` returns an unsubscribe function — essential for cleanup. This mirrors RxJS's core design: Observables are lazy (nothing runs until you subscribe), push-based (the producer calls next), and cancellable.`,
    hints: [
      'createObservable takes a producer function. Calling subscribe runs the producer with a subscriber.',
      'The subscriber has next(), error(), and complete() — guard each with a closed check.',
      'Return { unsubscribe() } from subscribe so callers can stop receiving values.',
    ],
    testCases: [
      {
        description: 'delivers values via next',
        explanation: 'Each call to subscriber.next must invoke the observer\'s next handler.',
        testCode: `
function createObservable(producer) {
  return { subscribe(observer) {
    const sub = { next(v) { if (!sub.closed && observer.next) observer.next(v) }, error(e) { if (!sub.closed) { sub.closed = true; if (observer.error) observer.error(e) } }, complete() { if (!sub.closed) { sub.closed = true; if (observer.complete) observer.complete() } }, closed: false }
    producer(sub)
    return { unsubscribe() { sub.closed = true } }
  }}
}
const values = []
const obs = createObservable(sub => { sub.next(1); sub.next(2); sub.next(3) })
obs.subscribe({ next: v => values.push(v) })
if (JSON.stringify(values) === '[1,2,3]') { console.log("PASS") } else { console.log("FAIL: " + values) }`,
      },
      {
        description: 'stops delivering after unsubscribe',
        explanation: 'After unsubscribe, the observer must not receive further values.',
        testCode: `
function createObservable(producer) {
  return { subscribe(observer) {
    const sub = { next(v) { if (!sub.closed && observer.next) observer.next(v) }, closed: false, error(){}, complete(){} }
    producer(sub)
    return { unsubscribe() { sub.closed = true } }
  }}
}
const values = []
const obs = createObservable(sub => {
  setTimeout(() => sub.next(1), 10)
  setTimeout(() => sub.next(2), 30)
})
const subRef = obs.subscribe({ next: v => { values.push(v); if (v === 1) subRef.unsubscribe() } })
setTimeout(() => {
  if (JSON.stringify(values) === '[1]') { console.log("PASS") } else { console.log("FAIL: " + values) }
}, 100)`,
      },
    ],
  },
}
export default challenge
