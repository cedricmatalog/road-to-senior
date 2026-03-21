import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'accessibility-aria',
  title: 'Make a Custom Dropdown Accessible',
  description: 'Build a keyboard-navigable dropdown that works with screen readers.',
  type: 'code',
  difficulty: 'senior',
  skills: ['accessibility'],
  content: {
    overview: 'Native HTML elements (<select>, <button>, <input>) come with built-in accessibility. Custom components must implement the ARIA Authoring Practices Guide (APG) patterns manually — the right roles, states, and keyboard interactions. A dropdown (combobox or listbox pattern) needs: role="listbox" on the list, role="option" on items, aria-expanded on the trigger, aria-selected on the active item, and keyboard navigation (Enter, Escape, Arrow keys).',
    starterCode: `// Implement an accessible dropdown manager.
// It receives a list of options and tracks:
// - which option is currently selected
// - whether the dropdown is open
// - which option is focused (for keyboard nav)
//
// Methods:
// - open() — opens the dropdown
// - close() — closes the dropdown
// - selectOption(index) — selects the option at index, closes dropdown
// - focusNext() — moves focus to next option (wraps around)
// - focusPrev() — moves focus to previous option (wraps around)
// - getAriaProps() — returns the ARIA attributes for the trigger button:
//     { 'aria-expanded': boolean, 'aria-haspopup': 'listbox', 'aria-controls': string }
// - getOptionProps(index) — returns ARIA attributes for each option:
//     { role: 'option', 'aria-selected': boolean, id: string }

class AccessibleDropdown {
  constructor(options, id = 'dropdown') {
    // your code here
  }
}`,
    solution: `class AccessibleDropdown {
  constructor(options, id = 'dropdown') {
    this.options = options
    this.id = id
    this.isOpen = false
    this.selectedIndex = -1
    this.focusedIndex = -1
  }

  open() {
    this.isOpen = true
    this.focusedIndex = this.selectedIndex >= 0 ? this.selectedIndex : 0
  }

  close() {
    this.isOpen = false
    this.focusedIndex = -1
  }

  selectOption(index) {
    if (index < 0 || index >= this.options.length) return
    this.selectedIndex = index
    this.close()
  }

  focusNext() {
    if (!this.isOpen) return
    this.focusedIndex = (this.focusedIndex + 1) % this.options.length
  }

  focusPrev() {
    if (!this.isOpen) return
    this.focusedIndex = (this.focusedIndex - 1 + this.options.length) % this.options.length
  }

  getAriaProps() {
    return {
      'aria-expanded': this.isOpen,
      'aria-haspopup': 'listbox',
      'aria-controls': \`\${this.id}-listbox\`,
    }
  }

  getOptionProps(index) {
    return {
      role: 'option',
      'aria-selected': this.selectedIndex === index,
      id: \`\${this.id}-option-\${index}\`,
    }
  }
}`,
    explanation: 'The ARIA listbox pattern requires: aria-expanded on the trigger (not aria-open), aria-haspopup="listbox" to tell screen readers what will open, aria-controls linking the button to its listbox, role="option" on each item, and aria-selected to indicate which is chosen. Focus management (focusedIndex) is separate from selection (selectedIndex) — the user can arrow-key through options without selecting them. Wrap-around navigation (modulo arithmetic) matches the expected keyboard behavior from the ARIA APG spec.',
    hints: [
      'aria-expanded is a boolean — screen readers announce "collapsed" or "expanded" based on it.',
      'focusedIndex and selectedIndex are different: arrow keys move focus, Enter/click sets selection.',
      'Wrap-around: (index + 1) % length goes 0→1→2→0. For prev: (index - 1 + length) % length.',
    ],
    testCases: [
      {
        description: 'open() sets isOpen and focuses first option when none selected',
        testCode: `const d = new AccessibleDropdown(['A', 'B', 'C'])
d.open()
const ok = d.isOpen === true && d.focusedIndex === 0
console.log(ok ? 'PASS' : 'FAIL: isOpen=' + d.isOpen + ' focusedIndex=' + d.focusedIndex)`,
      },
      {
        description: 'selectOption() sets selectedIndex and closes dropdown',
        testCode: `const d = new AccessibleDropdown(['A', 'B', 'C'])
d.open()
d.selectOption(2)
const ok = d.selectedIndex === 2 && d.isOpen === false
console.log(ok ? 'PASS' : 'FAIL: selectedIndex=' + d.selectedIndex + ' isOpen=' + d.isOpen)`,
      },
      {
        description: 'focusNext() wraps around from last to first',
        testCode: `const d = new AccessibleDropdown(['A', 'B', 'C'])
d.open()
d.focusedIndex = 2
d.focusNext()
console.log(d.focusedIndex === 0 ? 'PASS' : 'FAIL: ' + d.focusedIndex)`,
      },
      {
        description: 'focusPrev() wraps around from first to last',
        testCode: `const d = new AccessibleDropdown(['A', 'B', 'C'])
d.open()
d.focusedIndex = 0
d.focusPrev()
console.log(d.focusedIndex === 2 ? 'PASS' : 'FAIL: ' + d.focusedIndex)`,
      },
      {
        description: 'getAriaProps() returns correct ARIA attributes',
        testCode: `const d = new AccessibleDropdown(['A', 'B'], 'my-dd')
d.open()
const props = d.getAriaProps()
const ok = props['aria-expanded'] === true && props['aria-haspopup'] === 'listbox' && props['aria-controls'] === 'my-dd-listbox'
console.log(ok ? 'PASS' : 'FAIL: ' + JSON.stringify(props))`,
      },
      {
        description: 'getOptionProps() returns role and aria-selected',
        testCode: `const d = new AccessibleDropdown(['A', 'B', 'C'], 'dd')
d.selectOption(1)
d.open()
const p0 = d.getOptionProps(0)
const p1 = d.getOptionProps(1)
const ok = p0.role === 'option' && p0['aria-selected'] === false && p1['aria-selected'] === true
console.log(ok ? 'PASS' : 'FAIL: ' + JSON.stringify({p0, p1}))`,
      },
    ],
  },
}
export default challenge
