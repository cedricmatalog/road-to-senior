import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-sanitize-input',
  title: 'Sanitize User Input Against XSS',
  description: 'A comment field renders user input directly into the page. A tester just injected a script tag. Fix it by escaping HTML before rendering.',
  type: 'code',
  difficulty: 'mid',
  skills: ['security'],
  content: {
    overview: `XSS attacks inject malicious scripts via user content that gets rendered as HTML. Escaping converts special characters to HTML entities so they display as text, never execute. The simplest defense — and often all you need for plain-text content.`,
    solution: `function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}`,
    explanation: `XSS happens when user-supplied text is rendered as HTML — \`<script>\` becomes executable code. Escaping converts special characters to their HTML entity equivalents so they're rendered as text, not parsed as markup. The order matters: escape \`&\` first, otherwise your own replacements (like \`&lt;\`) get double-escaped. In practice, use a library like DOMPurify for rich HTML, or better yet, use \`textContent\` instead of \`innerHTML\` — the DOM will escape for you automatically.`,
    hints: [
      'The five characters that must be escaped in HTML: `&`, `<`, `>`, `"`, `\'`.',
      '`&` must be replaced first — otherwise your replacements (like `&lt;`) will get double-escaped.',
      'Use `.replace()` with a regex and a lookup map, or chain multiple `.replace()` calls in the right order.',
    ],
    starterCode: `function escapeHtml(str) {
  // escape &, <, >, ", ' so the string is safe to inject into HTML
}`,
    testCases: [
      {
        description: 'escapes < and >',
        explanation: 'These are the most dangerous characters — they open and close HTML tags including <script>.',
        testCode: `
const result = escapeHtml('<script>alert(1)</script>')
if (result === '&lt;script&gt;alert(1)&lt;/script&gt;') { console.log("PASS") }
else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'escapes & first to avoid double-encoding',
        explanation: 'If you escape < before &, your own &lt; output gets double-escaped to &amp;lt;. & must go first.',
        testCode: `
const result = escapeHtml('a & b')
if (result === 'a &amp; b') { console.log("PASS") }
else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'escapes double quotes',
        explanation: 'Unescaped " breaks out of HTML attribute values — e.g. <input value="user input here">.',
        testCode: `
const result = escapeHtml('"hello"')
if (result === '&quot;hello&quot;') { console.log("PASS") }
else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'escapes single quotes',
        explanation: "Same as double quotes but for single-quoted attributes — <input value='user input'>.",
        testCode: `
const result = escapeHtml("it's fine")
if (result === "it&#39;s fine") { console.log("PASS") }
else { console.log("FAIL: got " + result) }`,
      },
      {
        description: 'passes through plain text unchanged',
        explanation: 'Plain text with no special characters must not be modified — over-escaping breaks legitimate content.',
        testCode: `
const result = escapeHtml('hello world 123')
if (result === 'hello world 123') { console.log("PASS") }
else { console.log("FAIL: got " + result) }`,
      },
    ],
  },
}
export default challenge
