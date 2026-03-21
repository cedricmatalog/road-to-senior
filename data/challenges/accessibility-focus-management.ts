import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'accessibility-focus-management',
  title: 'Implement a Focus Trap for a Modal',
  description: 'Build focus management logic that keeps keyboard focus inside an open modal.',
  type: 'code',
  difficulty: 'senior',
  skills: ['accessibility'],
  content: {
    overview: 'When a modal opens, keyboard focus must move into it, and Tab should cycle only within the modal\'s focusable elements until it closes. Without this, keyboard users tab through the entire page behind the modal — effectively locked out. This is the most commonly failed accessibility requirement for modals.',
    starterCode: `// Implement a FocusTrap class that manages focus within a modal.
//
// Constructor: takes an array of focusable element IDs (strings)
// Methods:
// - activate(initialFocusId?) — activates the trap, sets focus to initialFocusId
//   (or the first focusable element if not specified). Records which element
//   had focus before the trap activated (for restore on deactivate).
// - deactivate() — deactivates the trap and restores focus to the element
//   that had focus before activate() was called
// - handleTab(shiftKey) — given whether Shift is held, returns the ID of the
//   element that should receive focus next (cycles within the trapped elements)
// - getFocusedId() — returns the currently focused element ID within the trap

class FocusTrap {
  constructor(focusableIds) {
    // your code here
  }
}`,
    solution: `class FocusTrap {
  constructor(focusableIds) {
    this.focusableIds = focusableIds
    this.active = false
    this.currentIndex = 0
    this.previousFocusId = null
  }

  activate(initialFocusId = null) {
    this.active = true
    this.previousFocusId = (typeof document !== 'undefined' ? document.activeElement?.id : null) ?? null
    if (initialFocusId && this.focusableIds.includes(initialFocusId)) {
      this.currentIndex = this.focusableIds.indexOf(initialFocusId)
    } else {
      this.currentIndex = 0
    }
    return this.focusableIds[this.currentIndex]
  }

  deactivate() {
    this.active = false
    const prev = this.previousFocusId
    this.previousFocusId = null
    return prev
  }

  handleTab(shiftKey = false) {
    if (!this.active) return null
    if (shiftKey) {
      this.currentIndex = (this.currentIndex - 1 + this.focusableIds.length) % this.focusableIds.length
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.focusableIds.length
    }
    return this.focusableIds[this.currentIndex]
  }

  getFocusedId() {
    if (!this.active) return null
    return this.focusableIds[this.currentIndex]
  }
}`,
    explanation: 'The key behaviors: activate() records the previously focused element (so you can restore it when the modal closes — critical for keyboard UX), then sets focus to the first or specified element. handleTab() cycles within the trapped list using modulo arithmetic — forward wraps last→first, backward wraps first→last. deactivate() returns the previousFocusId so the caller can restore focus to whatever triggered the modal.',
    hints: [
      'Record document.activeElement before activating — you\'ll need it to restore focus when the modal closes.',
      'Tab cycling is the same wrap-around logic as arrow key navigation: (index + 1) % length.',
      'Shift+Tab goes backward: (index - 1 + length) % length.',
    ],
    testCases: [
      {
        description: 'activate() returns first focusable element ID',
        testCode: `const trap = new FocusTrap(['close-btn', 'confirm-btn', 'cancel-btn'])
const first = trap.activate()
console.log(first === 'close-btn' ? 'PASS' : 'FAIL: ' + first)`,
      },
      {
        description: 'activate() with initialFocusId focuses that element',
        testCode: `const trap = new FocusTrap(['close-btn', 'confirm-btn', 'cancel-btn'])
const focused = trap.activate('confirm-btn')
console.log(focused === 'confirm-btn' ? 'PASS' : 'FAIL: ' + focused)`,
      },
      {
        description: 'handleTab() cycles forward through elements',
        testCode: `const trap = new FocusTrap(['a', 'b', 'c'])
trap.activate()
const next = trap.handleTab(false)
console.log(next === 'b' ? 'PASS' : 'FAIL: ' + next)`,
      },
      {
        description: 'handleTab() wraps from last to first',
        testCode: `const trap = new FocusTrap(['a', 'b', 'c'])
trap.activate()
trap.handleTab(false) // b
trap.handleTab(false) // c
const wrapped = trap.handleTab(false) // back to a
console.log(wrapped === 'a' ? 'PASS' : 'FAIL: ' + wrapped)`,
      },
      {
        description: 'handleTab(true) cycles backward with Shift+Tab',
        testCode: `const trap = new FocusTrap(['a', 'b', 'c'])
trap.activate()
const prev = trap.handleTab(true) // wraps to c
console.log(prev === 'c' ? 'PASS' : 'FAIL: ' + prev)`,
      },
      {
        description: 'deactivate() returns the previously focused element ID',
        testCode: `const trap = new FocusTrap(['modal-btn'])
trap.previousFocusId = 'open-modal-btn' // simulate pre-activation focus
trap.active = true
const restored = trap.deactivate()
console.log(restored === 'open-modal-btn' ? 'PASS' : 'FAIL: ' + restored)`,
      },
    ],
  },
}
export default challenge
