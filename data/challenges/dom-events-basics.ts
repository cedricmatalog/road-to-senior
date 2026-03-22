import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-events-basics',
  title: 'Handle DOM Events',
  description: 'A product page needs a live search filter and a click counter for analytics. Wire up the event listeners.',
  type: 'code',
  difficulty: 'junior',
  skills: ['dom-browser'],
  content: {
    overview: '`addEventListener` attaches a callback to an element that fires when an event occurs. The callback receives an `Event` object with details about what happened. For input events, `event.target.value` gives the current text. This pattern is at the core of every interactive widget — search bars, toggles, counters, form previews.',
    starterCode: `// You're adding two features to a product page:
// 1. A click counter on the button with id "btn".
//    Each click increments a counter and updates the element with id "count"
//    to show the total (e.g. "Clicks: 3").
// 2. A live search input — as the user types in id "search", the element
//    with id "preview" updates instantly to show what they've typed.

function setup() {
  // your code here
}`,
    solution: `function setup() {
  let count = 0
  const btn = document.getElementById('btn')
  const countEl = document.getElementById('count')
  btn.addEventListener('click', () => {
    count++
    countEl.textContent = \`Clicks: \${count}\`
  })

  const searchEl = document.getElementById('search')
  const previewEl = document.getElementById('preview')
  searchEl.addEventListener('input', (e) => {
    previewEl.textContent = e.target.value
  })
}`,
    explanation: 'Use `addEventListener(\'click\', fn)` for clicks and `addEventListener(\'input\', fn)` for text input. Keep state (the counter) in a variable in the outer scope. For input events, `e.target.value` gives the current value of the input.',
    hints: [
      'Use `element.addEventListener(\'click\', callback)` to attach a click listener',
      'Keep the counter in a variable in the outer scope so each click can increment it',
      'For the input, use `e.target.value` to get the current text',
    ],
    testCases: [
      {
        description: 'updates count display on each click',
        testCode: `document.body.innerHTML = '<button id="btn">Click</button><span id="count">Clicks: 0</span><input id="search"/><span id="preview"></span>'
setup()
const btn = document.getElementById('btn')
const countEl = document.getElementById('count')
btn.click(); btn.click(); btn.click()
assert.strictEqual(countEl.textContent, 'Clicks: 3')`,
      },
      {
        description: 'updates preview on input',
        testCode: `document.body.innerHTML = '<button id="btn">Click</button><span id="count">Clicks: 0</span><input id="search"/><span id="preview"></span>'
setup()
const searchEl = document.getElementById('search')
const previewEl = document.getElementById('preview')
searchEl.value = 'hello'
searchEl.dispatchEvent(new Event('input'))
assert.strictEqual(previewEl.textContent, 'hello')`,
      },
    ],
  },
}
export default challenge
