# Road to Senior MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a content-first interactive web app where JavaScript developers browse coding and scenario challenges, run JS in the browser, and see their skill coverage on a visual skill map.

**Architecture:** Next.js 14 App Router with server components for data fetching and client components for interactive UI. Supabase Postgres stores challenges (seeded via script). Anonymous user progress is stored in localStorage via a React Context provider.

**Tech Stack:** Next.js 14, TypeScript, Supabase (Postgres + JS client), CodeMirror 6, Judge0 CE API, Vitest, React Testing Library, Tailwind CSS

---

## File Structure

```
src/
  app/
    layout.tsx                  # Root layout — wraps app in ProgressProvider
    page.tsx                    # Landing page
    challenges/
      page.tsx                  # Challenge list page (server component, reads ?skill, ?type, ?difficulty query params)
      [slug]/
        page.tsx                # Challenge detail page (server component, fetches challenge from Supabase)
        ChallengeDetailClient.tsx  # Client component: renders CodeChallenge or ScenarioChallenge, handles completion + prompt
    skill-map/
      page.tsx                  # Skill map page (client component, reads from ProgressContext)
  components/
    challenges/
      CodeChallenge.tsx         # Client component: CodeMirror editor + run button + result display
      ScenarioChallenge.tsx     # Client component: situation text + option buttons + explanation reveal
      ChallengeCard.tsx         # Server-renderable card used in /challenges list
      ChallengeFilters.tsx      # Client component: skill/type/difficulty filter controls
    skill-map/
      SkillMap.tsx              # Client component: grid of SkillCard components
      SkillCard.tsx             # Client component: skill name + completion bar + gap highlight
    ui/
      SignUpPrompt.tsx          # Client component: dismissable banner shown after first completion
  lib/
    types.ts                    # Challenge, CodeContent, ScenarioContent, SkillSlug, StoredProgress types
    skills.ts                   # SKILL_AREAS constant + SkillSlug type
    supabase.ts                 # Supabase client (server-side)
    judge0.ts                   # Judge0 API call + test harness builder
    progress.ts                 # localStorage read/write helpers (safe — handles private mode)
  context/
    ProgressContext.tsx         # ProgressContext + ProgressProvider + useProgress hook
  app/
    api/
      run/
        route.ts                # POST /api/run — server route handler that calls Judge0 (keeps API key server-side)
scripts/
  seed.ts                       # Seeds challenges table in Supabase from data/challenges/
data/
  challenges/
    async-js-promise-chain.ts   # One file per challenge, exports a Challenge object
    code-review-pr-feedback.ts
    # ... (at least 3 code + 3 scenario challenges for a usable seed)
supabase/
  migrations/
    001_challenges.sql          # Creates challenges table
tests/
  lib/
    skills.test.ts              # Unit tests: SKILL_AREAS shape, SkillSlug exhaustiveness
    progress.test.ts            # Unit tests: localStorage read/write/graceful degradation
    judge0.test.ts              # Unit tests: test harness builder, stdout parser
  data/
    challenges.test.ts          # Validates all challenge files in data/challenges/
  components/
    SkillCard.test.tsx          # RTL: coverage bar value, gap highlight threshold
    SkillMap.test.tsx           # RTL: renders all skill areas, gap skills flagged
    ScenarioChallenge.test.tsx  # RTL: option selection, explanation reveal, completion callback
    CodeChallenge.test.tsx      # RTL: editor renders starter code, submit triggers /api/run
  context/
    ProgressContext.test.tsx    # RTL: markComplete deduplication, useProgress throws outside provider
```

---

## Task 1: Project Bootstrap

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.env.local.example`

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd /home/cedri/projects/road-to-senior
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

Expected: project files created, `npm run dev` works.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install @supabase/supabase-js @uiw/react-codemirror @codemirror/lang-javascript @codemirror/theme-one-dark
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event tsx
```

> Note: `@uiw/react-codemirror` is the React wrapper for CodeMirror 6 — it bundles its own CodeMirror core. `tsx` is needed for the seed script. Do NOT also install the raw `codemirror` package as it conflicts.

- [ ] **Step 3: Configure Vitest**

Add to `package.json` scripts:
```json
"test": "vitest",
"test:run": "vitest run"
```

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

Create `tests/setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 4: Create `.env.local.example`**

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
JUDGE0_API_KEY=your-rapidapi-key
```

Copy to `.env.local` and fill in real values. The `SUPABASE_SERVICE_ROLE_KEY` is only used by the seed script — find it in Supabase dashboard → Project Settings → API → service_role secret. Never expose it client-side.

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Expected: server starts on http://localhost:3000 with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: bootstrap Next.js 14 project with Vitest and dependencies"
```

---

## Task 2: Types and Skill Areas

**Files:**
- Create: `lib/types.ts`
- Create: `lib/skills.ts`
- Create: `tests/lib/skills.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/lib/skills.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'

