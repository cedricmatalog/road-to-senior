import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'accessibility-semantic-html',
  title: 'Fix a Non-Semantic UI for Screen Readers',
  description: 'A page built entirely with divs and spans fails a screen reader audit. Identify the fixes.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['accessibility'],
  content: {
    overview: 'Semantic HTML gives meaning to structure. A <button> is focusable, activatable by keyboard, and announced as "button" by screen readers — a <div> with an onclick is none of those things without extra work. The rule: use the right HTML element before reaching for ARIA. ARIA should enhance semantics, not replace them.',
    situation: `A screen reader audit of your app's main page finds these issues:\n\n1. Navigation: <div class="nav"> with <span onclick="goto('/home')">Home</span> items\n2. Main content: <div class="article"> with no heading hierarchy — all text is in <p> tags\n3. Form: <div class="field"><div class="label">Email</div><div contenteditable="true" class="input"></div></div>\n4. Modal: <div class="modal" style="display:none"> shown via JavaScript with no focus management\n5. Icon-only close button: <div onclick="close()">✕</div>\n\nWhat changes do you recommend?`,
    options: [
      {
        id: 'a',
        label: 'Add tabindex="0" and onkeydown handlers to all the divs and spans so they\'re keyboard accessible',
        explanation: 'tabindex="0" makes elements focusable, but you\'re re-implementing what native elements give you for free — and doing it wrong. You need to handle Enter, Space, focus styles, and more. The right answer is to use the correct HTML element, which has all of this built in.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Replace div nav + span links with <nav> + <a href>, use heading hierarchy (<h1>, <h2>), replace contenteditable div with <input>, add role="dialog" + aria-modal + focus trap to modal, add aria-label to icon button',
        explanation: 'Each fix uses the right tool. <nav> is a landmark — screen readers can jump to it. <a> elements are keyboard focusable and announced as links. Heading hierarchy lets screen reader users navigate by headings (a primary navigation method). <input type="email"> has built-in validation, labels, and keyboard support that contenteditable lacks. Modals need role="dialog", aria-modal="true", aria-labelledby pointing to the title, and a focus trap (Tab should cycle within the modal). The close button needs aria-label="Close" since the ✕ character is meaningless to screen readers.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Add aria-label attributes to all the existing divs and spans to describe them',
        explanation: 'aria-label describes an element but doesn\'t give it the right role or keyboard behavior. A div with aria-label="Home" is still not focusable and not announced as a link or button. Use the right element first; add ARIA to enhance when needed.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Add a "Skip to main content" link at the top of the page to help keyboard users',
        explanation: 'A skip link is a good accessibility addition but it doesn\'t fix any of the five issues identified. It\'s an enhancement, not a fix.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
