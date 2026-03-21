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
- Browser-based JS editor (Monaco or CodeMirror)
- User code runs against test cases via Judge0 (hosted sandboxed execution API)
- Pass/fail result with explanation displayed inline
- Runtime/compiler errors shown clearly — errors are learning opportunities

### Scenario Challenges
- Realistic engineering situation presented as text (e.g., "a junior asks you to review their PR")
- User picks from 2–4 options
- Detailed tradeoff explanation shown for each choice; recommended answer highlighted

### Data Model

```ts
Challenge {
  slug: string
  title: string
  description: string
  type: 'code' | 'scenario'
  difficulty: 'junior' | 'mid' | 'senior'
  skills: string[]        // e.g. ["async", "code-review", "architecture"]
  content: JSON           // type-specific payload (test cases or scenario options)
}
```

The `skills` array drives the skill map — every challenge tags itself to one or more skill areas.

---

## Skill Map

~15–20 predefined skill areas in two categories:

**Technical:** Async JS, Error Handling, Performance, Architecture, Testing, TypeScript, Security, Closures & Scope, Promises & Concurrency, DOM & Browser APIs

**Engineering Mindset:** Code Review, Debugging, Communication, Mentoring, System Design, Estimation, Refactoring

**Behavior:**
- Each skill card shows: name, completion bar, difficulty breakdown (junior/mid/senior)
- Skills with low coverage are visually highlighted as gaps
- Clicking a skill card filters the `/challenges` list to that skill
- Anonymous users see the full map but no personal progress (soft sign-up prompt shown)
- Post-MVP: authenticated users see DB-backed coverage scores

---

## Progress & State

**MVP (anonymous):**
- Completed challenge slugs stored in `localStorage`
- Skill map calculates coverage from localStorage
- Persistent soft prompt to sign up and save progress across devices

**Post-MVP (authenticated):**
- Supabase table: `user_progress { user_id, challenge_slug, completed_at }`
- Skill map reads from DB
- On first sign-up: localStorage progress migrated to DB

**State management:** React Context + localStorage — no Redux or Zustand needed for MVP.

---

## Testing & Error Handling

**Testing:**
- Vitest — unit tests for challenge data validation (required fields, valid skill tags)
- React Testing Library — component tests for skill map and challenge UI
- No E2E tests for MVP

**Error handling:**
| Scenario | Handling |
|---|---|
| Supabase read failure | Empty state with retry, no page crash |
| Invalid challenge slug | Next.js `notFound()` |
| Judge0 unavailable | Friendly error with retry option |
| Code execution error | Show compiler/runtime output inline |

---

## MVP Scope

**In scope:**
- Challenge library (code + scenario types)
- Skill map with anonymous localStorage-based progress
- Filter/browse challenges by skill, type, difficulty
- Judge0 integration for code execution
- Challenge seed script

**Out of scope (post-MVP):**
- User auth and accounts
- DB-backed progress persistence
- Comments, hints, or community features
- Mobile-optimized layout (responsive but not mobile-first)
- Admin UI for challenge authoring