describe('SKILL_AREAS', () => {
  it('has exactly 17 entries', () => {
    expect(Object.keys(SKILL_AREAS)).toHaveLength(17)
  })

  it('every entry has label and category', () => {
    for (const [slug, area] of Object.entries(SKILL_AREAS)) {
      expect(area.label, `${slug} missing label`).toBeTruthy()
      expect(['technical', 'mindset']).toContain(area.category)
    }
  })

  it('SKILL_SLUGS matches SKILL_AREAS keys', () => {
    expect(SKILL_SLUGS).toEqual(Object.keys(SKILL_AREAS))
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/lib/skills.test.ts
```

Expected: FAIL — `SKILL_AREAS` not found.

- [ ] **Step 3: Create `lib/types.ts`**

```ts
export type SkillSlug =
  | 'async-js' | 'error-handling' | 'performance' | 'architecture'
  | 'testing' | 'typescript' | 'security' | 'closures-scope'
  | 'promises-concurrency' | 'dom-browser'
  | 'code-review' | 'debugging' | 'communication'
  | 'mentoring' | 'system-design' | 'estimation' | 'refactoring'

export interface CodeContent {
  starterCode: string
  testCases: Array<{
    description: string
    testCode: string
  }>
}

export interface ScenarioContent {
  situation: string
  options: Array<{
    id: string
    label: string
    explanation: string
    isRecommended: boolean
  }>
}

export interface Challenge {
  slug: string
  title: string
  description: string
  type: 'code' | 'scenario'
  difficulty: 'junior' | 'mid' | 'senior'
  skills: SkillSlug[]
  content: CodeContent | ScenarioContent
}

export interface StoredProgress {
  version: 1
  completed: string[]
}
```

- [ ] **Step 4: Create `lib/skills.ts`**

```ts
import type { SkillSlug } from './types'

export const SKILL_AREAS: Record<SkillSlug, { label: string; category: 'technical' | 'mindset' }> = {
  'async-js':             { label: 'Async JS',              category: 'technical' },
  'error-handling':       { label: 'Error Handling',         category: 'technical' },
  'performance':          { label: 'Performance',            category: 'technical' },
  'architecture':         { label: 'Architecture',           category: 'technical' },
  'testing':              { label: 'Testing',                category: 'technical' },
  'typescript':           { label: 'TypeScript',             category: 'technical' },
  'security':             { label: 'Security',               category: 'technical' },
  'closures-scope':       { label: 'Closures & Scope',       category: 'technical' },
  'promises-concurrency': { label: 'Promises & Concurrency', category: 'technical' },
  'dom-browser':          { label: 'DOM & Browser APIs',     category: 'technical' },
  'code-review':          { label: 'Code Review',            category: 'mindset' },
  'debugging':            { label: 'Debugging',              category: 'mindset' },
  'communication':        { label: 'Communication',          category: 'mindset' },
  'mentoring':            { label: 'Mentoring',              category: 'mindset' },
  'system-design':        { label: 'System Design',          category: 'mindset' },
  'estimation':           { label: 'Estimation',             category: 'mindset' },
  'refactoring':          { label: 'Refactoring',            category: 'mindset' },
}

export const SKILL_SLUGS = Object.keys(SKILL_AREAS) as SkillSlug[]
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npm run test:run tests/lib/skills.test.ts
```

Expected: PASS — 3 tests passing.

- [ ] **Step 6: Commit**

```bash
git add lib/types.ts lib/skills.ts tests/lib/skills.test.ts tests/setup.ts vitest.config.ts
git commit -m "feat: add types, skill areas constant, and skill tests"
```

---

## Task 3: Progress Helpers (localStorage)

**Files:**
- Create: `lib/progress.ts`
- Create: `tests/lib/progress.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/progress.test.ts`:
```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadProgress, saveProgress } from '@/lib/progress'

describe('loadProgress', () => {
  beforeEach(() => localStorage.clear())

  it('returns empty progress when nothing stored', () => {
    const p = loadProgress()
    expect(p).toEqual({ version: 1, completed: [] })
  })

  it('returns stored progress', () => {
    localStorage.setItem('rts:progress', JSON.stringify({ version: 1, completed: ['slug-1'] }))
    expect(loadProgress().completed).toContain('slug-1')
  })

  it('returns empty progress when localStorage throws (private mode)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    expect(loadProgress()).toEqual({ version: 1, completed: [] })
    vi.restoreAllMocks()
  })
})

describe('saveProgress', () => {
  beforeEach(() => localStorage.clear())

  it('persists completed slugs', () => {
    saveProgress({ version: 1, completed: ['slug-a'] })
    expect(localStorage.getItem('rts:progress')).toContain('slug-a')
  })

  it('silently ignores localStorage write errors', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    expect(() => saveProgress({ version: 1, completed: [] })).not.toThrow()
    vi.restoreAllMocks()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/lib/progress.test.ts
```

Expected: FAIL — `loadProgress` not found.

- [ ] **Step 3: Create `lib/progress.ts`**

```ts
import type { StoredProgress } from './types'

const KEY = 'rts:progress'
const DEFAULT: StoredProgress = { version: 1, completed: [] }

export function loadProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT
    return JSON.parse(raw) as StoredProgress
  } catch {
    return DEFAULT
  }
}

export function saveProgress(progress: StoredProgress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    // private mode or storage quota — silently ignore
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run tests/lib/progress.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add lib/progress.ts tests/lib/progress.test.ts
git commit -m "feat: add localStorage progress helpers with private-mode safety"
```

---

## Task 4: ProgressContext

**Files:**
- Create: `context/ProgressContext.tsx`
- Create: `tests/context/ProgressContext.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `tests/context/ProgressContext.test.tsx`:
```tsx
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ProgressProvider, useProgress } from '@/context/ProgressContext'

function TestConsumer() {
  const { completed, markComplete } = useProgress()
  return (
    <div>
      <span data-testid="count">{completed.length}</span>
      <button onClick={() => markComplete('slug-1')}>complete</button>
    </div>
  )
}

describe('ProgressContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts with empty completed list', () => {
    render(<ProgressProvider><TestConsumer /></ProgressProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('markComplete adds a slug', async () => {
    render(<ProgressProvider><TestConsumer /></ProgressProvider>)
    await act(async () => screen.getByText('complete').click())
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('markComplete is idempotent — does not duplicate slugs', async () => {
    render(<ProgressProvider><TestConsumer /></ProgressProvider>)
    await act(async () => { screen.getByText('complete').click(); screen.getByText('complete').click() })
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('useProgress throws when used outside provider', () => {
    // suppress console.error for expected throw
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow('useProgress must be used inside ProgressProvider')
    spy.mockRestore()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/context/ProgressContext.test.tsx
```

Expected: FAIL — `ProgressContext` not found.

- [ ] **Step 3: Create `context/ProgressContext.tsx`**

```tsx
'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { loadProgress, saveProgress } from '@/lib/progress'

interface ProgressContextValue {
  completed: string[]
  markComplete: (slug: string) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([])

  useEffect(() => {
    setCompleted(loadProgress().completed)
  }, [])

  const markComplete = useCallback((slug: string) => {
    setCompleted(prev => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      saveProgress({ version: 1, completed: next })
      return next
    })
  }, [])

  return (
    <ProgressContext.Provider value={{ completed, markComplete }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider')
  return ctx
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run tests/context/ProgressContext.test.tsx
```

Expected: PASS — 4 tests passing.

- [ ] **Step 5: Wrap root layout**

Edit `app/layout.tsx` — import `ProgressProvider` and wrap `{children}`:
```tsx
import { ProgressProvider } from '@/context/ProgressContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add context/ProgressContext.tsx tests/context/ProgressContext.test.tsx app/layout.tsx
git commit -m "feat: add ProgressContext with localStorage-backed progress state and tests"
```

---

## Task 5: Supabase Setup + Challenges Table

**Files:**
- Create: `lib/supabase.ts`
- Create: `supabase/migrations/001_challenges.sql`

- [ ] **Step 1: Create `supabase/migrations/001_challenges.sql`**

```sql
create table challenges (
  slug        text primary key,
  title       text not null,
  description text not null,
  type        text not null check (type in ('code', 'scenario')),
  difficulty  text not null check (difficulty in ('junior', 'mid', 'senior')),
  skills      text[] not null,
  content     jsonb not null,
  created_at  timestamptz default now()
);

-- Allow anyone to read challenges (public content)
alter table challenges enable row level security;
create policy "challenges are public" on challenges for select using (true);
```

Run this migration in your Supabase project dashboard (SQL editor) or via the Supabase CLI. The RLS policy allows public reads; writes are only done from the seed script which uses the service_role key (bypasses RLS).

- [ ] **Step 2: Create `lib/supabase.ts`**

```ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(url, key)
```

- [ ] **Step 3: Commit**

```bash
git add lib/supabase.ts supabase/migrations/001_challenges.sql
git commit -m "feat: add Supabase client and challenges table migration"
```

---

## Task 6: Challenge Seed Data + Seed Script

**Files:**
- Create: `data/challenges/async-promise-chain.ts`
- Create: `data/challenges/closures-counter.ts`
- Create: `data/challenges/error-handling-fetch.ts`
- Create: `data/challenges/code-review-pr-feedback.ts`
- Create: `data/challenges/debugging-silent-bug.ts`
- Create: `data/challenges/system-design-rate-limit.ts`
- Create: `tests/data/challenges.test.ts`
- Create: `scripts/seed.ts`

- [ ] **Step 1: Write the challenge validation test**

Create `tests/data/challenges.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { SKILL_SLUGS } from '@/lib/skills'
import type { Challenge, ScenarioContent } from '@/lib/types'

// Import all challenge files
import asyncPromiseChain from '@/data/challenges/async-promise-chain'
import closuresCounter from '@/data/challenges/closures-counter'
import errorHandlingFetch from '@/data/challenges/error-handling-fetch'
import codeReviewPrFeedback from '@/data/challenges/code-review-pr-feedback'
import debuggingSilentBug from '@/data/challenges/debugging-silent-bug'
import systemDesignRateLimit from '@/data/challenges/system-design-rate-limit'

const allChallenges: Challenge[] = [
  asyncPromiseChain, closuresCounter, errorHandlingFetch,
  codeReviewPrFeedback, debuggingSilentBug, systemDesignRateLimit,
]

describe('challenge data validation', () => {
  it('all challenges have required fields', () => {
    for (const c of allChallenges) {
      expect(c.slug, `${c.slug} missing slug`).toBeTruthy()
      expect(c.title, `${c.slug} missing title`).toBeTruthy()
      expect(c.description, `${c.slug} missing description`).toBeTruthy()
      expect(['code', 'scenario']).toContain(c.type)
      expect(['junior', 'mid', 'senior']).toContain(c.difficulty)
    }
  })

  it('all skill tags are valid SkillSlugs', () => {
    for (const c of allChallenges) {
      for (const skill of c.skills) {
        expect(SKILL_SLUGS, `${c.slug} has unknown skill: ${skill}`).toContain(skill)
      }
    }
  })

  it('scenario challenges have exactly one recommended option', () => {
    for (const c of allChallenges.filter(c => c.type === 'scenario')) {
      const content = c.content as ScenarioContent
      const recommended = content.options.filter(o => o.isRecommended)
      expect(recommended, `${c.slug} must have exactly 1 recommended option`).toHaveLength(1)
    }
  })

  it('code challenges have at least one test case', () => {
    for (const c of allChallenges.filter(c => c.type === 'code')) {
      const content = c.content as { testCases: unknown[] }
      expect(content.testCases.length, `${c.slug} needs at least 1 test case`).toBeGreaterThan(0)
    }
  })

  it('all slugs are unique', () => {
    const slugs = allChallenges.map(c => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/data/challenges.test.ts
```

Expected: FAIL — challenge files not found.

- [ ] **Step 3: Create challenge seed data files**

Create `data/challenges/async-promise-chain.ts`:
```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-promise-chain',
  title: 'Fix a Broken Promise Chain',
  description: 'A promise chain is silently swallowing errors. Identify and fix the bug.',
  type: 'code',
  difficulty: 'junior',
  skills: ['async-js', 'error-handling'],
  content: {
    starterCode: `function fetchUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
    .then(data => data.user)
    .catch(err => console.log(err))
}`,
    testCases: [
      {
        description: 'returns the user object on success',
        testCode: `
const mockFetch = () => Promise.resolve({ json: () => Promise.resolve({ user: { id: 1 } }) })
global.fetch = mockFetch
fetchUser(1).then(user => {
  if (user && user.id === 1) { console.log("PASS") } else { console.log("FAIL: expected user object") }
})`,
      },
      {
        description: 'rejects (does not swallow) on network error',
        testCode: `
global.fetch = () => Promise.reject(new Error('network error'))
fetchUser(1).then(() => {
  console.log("FAIL: should have rejected")
}).catch(err => {
  if (err.message === 'network error') { console.log("PASS") } else { console.log("FAIL: wrong error") }
})`,
      },
    ],
  },
}

export default challenge
```

Create `data/challenges/closures-counter.ts`:
```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'closures-counter',
  title: 'Build a Counter with Closures',
  description: 'Implement a counter factory using closures — no classes allowed.',
  type: 'code',
  difficulty: 'junior',
  skills: ['closures-scope'],
  content: {
    starterCode: `function makeCounter(start = 0) {
  // return an object with increment, decrement, and value methods
}`,
    testCases: [
      {
        description: 'increment increases value by 1',
        testCode: `
const c = makeCounter(0)
c.increment()
if (c.value() === 1) { console.log("PASS") } else { console.log("FAIL: expected 1, got " + c.value()) }`,
      },
      {
        description: 'counters are independent',
        testCode: `
const a = makeCounter(0); const b = makeCounter(10)
a.increment(); a.increment()
if (a.value() === 2 && b.value() === 10) { console.log("PASS") } else { console.log("FAIL: counters shared state") }`,
      },
    ],
  },
}

export default challenge
```

Create `data/challenges/error-handling-fetch.ts`:
```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'error-handling-fetch',
  title: 'Robust Fetch with Error Handling',
  description: 'Write a fetch wrapper that handles network errors, non-2xx responses, and JSON parse failures gracefully.',
  type: 'code',
  difficulty: 'mid',
  skills: ['error-handling', 'async-js'],
  content: {
    starterCode: `async function safeFetch(url) {
  // Should return { data, error } — never throw
}`,
    testCases: [
      {
        description: 'returns data on success',
        testCode: `
global.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ name: 'Alice' }) })
safeFetch('/api/user').then(({ data, error }) => {
  if (data?.name === 'Alice' && !error) { console.log("PASS") } else { console.log("FAIL: " + JSON.stringify({ data, error })) }
})`,
      },
      {
        description: 'returns error on non-2xx status',
        testCode: `
