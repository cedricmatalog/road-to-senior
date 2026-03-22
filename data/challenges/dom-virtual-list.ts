import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-virtual-list',
  title: 'Implement getVisibleItems for a Virtual List',
  description: 'A feed with 10,000 rows freezes the browser. Implement the visibility math that virtual list libraries use to only render what\'s on screen.',
  type: 'code',
  difficulty: 'senior',
  skills: ['dom-browser', 'performance'],
  content: {
    overview: `Rendering 10,000 DOM nodes is slow — virtual lists only render what's visible. The core math: given item height and scroll position, calculate which index range falls within the viewport. Libraries like react-window and TanStack Virtual do exactly this.`,
    starterCode: `// getVisibleItems(items, scrollTop, viewportHeight, itemHeight)
// returns only the items currently visible in the viewport.
// Each returned item: { item, index, top }

function getVisibleItems(items, scrollTop, viewportHeight, itemHeight) {
  // your code here
}`,
    solution: `function getVisibleItems(items, scrollTop, viewportHeight, itemHeight) {
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + viewportHeight) / itemHeight) - 1
  )
  return items.slice(startIndex, endIndex + 1).map((item, i) => ({
    item,
    index: startIndex + i,
    top: (startIndex + i) * itemHeight,
  }))
}`,
    explanation: `The math: \`scrollTop / itemHeight\` tells you which item starts the viewport. \`(scrollTop + viewportHeight) / itemHeight\` tells you which item ends it. Both use \`Math.floor\` (partial items count as visible). Each returned item includes its \`top\` offset so the render function can absolutely position it correctly, making the scrollable area appear to have all items even though only the visible ones exist in the DOM.`,
    hints: [
      'startIndex = Math.floor(scrollTop / itemHeight)',
      'endIndex = Math.floor((scrollTop + viewportHeight) / itemHeight), clamped to items.length - 1',
      'Return sliced items with their original index and top position (index * itemHeight).',
    ],
    testCases: [
      {
        description: 'returns only items in viewport',
        explanation: 'With itemHeight=50, viewport=200, scrollTop=0 — items 0-3 are visible (indices 0,1,2,3).',
        testCode: `
function getVisibleItems(items, scrollTop, viewportHeight, itemHeight) {
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + viewportHeight) / itemHeight) - 1)
  return items.slice(startIndex, endIndex + 1).map((item, i) => ({ item, index: startIndex + i, top: (startIndex + i) * itemHeight }))
}
const items = Array.from({ length: 100 }, (_, i) => 'item-' + i)
const visible = getVisibleItems(items, 0, 200, 50)
if (visible.length === 4 && visible[0].item === 'item-0' && visible[3].item === 'item-3') { console.log("PASS") }
else { console.log("FAIL: " + visible.map(v => v.item).join(', ')) }`,
      },
      {
        description: 'respects scroll offset',
        explanation: 'Scrolling down must shift which items are returned — scrollTop=100 with itemHeight=50 starts at item 2.',
        testCode: `
function getVisibleItems(items, scrollTop, viewportHeight, itemHeight) {
  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + viewportHeight) / itemHeight) - 1)
  return items.slice(startIndex, endIndex + 1).map((item, i) => ({ item, index: startIndex + i, top: (startIndex + i) * itemHeight }))
}
const items = Array.from({ length: 100 }, (_, i) => 'item-' + i)
const visible = getVisibleItems(items, 100, 100, 50)
if (visible[0].item === 'item-2' && visible[0].top === 100) { console.log("PASS") }
else { console.log("FAIL: first=" + visible[0]?.item + " top=" + visible[0]?.top) }`,
      },
    ],
  },
}
export default challenge
