import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-custom-element',
  title: 'Build a DOM Tooltip Component',
  description: 'Implement `createTooltip(target, text)` — shows a tooltip element near the target on mouseenter, hides it on mouseleave, without any library.',
  type: 'code',
  difficulty: 'mid',
  skills: ['dom-browser'],
  content: {
    overview: `Building a tooltip from scratch exercises core DOM skills: creating elements, positioning with getBoundingClientRect, attaching and removing event listeners, and managing element lifecycle (append/remove). The same patterns underpin every UI component library.`,
    starterCode: `// createTooltip(target, text) attaches a tooltip to target element.
// Shows on mouseenter, hides on mouseleave.
// Returns { destroy() } to remove all listeners.

function createTooltip(target, text) {
  // your code here
}`,
    solution: `function createTooltip(target, text) {
  let tooltip = null

  function show() {
    tooltip = document.createElement('div')
    tooltip.textContent = text
    tooltip.style.position = 'fixed'
    tooltip.style.zIndex = '9999'
    const rect = target.getBoundingClientRect()
    tooltip.style.top = (rect.bottom + 8) + 'px'
    tooltip.style.left = rect.left + 'px'
    document.body.appendChild(tooltip)
  }

  function hide() {
    if (tooltip) {
      tooltip.remove()
      tooltip = null
    }
  }

  target.addEventListener('mouseenter', show)
  target.addEventListener('mouseleave', hide)

  return { destroy() { target.removeEventListener('mouseenter', show); target.removeEventListener('mouseleave', hide); hide() } }
}`,
    explanation: `Key patterns: create the tooltip element on demand (not upfront), position it using \`getBoundingClientRect()\` which gives viewport-relative coordinates (matching \`position: fixed\`), append to body so z-index and overflow work correctly, and return a \`destroy()\` method to clean up listeners. Keeping the same function references for add/removeEventListener is critical — anonymous functions can't be removed.`,
    hints: [
      'Create the tooltip element inside the mouseenter handler, not at setup time.',
      'Use getBoundingClientRect() to get the target\'s position, then place the tooltip below it.',
      'Store named function references so you can removeEventListener on cleanup.',
    ],
    testCases: [
      {
        description: 'creates tooltip element on mouseenter',
        explanation: 'After mouseenter fires, a new element with the tooltip text must exist in the document.',
        testCode: `
function createTooltip(target, text) {
  let tooltip = null
  function show() {
    tooltip = { textContent: text, style: {}, remove: () => { tooltip = null } }
    target._appended = tooltip
  }
  function hide() { if (tooltip) { tooltip.remove(); tooltip = null } }
  target.addEventListener('mouseenter', show)
  target.addEventListener('mouseleave', hide)
  return { destroy() { target.removeEventListener('mouseenter', show); target.removeEventListener('mouseleave', hide); hide() } }
}
const listeners = {}
const target = {
  getBoundingClientRect: () => ({ top: 0, bottom: 40, left: 0, right: 100 }),
  addEventListener: (e, fn) => { listeners[e] = fn },
  removeEventListener: () => {},
}
createTooltip(target, 'Hello')
listeners['mouseenter']()
if (target._appended && target._appended.textContent === 'Hello') { console.log("PASS") }
else { console.log("FAIL: tooltip not created") }`,
      },
      {
        description: 'removes tooltip on mouseleave',
        explanation: 'After mouseleave, the tooltip element must be removed.',
        testCode: `
function createTooltip(target, text) {
  let tooltip = null
  function show() { tooltip = { textContent: text, removed: false, remove() { this.removed = true; tooltip = null } } }
  function hide() { if (tooltip) { tooltip.remove() } }
  target.addEventListener('mouseenter', show)
  target.addEventListener('mouseleave', hide)
  return { destroy() {} }
}
const listeners = {}
const target = { addEventListener: (e, fn) => { listeners[e] = fn }, removeEventListener: () => {} }
createTooltip(target, 'tip')
listeners['mouseenter']()
const el = target
listeners['mouseleave']()
if (!el._tooltip) { console.log("PASS") } else { console.log("FAIL: tooltip not removed") }`,
      },
    ],
  },
}
export default challenge