global.fetch = () => Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
safeFetch('/api/user').then(({ data, error }) => {
  if (!data && error) { console.log("PASS") } else { console.log("FAIL: should have error for 404") }
})`,
      },
    ],
  },
}

export default challenge
```

Create `data/challenges/code-review-pr-feedback.ts`:
```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-pr-feedback',
  title: 'Giving Effective PR Feedback',
  description: 'A junior developer submitted a PR with a subtle bug and unclear naming. How do you respond?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['code-review', 'mentoring'],
  content: {
    situation: `A junior dev on your team opened a PR. The code works in tests, but you spot two issues: a variable named \`data\` that's actually an array of users, and a \`.catch(console.log)\` that silently swallows errors in production. The junior is enthusiastic and this is their third PR. How do you give feedback?`,
    options: [
      {
        id: 'a',
        label: 'Request changes with specific inline comments explaining each issue',
        explanation: 'This is the recommended approach. Specific inline comments give the junior exact context, help them learn the "why", and show respect for their work. Mention what\'s good too — positivity reinforces what to keep.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Approve the PR and fix the issues yourself in a follow-up commit',
        explanation: 'This avoids friction but misses a teaching moment. The junior doesn\'t learn, and you\'ve set a precedent where they don\'t need to worry about error handling or naming.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Leave a general comment: "There are some issues here, please fix before merging"',
        explanation: 'Too vague. The junior doesn\'t know what to fix or how. Vague feedback creates anxiety and forces them to guess, which wastes everyone\'s time.',
        isRecommended: false,
      },
    ],
  },
}

