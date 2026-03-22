import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-create-elements',
  title: 'Create and Append Elements',
  description: 'An API returns a list of items and you need to render them into the page without a framework.',
  type: 'code',
  difficulty: 'junior',
  skills: ['dom-browser'],
  content: {
    overview: '`document.createElement` creates a new element in memory. You can set its properties (`textContent`, `className`, attributes), then attach it to the DOM with `appendChild`. This is the pattern behind every dynamic list — search results, notification feeds, autocomplete dropdowns — anywhere content comes from an API rather than being hardcoded in HTML.',
    starterCode: `// You're building a search results page. The API returns an array of result titles
// and you need to render each one as a <li> inside the <ul id="list">.
// Each <li> should have the class "list-item" so the existing CSS applies.
// Return the number of items added.

function renderList(items) {
  // your code here
  return 0
}`,
    solution: `function renderList(items) {
  const list = document.getElementById('list')
  if (!list) return 0
  for (const item of items) {
    const li = document.createElement('li')
    li.className = 'list-item'
    li.textContent = item
    list.appendChild(li)
  }
  return items.length
}`,
    explanation: 'Create each element with `document.createElement`, set its `className` and `textContent`, then attach it with `list.appendChild(li)`. Iterate with a `for...of` loop or `forEach`. Return `items.length` since every item was added.',
    hints: [
      'Use `document.createElement(\'li\')` to create each list item',
      'Set `el.className = \'list-item\'` to add the class',
      'Use `list.appendChild(li)` to add each item to the `<ul>`',
    ],
    testCases: [
      {
        description: 'returns count of items added',
        testCode: `document.body.innerHTML = '<ul id="list"></ul>'
assert.strictEqual(renderList(['Apple', 'Banana', 'Cherry']), 3)`,
      },
      {
        description: 'renders correct number of li elements with class list-item',
        testCode: `document.body.innerHTML = '<ul id="list"></ul>'
renderList(['Apple', 'Banana', 'Cherry'])
const items = document.querySelectorAll('li.list-item')
assert.strictEqual(items.length, 3)`,
      },
      {
        description: 'renders correct text content',
        testCode: `document.body.innerHTML = '<ul id="list"></ul>'
renderList(['Apple', 'Banana'])
const items = document.querySelectorAll('li.list-item')
assert.strictEqual(items[0].textContent, 'Apple')
assert.strictEqual(items[1].textContent, 'Banana')`,
      },
      {
        description: 'handles empty array',
        testCode: `document.body.innerHTML = '<ul id="list"></ul>'
assert.strictEqual(renderList([]), 0)
assert.strictEqual(document.querySelectorAll('li').length, 0)`,
      },
    ],
  },
}
export default challenge
