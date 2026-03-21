# Road to Senior — Design Spec

**Date:** 2026-03-21
**Stack:** Next.js 14 (App Router) + Supabase
**Approach:** Content-first MVP — challenges and skill map ship first, auth/persistence added after

---

## Overview

An interactive web app that helps JavaScript developers at any level (self-taught, junior, mid-level) progress toward senior. Users explore coding challenges and scenario-based decision challenges freely, with a skill map showing their coverage across technical and mindset skill areas.

---

## Architecture

- **Framework:** Next.js 14 with App Router — server components for data fetching, client components for interactive UI
- **Database:** Supabase (Postgres) — challenges seeded via script, user progress added post-MVP
- **No separate backend** — Next.js server components and route handlers communicate directly with Supabase
- **Auth:** Deferred to post-MVP; Supabase Auth will be added once core content is validated

**Key routes:**
| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/challenges` | Browse all challenges (filterable by topic, type, difficulty) |
| `/challenges/[slug]` | Individual challenge (code editor or scenario view) |
| `/skill-map` | Visual skill coverage map |

---

## Challenge System

Two challenge types share a unified data model.

### Code Challenges
- Browser-based JS editor using **CodeMirror 6** (chosen over Monaco for smaller bundle size and better mobile behavior)
- User code runs against test cases via **Judge0 CE** (cloud-hosted, public API at `https://judge0-ce.p.rapidapi.com`)
- API key stored in `JUDGE0_API_KEY` environment variable (server-side only, never exposed to client)
- Pass/fail result with explanation displayed inline
- Runtime/compiler errors shown clearly — errors are learning opportunities

**Judge0 integration contract:**
- Request: `POST /submissions?base64_encoded=false&wait=true` with `{ source_code, language_id: 63 (Node.js 12), stdin: "" }`
- The app wraps user code with a test harness that `console.log`s `"PASS"` or `"FAIL: <message>"` for each test case
- Response: check `status.id` (3 = Accepted, 6 = Compilation Error, 11 = Runtime Error, etc.) and parse `stdout`
- Timeout: 10s per submission; if Judge0 returns no response, show retry error

### Scenario Challenges
- Realistic engineering situation presented as text (e.g., "a junior asks you to review their PR")
- User picks from 2–4 options
- Detailed tradeoff explanation shown for each choice; recommended answer highlighted

### Data Model

```ts
// Canonical skill slugs — must match SKILL_AREAS keys (see Skill Map section)
type SkillSlug =
  | 'async-js' | 'error-handling' | 'performance' | 'architecture'
  | 'testing' | 'typescript' | 'security' | 'closures-scope'
  | 'promises-concurrency' | 'dom-browser'
  | 'code-review' | 'debugging' | 'communication'
  | 'mentoring' | 'system-design' | 'estimation' | 'refactoring'

interface CodeContent {
  starterCode: string                        // shown in editor on load
  testCases: Array<{
    description: string                      // shown to user, e.g. "returns 0 for empty array"
    testCode: string                         // appended to user code by test harness
    // testCode uses: if (expr) { console.log("PASS") } else { console.log("FAIL: ...") }
  }>
}

interface ScenarioContent {
  situation: string                          // the scenario narrative
  options: Array<{
    id: string                               // e.g. "a", "b", "c"
    label: string                            // short option text shown on button
    explanation: string                      // full tradeoff explanation shown after selection
    isRecommended: boolean                   // exactly one option per scenario is true
  }>
}

interface Challenge {
  slug: string
  title: string
  description: string
  type: 'code' | 'scenario'
  difficulty: 'junior' | 'mid' | 'senior'
  skills: SkillSlug[]                        // validated against SKILL_AREAS at seed time
  content: CodeContent | ScenarioContent
}
```

---

## Skill Map

### Canonical Skill Areas

