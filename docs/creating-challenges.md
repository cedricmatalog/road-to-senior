# Creating Challenges

This document covers everything you need to know to add a new challenge. Read it fully before writing your first one.

---

## The golden rule

Every challenge must be grounded in a real-world situation a working developer would actually face. Not "implement X" — "you're on a team and X just happened."

**Bad:** "Implement a debounce function."
**Good:** "Your search input fires an API call on every keystroke. Fix it so the call only fires when the user stops typing."

The scenario gives the technique a reason to exist. The user should feel like they're solving a real problem, not passing a test.

---

## File location and naming

```
data/challenges/<skill>-<topic>.ts
```

Examples:
- `async-retry.ts`
- `junior-prod-bug.ts`
- `testing-react-components.ts`

After creating the file, register it in `lib/challenges.ts` — add an import at the top and the variable to `ALL_CHALLENGES`.

---

## Challenge structure

Every challenge exports a single `Challenge` object. The shape depends on `type`.

### Required fields (both types)

| Field | Type | Notes |
|---|---|---|
| `slug` | `string` | Matches the filename without `.ts`. Must be unique. |
| `title` | `string` | Short, specific. Not "Implement X" — name the concept or situation. |
| `description` | `string` | One sentence. Grounds the challenge in a real situation. This is the card subtitle. |
| `type` | `'code' \| 'scenario'` | Code = the user writes JavaScript/TypeScript. Scenario = multiple choice. |
| `difficulty` | `'junior' \| 'mid' \| 'senior'` | See difficulty guide below. |
| `skills` | `SkillSlug[]` | 1–3 tags from the list below. |

---

## Difficulty guide

| Level | Who it's for | Code challenges | Scenario challenges |
|---|---|---|---|
| `junior` | 0–2 years exp | Core JS/TS syntax, simple DOM manipulation, reading errors | First PR feedback, production bug panic, asking for help, standup |
| `mid` | 2–5 years | Async patterns, closures, performance, testing utilities | Code review, debugging, estimation, cross-team communication |
| `senior` | 5+ years | TypeScript advanced types, architecture patterns, complex async | System design, mentoring, tech debt, incident response, tradeoffs |

---

## Valid skill slugs

```
javascript        async-js          error-handling    performance
architecture      testing           typescript        security
closures-scope    promises-concurrency  dom-browser

code-review       debugging         communication     mentoring
system-design     estimation        refactoring       api-design
observability     ci-cd             tradeoffs         incident-response
web-performance   accessibility     documentation
```

Use 1–3 skills. Use the most specific one first.

---

## Code challenges

The user writes JavaScript/TypeScript in an editor. Their code is run against `testCases` via the Judge0 API.

```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'performance-debounce',
  title: 'Debounce a Search Input',
  description: 'Your search input fires an API call on every keystroke. Fix it so the call only fires when the user stops typing.',
  type: 'code',
  difficulty: 'mid',
  skills: ['performance'],
  content: {
    overview: `...`,      // required — explain the concept with real context
    starterCode: `...`,   // required — the scaffold the user edits
    solution: `...`,      // required — the correct implementation
    explanation: `...`,   // required — why the solution works, what to watch out for
    hints: [...],         // optional — 2–4 progressive hints, ordered easy to hard
    testCases: [...],     // required — at least 3
  },
}
export default challenge
```

### `overview`

2–4 sentences. Explain:
1. What the concept is
2. Why it exists / what problem it solves
3. Where you encounter it in real codebases

Do not explain the solution. Do not repeat the description.

### `starterCode`

- Open with a 1–3 line comment explaining the real-world context (not "implement X")
- Provide a function signature — the user fills in the body
- Keep the scaffold minimal: no test harness, no `_lines`, no `assert` — just the function(s) to implement
- Use plain JavaScript unless the challenge is specifically about TypeScript types

```ts
starterCode: `// The search input calls fetchResults() on every keystroke.
// Wrap it so it only fires 300ms after the user stops typing.

function debounce(fn, wait) {
  // your code here
}`
```

### `solution`

The correct implementation, clean and idiomatic. No comments unless the logic genuinely needs explanation inline.

### `explanation`

3–6 sentences covering:
- Why this approach works
- The one thing people most commonly get wrong
- Real-world nuance (edge cases, production concerns, alternatives)

### `testCases`

Each test case:
- `description`: plain English, one line — what behaviour is being verified
- `testCode`: self-contained code that calls the user's function and uses `assert`
- `explanation` (optional): why this case matters

**Rules for `testCode`:**
- Use `assert.strictEqual(actual, expected)` for primitives
- Use `assert.deepEqual(actual, expected)` for objects/arrays
- Use `assert.ok(condition, message)` for custom checks
- Each test case is independent — do not rely on state from a previous case
- For DOM challenges: set `document.body.innerHTML` at the start of each `testCode`
- Always test the happy path, an edge case, and a failure/empty case