export default challenge
```

Create `data/challenges/debugging-silent-bug.ts`:
```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-silent-bug',
  title: 'Debug a Silent Failure',
  description: 'A function returns undefined instead of the expected result, but throws no error. What\'s your debugging approach?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging'],
  content: {
    situation: `You're debugging a function called \`getActiveUsers()\` that should return an array. Callers are getting \`undefined\` instead. The function calls \`fetch()\`, parses JSON, and filters the result. No errors appear in the console. What do you do first?`,
    options: [
      {
        id: 'a',
        label: 'Add console.log at each step of the function to trace where undefined appears',
        explanation: 'Good instinct and often the fastest path. Adding strategic logs at the fetch response, JSON parse, and filter step quickly narrows down where undefined enters. In production you\'d use a debugger, but for quick investigation this is perfectly valid.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Rewrite the function from scratch since something must be fundamentally wrong',
        explanation: 'Never rewrite before you understand the bug. You\'ll likely reproduce the same bug. Always diagnose before fixing.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Check if the function has a missing return statement',
        explanation: 'A missing return is a plausible cause, but checking it first without evidence is guessing. You might get lucky, but systematic logging is more reliable for any non-obvious bug.',
        isRecommended: false,
      },
    ],
  },
}

export default challenge
```

Create `data/challenges/system-design-rate-limit.ts`:
```ts
import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-rate-limit',
  title: 'Design a Simple Rate Limiter',
  description: 'Your API is being hammered by a single client. How do you design a basic rate limiter?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    situation: `A single client is making 10,000 requests per minute to your REST API, causing slow responses for everyone else. You need to add rate limiting. Your stack is Node.js with Redis available. You need to ship something in 2 hours. What approach do you take?`,
    options: [
      {
        id: 'a',
        label: 'Use a sliding window counter in Redis with a TTL key per client IP',
        explanation: 'This is the right call for a 2-hour window. Redis INCR with EXPIRE gives you an atomic, fast, persistent counter per client. Sliding window is more accurate than fixed window (no burst at boundary). A good library like `rate-limiter-flexible` wraps this pattern and saves you from edge cases.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Implement an in-memory token bucket per client in the Node.js process',
        explanation: 'Works for a single server, but breaks immediately when you scale to multiple instances — each server has its own bucket. Since Redis is available, use it.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Block the offending IP at the infrastructure level (firewall/load balancer)',
        explanation: 'Reasonable as an emergency measure, but it\'s not a rate limiter — it\'s a ban. Real rate limiting should allow legitimate traffic below the threshold and be configurable per client, not a blunt block.',
        isRecommended: false,
      },
    ],
  },
}

export default challenge
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run tests/data/challenges.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Create `scripts/seed.ts`**

```ts
import { createClient } from '@supabase/supabase-js'
import asyncPromiseChain from '../data/challenges/async-promise-chain'
import closuresCounter from '../data/challenges/closures-counter'
import errorHandlingFetch from '../data/challenges/error-handling-fetch'
import codeReviewPrFeedback from '../data/challenges/code-review-pr-feedback'
import debuggingSilentBug from '../data/challenges/debugging-silent-bug'
import systemDesignRateLimit from '../data/challenges/system-design-rate-limit'

const challenges = [
  asyncPromiseChain, closuresCounter, errorHandlingFetch,
  codeReviewPrFeedback, debuggingSilentBug, systemDesignRateLimit,
]

async function seed() {
  // Use service_role key — bypasses RLS so we can write. Never expose this client-side.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase
    .from('challenges')
    .upsert(challenges, { onConflict: 'slug' })

  if (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }

  console.log(`Seeded ${challenges.length} challenges.`)
}

seed()
```

Add to `package.json` scripts:
```json
"seed": "npx tsx scripts/seed.ts"
```

(`tsx` was already installed in Task 1 Step 2.)

- [ ] **Step 6: Run the seed**

```bash
npm run seed
```

Expected: `Seeded 6 challenges.`

- [ ] **Step 7: Commit**

```bash
git add data/ tests/data/ scripts/ supabase/
git commit -m "feat: add 6 seed challenges (3 code, 3 scenario) with validation tests"
```

---

## Task 7: Judge0 Integration

