import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-event-delegation',
  title: 'Implement Event Delegation',
  description: 'Attach a single event listener to a parent element to handle clicks on dynamically added child elements — no direct listeners on children.',
  type: 'code',
  difficulty: 'mid',
  skills: ['dom-browser', 'performance'],
  content: {
    overview: `Instead of attaching a listener to every child element (expensive, breaks on dynamic content), attach one to a stable parent and use \`event.target\` to check what was clicked. This is how jQuery's delegated events work and why frameworks attach a single root listener.`,
    solution: `function setupDelegation(parent, selector, handler) {
  parent.addEventListener('click', (event) => {
    if (event.target.closest(selector)) {
      handler(event)
    }
  })
}`,
    explanation: `Event delegation exploits bubbling — clicks on a child element bubble up to ancestors. Instead of attaching listeners to every \`<li>\`, \`<button>\`, or dynamically added element (expensive, error-prone), you attach one listener to a stable parent and check \`event.target\`. \`closest()\` is safer than \`matches()\` because it handles clicks on child elements inside your target (e.g. clicking a \`<span>\` inside a \`<button>\`). This pattern is how jQuery's \`$(parent).on('click', selector, handler)\` works internally.`,
    hints: [
      'Event delegation works because events bubble up the DOM. Attach the listener to the parent, then check `event.target`.',
      'Use `event.target.matches(selector)` or `event.target.closest(selector)` to check if the click was on a matching child.',
      '`closest()` is safer — it handles clicks on children of your target element (e.g. clicking a `<span>` inside a `<button>`).',
    ],
    starterCode: `function setupDelegation(parent, selector, handler) {
  // attach ONE listener to parent
  // call handler(event) only when a click target matches selector
}`,
    testCases: [
      {
        description: 'calls handler when matching child is clicked',
        explanation: 'Verifies the selector check works — clicks on a .btn element must invoke the handler.',
        testCode: `
const parent = { listeners: {}, addEventListener(e, fn) { this.listeners[e] = fn } }
const calls = []
setupDelegation(parent, '.btn', (e) => calls.push(e.target.id))
const fakeEvent = { target: { id: 'b1', matches: (sel) => sel === '.btn', closest: (sel) => sel === '.btn' ? { id: 'b1' } : null } }
parent.listeners['click'](fakeEvent)
if (calls.length === 1 && calls[0] === 'b1') { console.log("PASS") }
else { console.log("FAIL: calls=" + JSON.stringify(calls)) }`,
      },
      {
        description: 'does not call handler for non-matching elements',
        explanation: 'Clicks on non-matching elements must be ignored — missing the selector check calls handler for every click on the page.',
        testCode: `
const parent = { listeners: {}, addEventListener(e, fn) { this.listeners[e] = fn } }
const calls = []
setupDelegation(parent, '.btn', () => calls.push(1))
const fakeEvent = { target: { matches: (sel) => false, closest: (sel) => null } }
parent.listeners['click'](fakeEvent)
if (calls.length === 0) { console.log("PASS") }
else { console.log("FAIL: handler should not have fired") }`,
      },
    ],
  },
}
export default challenge
