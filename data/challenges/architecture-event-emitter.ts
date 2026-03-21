import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-event-emitter',
  title: 'Build an Event Emitter',
  description: 'Implement a simple EventEmitter class with `on`, `off`, and `emit` methods — the foundation of Node.js event-driven architecture.',
  type: 'code',
  difficulty: 'mid',
  skills: ['architecture', 'closures-scope'],
  content: {
    overview: `The event emitter is the core pattern behind Node.js I/O, DOM events, and reactive libraries. Implementing it from scratch reveals how pub/sub decouples producers from consumers — emitters don't know who's listening, listeners don't know who fires.`,
    solution: `class EventEmitter {
  constructor() {
    this._listeners = {}
  }
  on(event, fn) {
    if (!this._listeners[event]) this._listeners[event] = new Set()
    this._listeners[event].add(fn)
  }
  off(event, fn) {
    this._listeners[event]?.delete(fn)
  }
  emit(event, ...args) {
    this._listeners[event]?.forEach(fn => fn(...args))
  }
}`,
    explanation: `The event emitter is the core of Node.js's non-blocking I/O model. Using a \`Set\` instead of an array prevents duplicate listener registrations automatically. The \`?.forEach\` guards against emitting an event that has no listeners without needing an explicit check. This same pattern powers browser DOM events, Node's \`EventEmitter\`, and reactive libraries like RxJS — understanding it from scratch demystifies a huge amount of async JavaScript.`,
    hints: [
      'Store listeners in an object: `{ [eventName]: Set<Function> }`. Using a Set prevents duplicate registrations.',
      '`on(event, fn)` adds to the set. `off(event, fn)` deletes from it. `emit(event, ...args)` calls every listener with the args.',
      'Guard against calling emit for an event with no listeners — check if the set exists first.',
    ],
    starterCode: `class EventEmitter {
  // implement on(event, fn), off(event, fn), emit(event, ...args)
}`,
    testCases: [
      {
        description: 'on + emit calls the listener',
        explanation: 'The basic contract — registering a listener and then emitting the event must invoke it.',
        testCode: `
const ee = new EventEmitter()
let called = false
ee.on('test', () => { called = true })
ee.emit('test')
if (called) { console.log("PASS") } else { console.log("FAIL: listener not called") }`,
      },
      {
        description: 'off removes the listener',
        explanation: 'off() must remove the exact function reference. Emitting after off() must not call the removed listener.',
        testCode: `
const ee = new EventEmitter()
let count = 0
const fn = () => count++
ee.on('tick', fn)
ee.emit('tick')
ee.off('tick', fn)
ee.emit('tick')
if (count === 1) { console.log("PASS") } else { console.log("FAIL: count=" + count) }`,
      },
      {
        description: 'emit passes arguments to listener',
        explanation: 'Listeners must receive the arguments passed to emit() — use rest/spread (...args) to forward them.',
        testCode: `
const ee = new EventEmitter()
let received = null
ee.on('msg', (data) => { received = data })
ee.emit('msg', { text: 'hello' })
if (received?.text === 'hello') { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify(received)) }`,
      },
      {
        description: 'multiple listeners on same event all fire',
        explanation: 'All registered listeners must be called — using a single slot instead of a Set/array would fail this.',
        testCode: `
const ee = new EventEmitter()
let a = 0, b = 0
ee.on('x', () => a++)
ee.on('x', () => b++)
ee.emit('x')
if (a === 1 && b === 1) { console.log("PASS") } else { console.log("FAIL: a=" + a + " b=" + b) }`,
      },
    ],
  },
}
export default challenge
