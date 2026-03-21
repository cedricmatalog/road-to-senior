import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'refactoring-pure-reducer',
  title: 'Refactor to a Pure Reducer',
  description: 'Refactor a class with mutable state and methods into a pure reducer function — same logic, no mutation.',
  type: 'code',
  difficulty: 'mid',
  skills: ['refactoring', 'testing'],
  content: {
    overview: `A reducer is a pure function: \`(state, action) => newState\`. It never mutates the input — it returns a new state object. This makes state changes predictable, loggable, and testable. It's the pattern behind Redux, React's useReducer, and Elm.`,
    solution: `function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, items: [...state.items, { id: Date.now(), text: action.text, done: false }] }
    case 'TOGGLE':
      return { ...state, items: state.items.map(item =>
        item.id === action.id ? { ...item, done: !item.done } : item
      )}
    case 'REMOVE':
      return { ...state, items: state.items.filter(item => item.id !== action.id) }
    default:
      return state
  }
}`,
    explanation: `Each case returns a new state object using spread — never \`state.items.push()\` or \`item.done = true\`. The switch/case pattern on \`action.type\` is conventional but optional — a lookup table works too. The \`default: return state\` is critical: unknown actions must return the current state unchanged, not undefined. Purity means time-travel debugging, undo/redo, and replay are trivially implementable.`,
    hints: [
      'Each case must return a new object using spread: `{ ...state, items: [...] }` — never mutate.',
      'ADD: spread state, replace items with a new array that includes the new item.',
      'TOGGLE: map over items, spreading and flipping done on the matching id. REMOVE: filter.',
    ],
    testCases: [
      {
        description: 'ADD adds a new item',
        explanation: 'The returned state must have a new item — original state array must be unchanged.',
        testCode: `
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD': return { ...state, items: [...state.items, { id: 1, text: action.text, done: false }] }
    case 'TOGGLE': return { ...state, items: state.items.map(item => item.id === action.id ? { ...item, done: !item.done } : item) }
    case 'REMOVE': return { ...state, items: state.items.filter(item => item.id !== action.id) }
    default: return state
  }
}
const s0 = { items: [] }
const s1 = todoReducer(s0, { type: 'ADD', text: 'Buy milk' })
if (s1.items.length === 1 && s1.items[0].text === 'Buy milk' && s0.items.length === 0) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
      {
        description: 'TOGGLE flips done without mutation',
        explanation: 'The toggled item must have the opposite done value — and the original item must be unchanged.',
        testCode: `
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD': return { ...state, items: [...state.items, { id: 1, text: action.text, done: false }] }
    case 'TOGGLE': return { ...state, items: state.items.map(item => item.id === action.id ? { ...item, done: !item.done } : item) }
    case 'REMOVE': return { ...state, items: state.items.filter(item => item.id !== action.id) }
    default: return state
  }
}
const s0 = { items: [{ id: 1, text: 'Task', done: false }] }
const s1 = todoReducer(s0, { type: 'TOGGLE', id: 1 })
if (s1.items[0].done === true && s0.items[0].done === false) { console.log("PASS") }
else { console.log("FAIL") }`,
      },
    ],
  },
}
export default challenge