**Files:**
- Create: `lib/judge0.ts`
- Create: `app/api/run/route.ts`
- Create: `tests/lib/judge0.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/judge0.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { buildSubmissionCode, parseResults } from '@/lib/judge0'

describe('buildSubmissionCode', () => {
  it('appends test harness code to user code', () => {
    const result = buildSubmissionCode('const x = 1', [{ description: 'x is 1', testCode: 'if(x===1){console.log("PASS")}else{console.log("FAIL")}' }])
    expect(result).toContain('const x = 1')
    expect(result).toContain('PASS')
  })
})

describe('parseResults', () => {
  it('parses all PASS lines as passed', () => {
    const results = parseResults('PASS\nPASS\n', ['test 1', 'test 2'])
    expect(results).toEqual([
      { description: 'test 1', passed: true, message: null },
      { description: 'test 2', passed: true, message: null },
    ])
  })

  it('parses FAIL lines with message', () => {
    const results = parseResults('PASS\nFAIL: wrong value\n', ['test 1', 'test 2'])
    expect(results[1]).toEqual({ description: 'test 2', passed: false, message: 'wrong value' })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/lib/judge0.test.ts
```

Expected: FAIL — `buildSubmissionCode` not found.

- [ ] **Step 3: Create `lib/judge0.ts`**

```ts
export interface TestResult {
  description: string
  passed: boolean
  message: string | null
}

export function buildSubmissionCode(
  userCode: string,
  testCases: Array<{ description: string; testCode: string }>
): string {
  const harness = testCases.map(tc => tc.testCode).join('\n')
  return `${userCode}\n\n// --- test harness ---\n${harness}`
}

export function parseResults(stdout: string, descriptions: string[]): TestResult[] {
  const lines = stdout.trim().split('\n')
  return descriptions.map((description, i) => {
    const line = lines[i] ?? ''
    if (line === 'PASS') return { description, passed: true, message: null }
    const message = line.startsWith('FAIL: ') ? line.slice(6) : line || 'No output'
    return { description, passed: false, message }
  })
}