```ts
testCases: [
  {
    description: 'does not call fn during rapid successive calls',
    testCode: `
let calls = 0
const debounced = debounce(() => calls++, 50)
debounced(); debounced(); debounced()
await new Promise(r => setTimeout(r, 100))
assert.strictEqual(calls, 1)`,
  },
  {
    description: 'calls fn after wait period elapses',
    testCode: `
let result = null
const debounced = debounce((v) => { result = v }, 50)
debounced('hello')
await new Promise(r => setTimeout(r, 100))
assert.strictEqual(result, 'hello')`,
  },
  {
    description: 'resets timer on each call',
    testCode: `
let calls = 0
const debounced = debounce(() => calls++, 50)
debounced()
await new Promise(r => setTimeout(r, 30))
debounced()
await new Promise(r => setTimeout(r, 30))
assert.strictEqual(calls, 0, 'should not have fired yet')
await new Promise(r => setTimeout(r, 60))
assert.strictEqual(calls, 1)`,
  },
],
```

---

## Scenario challenges

The user reads a situation and picks the best option from 3 choices. No code is written.

```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-prod-bug',
  title: 'You Caused a Bug in Production',
  description: 'A bug made it to production and it\'s traced back to your last PR. What\'s your first move?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging', 'communication'],
  content: {
    overview: `...`,    // required — the principle being tested
    situation: `...`,   // required — the specific situation, first person
    options: [...],     // required — exactly 3 options, exactly 1 recommended
  },
}
export default challenge
```

### `overview`

2–3 sentences. State the underlying principle directly — not the answer, but the framework for thinking about it. The user reads this after answering.

### `situation`

Write in second person ("You're..."). Include:
- The specific context (team, codebase, what just happened)
- Concrete details (names, numbers, timelines) — not vague generalities
- Enough information to make all 3 options feel plausible

End with a clear question.

**Bad:** "You made a mistake at work. What do you do?"
**Good:** "Your feature shipped yesterday. This morning a user reports the checkout button doesn't work. Your tech lead traces the regression to your PR. A few dozen users are affected. What do you do first?"

### `options`

3 or 4. Exactly 1 must have `isRecommended: true`.

Each option:
- `id`: `'a'`, `'b'`, `'c'`
- `label`: the action the user would take — specific and actionable, not a principle
- `explanation`: why this is right or wrong. Be direct. Explain the consequence of the wrong choices, not just why the right one is right.
- `isRecommended`: `true` for exactly one

**Rules:**
- All 3 options must be things a reasonable developer might actually do
- Wrong options must be wrong for a real reason, not obviously bad
- The explanation for wrong options teaches as much as the right one
- Do not use "this is correct" or "this is wrong" — explain the outcome

```ts
options: [
  {
    id: 'a',
    label: 'Tell your lead immediately, offer to revert your PR, and investigate in parallel',
    explanation: 'Correct order: communicate → mitigate → investigate. A revert restores working behaviour in minutes...',
    isRecommended: true,
  },
  {
    id: 'b',
    label: 'Start debugging immediately to push a fix — faster than a revert',
    explanation: 'Debugging under pressure while users are blocked often takes longer than expected...',
    isRecommended: false,
  },
  {
    id: 'c',
    label: 'Wait to investigate before telling anyone — come with a solution, not just a problem',
    explanation: 'Coming with a solution sounds considerate but delays mitigation...',
    isRecommended: false,
  },
],
```

---

## Checklist before submitting

**Both types:**
- [ ] `slug` matches filename, is unique
- [ ] `description` is a real-world situation, not a spec ("Your X is doing Y" not "Implement X")
- [ ] `difficulty` is accurate for the intended audience
- [ ] All `skills` values are valid slugs from the list above
- [ ] File is imported and added to `ALL_CHALLENGES` in `lib/challenges.ts`
- [ ] `npx tsc --noEmit` passes with no errors
- [ ] `npx vitest run` passes

**Code challenges only:**
- [ ] `starterCode` has a real-world context comment, not "implement X"
- [ ] `testCases` has at least 3 cases: happy path, edge case, failure/empty
- [ ] Each `testCode` is self-contained (no shared state between cases)
- [ ] DOM challenges reset `document.body.innerHTML` at the start of each `testCode`

**Scenario challenges only:**
- [ ] `situation` is second person, specific, ends with a question
- [ ] 3 or 4 options, exactly 1 `isRecommended: true`
- [ ] All 3 options are things a real developer might choose
- [ ] Wrong option explanations explain the consequence, not just "this is wrong"
