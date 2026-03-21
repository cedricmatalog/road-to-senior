import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'async-error-boundary',
  title: 'Unhandled Promise Rejections in Production',
  description: 'Your app has unhandled promise rejections silently crashing background tasks. How do you find and fix them?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['async-js', 'error-handling'],
  content: {
    overview: "Unhandled promise rejections are silent failures — Node.js won't crash by default, and the task just disappears. Every async operation needs an explicit error path.",
    situation: 'You notice that some background tasks in your Node.js app are silently failing — they start, then stop, with no error in your logs. On investigation, you find "UnhandledPromiseRejectionWarning" in stdout (not your logging system). The tasks use async functions called with someAsyncFn() without await — fire and forget. Three tasks have been failing for weeks without anyone noticing. How do you fix this systematically?',
    options: [
      {
        id: 'a',
        label: 'Add a global unhandledRejection handler to log and alert, then audit fire-and-forget calls to add explicit error handling',
        explanation: 'Two-step fix: (1) Global safety net — `process.on("unhandledRejection", (err) => { logger.error(err); alertingSystem.fire(err) })`. This ensures no future rejection is silent. (2) Audit fire-and-forget patterns — any `someAsync()` call without `await` or `.catch()` is a time bomb. Either add `.catch(err => logger.error(err))` to each, or wrap in a utility: `function fireAndForget(promise) { promise.catch(err => logger.error("Background task failed:", err)) }`. The root issue is that JavaScript doesn\'t force you to handle rejections — you have to build that discipline explicitly.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Add --unhandled-rejections=throw to Node.js flags — it converts unhandled rejections to crashes',
        explanation: 'Making the process crash is actually the right default in production (and is the default in Node 15+) — a crashed process with an error log is better than a silently failing one. But it\'s not a fix — it\'s noise reduction. You still need to find and handle the rejections explicitly so the background tasks actually run successfully.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Wrap every async function in try/catch',
        explanation: 'try/catch inside async functions only works if you await the call. A fire-and-forget `someAsync()` without await escapes any surrounding try/catch. The issue is at the call site, not inside the async function.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
