import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-query-and-update',
  title: 'Query and Update the DOM',
  description: 'A CMS preview page needs to inject content into existing markup without a framework. Update the title, highlight filtered items, and fix a broken link.',
  type: 'code',
  difficulty: 'junior',
  skills: ['dom-browser'],
  content: {
    overview: '`document.querySelector` selects the first element matching a CSS selector. `querySelectorAll` returns a NodeList of all matches. Once you have an element, you can update its `textContent`, `innerHTML`, or any attribute. You use this constantly when building widgets, CMS integrations, or any feature that manipulates existing markup.',
    starterCode: `// You're writing a script that runs after a CMS injects page content.
// It needs to personalise the title, mark filtered search results, and fix a broken link.
// 1. Find the element with id "title" and set its textContent to "Hello World"
// 2. Find all elements with class "item" and add the class "highlighted" to each
// 3. Find the element with id "link" and set its href attribute to "https://example.com"

function updatePage() {
  // your code here
}`,
    solution: `function updatePage() {
  const title = document.getElementById('title')
  if (title) title.textContent = 'Hello World'

  document.querySelectorAll('.item').forEach(el => {
    el.classList.add('highlighted')
  })

  const link = document.getElementById('link')
  if (link) link.setAttribute('href', 'https://example.com')
}`,
    explanation: 'Use `getElementById` or `querySelector` to find single elements by id. Use `querySelectorAll` for multiple elements — it returns a NodeList you can iterate with `forEach`. `classList.add` adds a class, `setAttribute` sets any attribute including href.',
    hints: [
      'Use `document.getElementById(\'title\')` or `document.querySelector(\'#title\')`',
      'Use `document.querySelectorAll(\'.item\')` to get all `.item` elements, then iterate with `.forEach`',
      'Use `el.classList.add(\'highlighted\')` to add a class, and `el.setAttribute(\'href\', url)` to set an attribute',
    ],
    testCases: [
      {
        description: 'sets title textContent to "Hello World"',
        testCode: `document.body.innerHTML = '<h1 id="title">Original</h1>'
updatePage()
assert.strictEqual(document.getElementById('title').textContent, 'Hello World')`,
      },
      {
        description: 'adds "highlighted" class to all .item elements',
        testCode: `document.body.innerHTML = '<ul><li class="item">A</li><li class="item">B</li></ul>'
updatePage()
const items = document.querySelectorAll('.item')
assert.ok(Array.from(items).every(el => el.classList.contains('highlighted')), 'not all items highlighted')`,
      },
      {
        description: 'sets href on link element',
        testCode: `document.body.innerHTML = '<a id="link">Click me</a>'
updatePage()
assert.strictEqual(document.getElementById('link').getAttribute('href'), 'https://example.com')`,
      },
    ],
  },
}
export default challenge