export async function runCode(
  userCode: string,
  testCases: Array<{ description: string; testCode: string }>
): Promise<{ results: TestResult[]; compileError: string | null; runtimeError: string | null }> {
  const source_code = buildSubmissionCode(userCode, testCases)

  const res = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    body: JSON.stringify({ source_code, language_id: 63, stdin: '' }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) throw new Error(`Judge0 HTTP ${res.status}`)

  const data = await res.json()

  if (data.status?.id === 6) {
    return { results: [], compileError: data.compile_output ?? 'Compilation error', runtimeError: null }
  }
  if (data.status?.id === 11) {
    return { results: [], compileError: null, runtimeError: data.stderr ?? 'Runtime error' }
  }

  const descriptions = testCases.map(tc => tc.description)
  return {
    results: parseResults(data.stdout ?? '', descriptions),
    compileError: null,
    runtimeError: null,
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run tests/lib/judge0.test.ts
```

Expected: PASS — 3 tests passing.

- [ ] **Step 5: Create `app/api/run/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { runCode } from '@/lib/judge0'

export async function POST(req: NextRequest) {
  const { userCode, testCases } = await req.json()

  if (!userCode || !testCases) {
    return NextResponse.json({ error: 'Missing userCode or testCases' }, { status: 400 })
  }

  try {
    const result = await runCode(userCode, testCases)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add lib/judge0.ts app/api/run/route.ts tests/lib/judge0.test.ts
git commit -m "feat: add Judge0 integration with test harness builder and /api/run route"
```

---

## Task 8: SkillCard and SkillMap Components

**Files:**
- Create: `components/skill-map/SkillCard.tsx`
- Create: `components/skill-map/SkillMap.tsx`
- Create: `tests/components/SkillCard.test.tsx`
- Create: `tests/components/SkillMap.test.tsx`

- [ ] **Step 1: Write failing tests**

Create `tests/components/SkillCard.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkillCard } from '@/components/skill-map/SkillCard'

describe('SkillCard', () => {
  it('displays skill label', () => {
    render(<SkillCard label="Async JS" coverage={0.5} slug="async-js" />)
    expect(screen.getByText('Async JS')).toBeInTheDocument()
  })

  it('shows gap indicator when coverage <= 0.3', () => {
    render(<SkillCard label="Async JS" coverage={0.2} slug="async-js" />)
    expect(screen.getByTestId('skill-card')).toHaveAttribute('data-gap', 'true')
  })

  it('does not show gap indicator when coverage > 0.3', () => {
    render(<SkillCard label="Async JS" coverage={0.5} slug="async-js" />)
    expect(screen.getByTestId('skill-card')).toHaveAttribute('data-gap', 'false')
  })

  it('completion bar width reflects coverage percentage', () => {
    render(<SkillCard label="Async JS" coverage={0.75} slug="async-js" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '75')
  })
})
```

Create `tests/components/SkillMap.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SkillMap } from '@/components/skill-map/SkillMap'

vi.mock('@/context/ProgressContext', () => ({
  useProgress: () => ({ completed: ['async-promise-chain'], markComplete: vi.fn() }),
}))

// Minimal challenge list for testing
const mockChallenges = [
  { slug: 'async-promise-chain', skills: ['async-js'], type: 'code', difficulty: 'junior', title: '', description: '', content: { starterCode: '', testCases: [] } },
  { slug: 'closures-counter', skills: ['closures-scope'], type: 'code', difficulty: 'junior', title: '', description: '', content: { starterCode: '', testCases: [] } },
]

describe('SkillMap', () => {
  it('renders a card for every skill area', () => {
    render(<SkillMap challenges={mockChallenges as any} />)
    expect(screen.getByText('Async JS')).toBeInTheDocument()
    expect(screen.getByText('Closures & Scope')).toBeInTheDocument()
  })

  it('shows gap for skills with 0 completion', () => {
    render(<SkillMap challenges={mockChallenges as any} />)
    // closures-scope has 1 challenge, 0 completed — should be marked as a gap
    const gapCards = screen.getAllByTestId('skill-card').filter(el => el.getAttribute('data-gap') === 'true')
    expect(gapCards.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run tests/components/SkillCard.test.tsx tests/components/SkillMap.test.tsx
```

Expected: FAIL — components not found.

- [ ] **Step 3: Create `components/skill-map/SkillCard.tsx`**

```tsx
'use client'

import Link from 'next/link'

interface SkillCardProps {
  label: string
  slug: string
  coverage: number  // 0-1
}

export function SkillCard({ label, slug, coverage }: SkillCardProps) {
  const isGap = coverage <= 0.3
  const pct = Math.round(coverage * 100)

  return (
    <Link
      href={`/challenges?skill=${slug}`}
      data-testid="skill-card"
      data-gap={String(isGap)}
      className={`block rounded-lg border p-4 hover:shadow-md transition-shadow ${isGap ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-white'}`}
    >
      <p className="font-medium text-sm text-gray-800 mb-2">{label}</p>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} completion: ${pct}%`}
        className="h-2 rounded-full bg-gray-100 overflow-hidden"
      >
        <div
          className={`h-full rounded-full ${isGap ? 'bg-amber-400' : 'bg-green-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{pct}% complete</p>
    </Link>
  )
}
```

- [ ] **Step 4: Create `components/skill-map/SkillMap.tsx`**

```tsx
'use client'

import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'
import { useProgress } from '@/context/ProgressContext'
import { SkillCard } from './SkillCard'

interface SkillMapProps {
  challenges: Array<{ slug: string; skills: string[] }>
}

export function SkillMap({ challenges }: SkillMapProps) {
  const { completed } = useProgress()

  function coverageFor(slug: string): number {
    const total = challenges.filter(c => c.skills.includes(slug)).length
    if (total === 0) return 0
    const done = challenges.filter(c => c.skills.includes(slug) && completed.includes(c.slug)).length
    return done / total
  }

  const technical = SKILL_SLUGS.filter(s => SKILL_AREAS[s].category === 'technical')
  const mindset = SKILL_SLUGS.filter(s => SKILL_AREAS[s].category === 'mindset')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Technical</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {technical.map(slug => (
            <SkillCard key={slug} slug={slug} label={SKILL_AREAS[slug].label} coverage={coverageFor(slug)} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Engineering Mindset</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {mindset.map(slug => (
            <SkillCard key={slug} slug={slug} label={SKILL_AREAS[slug].label} coverage={coverageFor(slug)} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test:run tests/components/SkillCard.test.tsx tests/components/SkillMap.test.tsx
```

Expected: PASS — all tests passing.

- [ ] **Step 6: Commit**

```bash
git add components/skill-map/ tests/components/SkillCard.test.tsx tests/components/SkillMap.test.tsx
git commit -m "feat: add SkillCard and SkillMap components with coverage calculation"
```

---

## Task 9: ScenarioChallenge Component

**Files:**
- Create: `components/challenges/ScenarioChallenge.tsx`
- Create: `tests/components/ScenarioChallenge.test.tsx`

- [ ] **Step 1: Write failing test**

Create `tests/components/ScenarioChallenge.test.tsx`:
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ScenarioChallenge } from '@/components/challenges/ScenarioChallenge'
import type { ScenarioContent } from '@/lib/types'

const content: ScenarioContent = {
  situation: 'A junior asks you for feedback on their PR.',
  options: [
    { id: 'a', label: 'Give specific inline comments', explanation: 'Best approach because...', isRecommended: true },
    { id: 'b', label: 'Approve and fix yourself', explanation: 'Misses teaching moment.', isRecommended: false },
  ],
}

describe('ScenarioChallenge', () => {
  it('renders the situation text', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByText(/junior asks/)).toBeInTheDocument()
  })

  it('renders all option buttons', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByText('Give specific inline comments')).toBeInTheDocument()
    expect(screen.getByText('Approve and fix yourself')).toBeInTheDocument()
  })

  it('reveals explanation after selecting an option', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    fireEvent.click(screen.getByText('Give specific inline comments'))
    expect(screen.getByText(/Best approach because/)).toBeInTheDocument()
  })

  it('calls onComplete after selecting an option', () => {
    const onComplete = vi.fn()
    render(<ScenarioChallenge content={content} onComplete={onComplete} />)
    fireEvent.click(screen.getByText('Give specific inline comments'))
    expect(onComplete).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/components/ScenarioChallenge.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create `components/challenges/ScenarioChallenge.tsx`**

```tsx
'use client'

import { useState } from 'react'
import type { ScenarioContent } from '@/lib/types'

interface ScenarioChallengeProps {
  content: ScenarioContent
  onComplete: () => void
}

export function ScenarioChallenge({ content, onComplete }: ScenarioChallengeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleSelect(id: string) {
    if (selectedId) return  // already answered
    setSelectedId(id)
    onComplete()
  }

  const selected = content.options.find(o => o.id === selectedId)

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p className="text-gray-800 leading-relaxed">{content.situation}</p>
      </div>

      <div className="space-y-3">
        {content.options.map(option => {
          const isSelected = selectedId === option.id
          const isAnswered = selectedId !== null
          const isRecommended = option.isRecommended

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered && !isSelected}
              className={`w-full text-left rounded-lg border p-4 transition-colors
                ${isAnswered && isSelected && isRecommended ? 'border-green-500 bg-green-50' : ''}
                ${isAnswered && isSelected && !isRecommended ? 'border-red-400 bg-red-50' : ''}
                ${!isAnswered ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50' : ''}
                ${isAnswered && !isSelected ? 'opacity-40 cursor-default' : 'cursor-pointer'}
              `}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>

      {selected && (
        <div className={`rounded-lg p-4 ${selected.isRecommended ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <p className="text-sm font-semibold mb-1">{selected.isRecommended ? 'Good choice!' : 'Worth reconsidering'}</p>
          <p className="text-sm text-gray-700">{selected.explanation}</p>
          {!selected.isRecommended && (
            <p className="text-sm text-gray-500 mt-2">
              Recommended: <strong>{content.options.find(o => o.isRecommended)?.label}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run tests/components/ScenarioChallenge.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/challenges/ScenarioChallenge.tsx tests/components/ScenarioChallenge.test.tsx
git commit -m "feat: add ScenarioChallenge component with option reveal and completion callback"
```

---

## Task 10: CodeChallenge Component

**Files:**
- Create: `components/challenges/CodeChallenge.tsx`
- Create: `tests/components/CodeChallenge.test.tsx`

- [ ] **Step 1: Write failing test**

Create `tests/components/CodeChallenge.test.tsx`:
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CodeChallenge } from '@/components/challenges/CodeChallenge'
import type { CodeContent } from '@/lib/types'

// CodeMirror does not render meaningfully in jsdom — mock the whole editor.
// This lets us test the submit flow and result display without CodeMirror's DOM complexity.
vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <textarea data-testid="code-editor" value={value} onChange={e => onChange(e.target.value)} />
  ),
}))

const content: CodeContent = {
  starterCode: 'function add(a, b) { return a + b }',
  testCases: [{ description: 'adds two numbers', testCode: 'if(add(1,2)===3){console.log("PASS")}' }],
}

describe('CodeChallenge', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('renders the editor with starter code', () => {
    render(<CodeChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByTestId('code-editor')).toHaveValue('function add(a, b) { return a + b }')
  })

  it('shows Run Tests button', () => {
    render(<CodeChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByRole('button', { name: /run tests/i })).toBeInTheDocument()
  })

  it('calls /api/run and displays results on submit', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [{ description: 'adds two numbers', passed: true, message: null }], compileError: null, runtimeError: null }),
    })
    global.fetch = mockFetch

    const onComplete = vi.fn()
    render(<CodeChallenge content={content} onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /run tests/i }))

    await waitFor(() => expect(screen.getByText('adds two numbers')).toBeInTheDocument())
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('shows error message when /api/run fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 503 })
    render(<CodeChallenge content={content} onComplete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /run tests/i }))
    await waitFor(() => expect(screen.getByText(/try again/i)).toBeInTheDocument())
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run tests/components/CodeChallenge.test.tsx
```

Expected: FAIL.

- [ ] **Step 3: Create `components/challenges/CodeChallenge.tsx`**

```tsx
'use client'

import { useState, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import type { CodeContent } from '@/lib/types'
import type { TestResult } from '@/lib/judge0'

interface CodeChallengeProps {
  content: CodeContent
  onComplete: () => void
}

export function CodeChallenge({ content, onComplete }: CodeChallengeProps) {
  const [code, setCode] = useState(content.starterCode)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [compileError, setCompileError] = useState<string | null>(null)
  const [runtimeError, setRuntimeError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const completedRef = useRef(false)

  async function handleRun() {
    setLoading(true)
    setFetchError(null)
    setResults(null)
    setCompileError(null)
    setRuntimeError(null)

    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userCode: code, testCases: content.testCases }),
      })

      if (!res.ok) throw new Error(`Server error ${res.status}`)

      const data = await res.json()
      setResults(data.results ?? null)
      setCompileError(data.compileError ?? null)
      setRuntimeError(data.runtimeError ?? null)

      const allPassed = data.results?.every((r: TestResult) => r.passed)
      if (allPassed && !completedRef.current) {
        completedRef.current = true
        onComplete()
      }
    } catch {
      setFetchError('Could not reach the code runner. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        theme={oneDark}
        onChange={setCode}
      />

      <button
        onClick={handleRun}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Running…' : 'Run Tests'}
      </button>

      {fetchError && (
        <p className="text-sm text-red-600">{fetchError} <button onClick={handleRun} className="underline">Try again</button></p>
      )}

      {compileError && (
        <pre className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 overflow-auto">{compileError}</pre>
      )}

      {runtimeError && (
        <pre className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 overflow-auto">{runtimeError}</pre>
      )}

      {results && (
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm rounded-lg p-3 ${r.passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <span>{r.passed ? '✓' : '✗'}</span>
              <span>{r.description}{r.message ? `: ${r.message}` : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run tests/components/CodeChallenge.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/challenges/CodeChallenge.tsx tests/components/CodeChallenge.test.tsx
git commit -m "feat: add CodeChallenge component with CodeMirror editor and Judge0 test runner"
```

---

## Task 11: Challenge List Page + Filters

**Files:**
- Create: `components/challenges/ChallengeCard.tsx`
- Create: `components/challenges/ChallengeFilters.tsx`
- Create: `app/challenges/page.tsx`

- [ ] **Step 1: Create `components/challenges/ChallengeCard.tsx`**

```tsx
import Link from 'next/link'
import type { Challenge } from '@/lib/types'
import { SKILL_AREAS } from '@/lib/skills'

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const difficultyColor = {
    junior: 'bg-green-100 text-green-700',
    mid: 'bg-yellow-100 text-yellow-700',
    senior: 'bg-red-100 text-red-700',
  }[challenge.difficulty]

  return (
    <Link href={`/challenges/${challenge.slug}`} className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor}`}>
          {challenge.difficulty}
        </span>
        <span className="text-xs text-gray-500">{challenge.type}</span>
      </div>
      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{challenge.description}</p>
      <div className="flex flex-wrap gap-1 mt-3">
        {challenge.skills.map(s => (
          <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {SKILL_AREAS[s]?.label ?? s}
          </span>
        ))}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Create `components/challenges/ChallengeFilters.tsx`**

```tsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SKILL_AREAS, SKILL_SLUGS } from '@/lib/skills'

export function ChallengeFilters() {
  const router = useRouter()
  const params = useSearchParams()

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString())
    if (value) { next.set(key, value) } else { next.delete(key) }
    router.push(`/challenges?${next.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        value={params.get('skill') ?? ''}
        onChange={e => update('skill', e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
      >
        <option value="">All Skills</option>
        {SKILL_SLUGS.map(s => (
          <option key={s} value={s}>{SKILL_AREAS[s].label}</option>
        ))}
      </select>

      <select
        value={params.get('type') ?? ''}
        onChange={e => update('type', e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
      >
        <option value="">All Types</option>
        <option value="code">Code</option>
        <option value="scenario">Scenario</option>
      </select>

      <select
        value={params.get('difficulty') ?? ''}
        onChange={e => update('difficulty', e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
      >
        <option value="">All Levels</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/challenges/page.tsx`**

```tsx
import { supabase } from '@/lib/supabase'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import { ChallengeFilters } from '@/components/challenges/ChallengeFilters'
import type { Challenge } from '@/lib/types'

interface PageProps {
  searchParams: { skill?: string; type?: string; difficulty?: string }
}

export default async function ChallengesPage({ searchParams }: PageProps) {
  let query = supabase.from('challenges').select('*')

  if (searchParams.skill) query = query.contains('skills', [searchParams.skill])
  if (searchParams.type) query = query.eq('type', searchParams.type)
  if (searchParams.difficulty) query = query.eq('difficulty', searchParams.difficulty)

  const { data, error } = await query.order('difficulty')

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-600">Failed to load challenges. Please refresh.</p>
      </main>
    )
  }

  const challenges = (data ?? []) as Challenge[]

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Challenges</h1>
      <ChallengeFilters />
      {challenges.length === 0 ? (
        <p className="text-gray-500">No challenges match these filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {challenges.map(c => <ChallengeCard key={c.slug} challenge={c} />)}
        </div>
      )}
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Visit http://localhost:3000/challenges — verify challenges list renders with filters.

- [ ] **Step 5: Commit**

```bash
git add components/challenges/ChallengeCard.tsx components/challenges/ChallengeFilters.tsx app/challenges/page.tsx
git commit -m "feat: add challenge list page with filter controls"
```

---

## Task 12: Challenge Detail Page + SignUpPrompt

**Files:**
- Create: `app/challenges/[slug]/page.tsx`
- Create: `app/challenges/[slug]/ChallengeDetailClient.tsx`
- Create: `components/ui/SignUpPrompt.tsx`

- [ ] **Step 1: Create `components/ui/SignUpPrompt.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'

const DISMISSED_KEY = 'rts:prompt-dismissed'

// Always rendered so it can read sessionStorage on mount.
// Only becomes visible after the user has completed at least one challenge (showAfterCompletion=true)
// and has not dismissed the prompt this session.
export function SignUpPrompt({ showAfterCompletion }: { showAfterCompletion: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!showAfterCompletion) return
    const dismissed = sessionStorage.getItem(DISMISSED_KEY)
    if (!dismissed) setVisible(true)
  }, [showAfterCompletion])

  function dismiss() {
    sessionStorage.setItem(DISMISSED_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-4 flex items-start gap-3 z-50">
      <p className="text-sm text-gray-700 flex-1">
        Save your progress across devices — create a free account
      </p>
      <button onClick={dismiss} aria-label="Dismiss" className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
    </div>
  )
}
```

- [ ] **Step 2: Create `app/challenges/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Challenge } from '@/lib/types'
import { ChallengeDetailClient } from './ChallengeDetailClient'

export default async function ChallengePage({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !data) notFound()

  return <ChallengeDetailClient challenge={data as Challenge} />
}
```

- [ ] **Step 3: Create `app/challenges/[slug]/ChallengeDetailClient.tsx`**

```tsx
'use client'

import { useProgress } from '@/context/ProgressContext'
import { CodeChallenge } from '@/components/challenges/CodeChallenge'
import { ScenarioChallenge } from '@/components/challenges/ScenarioChallenge'
import { SignUpPrompt } from '@/components/ui/SignUpPrompt'
import type { Challenge, CodeContent, ScenarioContent } from '@/lib/types'
import { useState } from 'react'

export function ChallengeDetailClient({ challenge }: { challenge: Challenge }) {
  const { completed, markComplete } = useProgress()
  const isCompleted = completed.includes(challenge.slug)

  function handleComplete() {
    if (!isCompleted) {
      markComplete(challenge.slug)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
        <p className="text-gray-600 mt-2">{challenge.description}</p>
        {isCompleted && (
          <span className="inline-block mt-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-0.5">
            Completed
          </span>
        )}
      </div>

      {challenge.type === 'code' ? (
        <CodeChallenge content={challenge.content as CodeContent} onComplete={handleComplete} />
      ) : (
        <ScenarioChallenge content={challenge.content as ScenarioContent} onComplete={handleComplete} />
      )}

      {/* SignUpPrompt manages its own visibility via sessionStorage — always rendered so it can check */}
      <SignUpPrompt showAfterCompletion={isCompleted} />
    </main>
  )
}
```

- [ ] **Step 4: Verify in browser**

Visit a challenge at http://localhost:3000/challenges/async-promise-chain — verify it renders correctly.

- [ ] **Step 5: Commit**

```bash
git add app/challenges/\[slug\]/ components/ui/SignUpPrompt.tsx
git commit -m "feat: add challenge detail page with code/scenario rendering and sign-up prompt"
```

---

## Task 13: Skill Map Page

**Files:**
- Create: `app/skill-map/page.tsx`

- [ ] **Step 1: Create `app/skill-map/page.tsx`**

```tsx
import { supabase } from '@/lib/supabase'
import { SkillMap } from '@/components/skill-map/SkillMap'
import type { Challenge } from '@/lib/types'

export default async function SkillMapPage() {
  const { data, error } = await supabase.from('challenges').select('slug, skills')

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-600">Failed to load skill map. Please refresh.</p>
      </main>
    )
  }

  // data is { slug: string, skills: string[] }[] — a valid subset of Challenge
  const challenges = (data ?? []) as Array<{ slug: string; skills: string[] }>

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill Map</h1>
      <p className="text-gray-500 mb-8">Your coverage across the skills that define a senior engineer.</p>
      <SkillMap challenges={challenges} />
    </main>
  )
}
```

- [ ] **Step 2: Verify in browser**

Visit http://localhost:3000/skill-map — verify skill cards render and completed challenges reflect coverage.

- [ ] **Step 3: Commit**

```bash
git add app/skill-map/page.tsx
git commit -m "feat: add skill map page"
```

---

## Task 14: Landing Page + Navigation

**Files:**
- Modify: `app/page.tsx`
- Create: `components/ui/Nav.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/ui/Nav.tsx`**

```tsx
import Link from 'next/link'

export function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900">Road to Senior</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/challenges" className="text-gray-600 hover:text-gray-900">Challenges</Link>
          <Link href="/skill-map" className="text-gray-600 hover:text-gray-900">Skill Map</Link>
        </div>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Nav to `app/layout.tsx`**

```tsx
import { Nav } from '@/components/ui/Nav'
import { ProgressProvider } from '@/context/ProgressContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <ProgressProvider>
          <Nav />
          {children}
        </ProgressProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Update `app/page.tsx`**

```tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Road to Senior</h1>
      <p className="text-lg text-gray-600 mb-8">
        Practical challenges to level up your JavaScript skills — from junior to senior.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/challenges" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Browse Challenges
        </Link>
        <Link href="/skill-map" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          View Skill Map
        </Link>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Full run all tests**

```bash
npm run test:run
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/ui/Nav.tsx app/layout.tsx
git commit -m "feat: add landing page and navigation"
```

---

## Task 15: Final Smoke Test

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Walk through the app manually**

1. `/` — landing page loads, both links work
2. `/challenges` — list of 6 challenges renders, filters work
3. `/challenges/async-promise-chain` — code editor shows, Run Tests works
4. `/challenges/code-review-pr-feedback` — scenario options show, selecting one reveals explanation
5. After completing any challenge — sign-up prompt appears once, dismisses on X
6. `/skill-map` — all 17 skill cards render, completed challenge reflected in coverage bar

- [ ] **Step 3: Run full test suite one final time**

```bash
npm run test:run
```

Expected: all tests pass.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final MVP smoke test pass — all tests green"
```