```ts
const SKILL_AREAS = {
  // Technical
  'async-js':             { label: 'Async JS',             category: 'technical' },
  'error-handling':       { label: 'Error Handling',        category: 'technical' },
  'performance':          { label: 'Performance',           category: 'technical' },
  'architecture':         { label: 'Architecture',          category: 'technical' },
  'testing':              { label: 'Testing',               category: 'technical' },
  'typescript':           { label: 'TypeScript',            category: 'technical' },
  'security':             { label: 'Security',              category: 'technical' },
  'closures-scope':       { label: 'Closures & Scope',      category: 'technical' },
  'promises-concurrency': { label: 'Promises & Concurrency',category: 'technical' },
  'dom-browser':          { label: 'DOM & Browser APIs',    category: 'technical' },
  // Engineering Mindset
  'code-review':          { label: 'Code Review',           category: 'mindset' },
  'debugging':            { label: 'Debugging',             category: 'mindset' },
  'communication':        { label: 'Communication',         category: 'mindset' },
  'mentoring':            { label: 'Mentoring',             category: 'mindset' },
  'system-design':        { label: 'System Design',         category: 'mindset' },
  'estimation':           { label: 'Estimation',            category: 'mindset' },
  'refactoring':          { label: 'Refactoring',           category: 'mindset' },
} as const
```

### Coverage Calculation

For each skill: `coverage = completedChallengesForSkill / totalChallengesForSkill` (0–1)

- `≤ 0.3` → highlighted as a gap (red/amber accent)
- `> 0.3` → normal display

Each skill card shows: skill name + single aggregate completion bar (0–100%). No difficulty breakdown on skill cards — YAGNI for MVP.

Clicking a skill card navigates to `/challenges?skill=<slug>`.

---

## Progress & State

### localStorage Schema

```ts
// Key: "rts:progress"
interface StoredProgress {
  version: 1
  completed: string[]   // array of challenge slugs
}
```

Reading: `JSON.parse(localStorage.getItem('rts:progress') ?? '{"version":1,"completed":[]}')`.
Writing: replace the full object on each completion.

### Sign-Up Prompt

- Shown **once per session** (not on every page) after a user completes their first challenge
- Dismissed by clicking X — dismissal stored in `sessionStorage` key `"rts:prompt-dismissed"`
- Copy: "Save your progress across devices — create a free account"
- Does not block any interaction

### State management

React Context (`ProgressContext`) wraps the app and exposes `{ completed: string[], markComplete(slug: string): void }`. Components read from context; context reads/writes localStorage.

**Post-MVP (authenticated):**
- Supabase table: `user_progress { user_id, challenge_slug, completed_at }`
- Skill map reads from DB
- On first sign-up: all slugs in localStorage migrated to DB in a single `upsert`

---

## Testing & Error Handling

**Testing:**
- Vitest — unit tests for challenge data validation (required fields, `skills` values must be valid `SkillSlug` keys, `isRecommended` count = 1 per scenario, etc.)
- React Testing Library — component tests for skill map coverage calculation and challenge completion flow
- No E2E tests for MVP

**Error handling:**
| Scenario | Handling |
|---|---|
| Supabase read failure | Empty state with retry, no page crash |
| Invalid challenge slug | Next.js `notFound()` |
| Judge0 unavailable / timeout | Friendly error with retry button; submission state reset |
| Code execution error | Show `stdout`/`stderr` inline with syntax highlight |
| localStorage unavailable (private mode) | Graceful degradation — progress not saved, no error thrown |

---

## MVP Scope

**In scope:**
- Challenge library (code + scenario types)
- Skill map with anonymous localStorage-based progress
- Filter/browse challenges by skill, type, difficulty
- Judge0 CE integration for code execution
- Challenge seed script
- CodeMirror 6 editor

**Out of scope (post-MVP):**
- User auth and accounts
- DB-backed progress persistence
- Comments, hints, or community features
- Mobile-optimized layout (responsive but not mobile-first)
- Admin UI for challenge authoring
- Difficulty breakdown per skill card
