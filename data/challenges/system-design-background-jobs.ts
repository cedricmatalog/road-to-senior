import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-background-jobs',
  title: 'Handle Long-Running Operations in the UI',
  description: 'Users trigger operations that take 10-30 seconds. The UI freezes or shows a spinner with no feedback. How do you design this?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'architecture'],
  content: {
    overview: 'Long-running operations need two things: the UI must stay responsive while they run, and users need meaningful feedback on progress. Optimistic UI + polling (or WebSockets) is the standard pattern.',
    situation: `Users can trigger a "Generate Report" action that takes 10-30 seconds on the server. Currently, the frontend awaits the fetch() call and shows a spinner. Users frequently navigate away thinking it failed, or the browser times out the connection. You need to redesign the UX. What's your approach?`,
    options: [
      {
        id: 'a',
        label: 'Fire-and-forget: POST to start the job, get back a jobId, poll GET /jobs/:id every 2s for status, update the UI progressively',
        explanation: 'This is the right pattern. The POST returns immediately with a job ID — no waiting. The user can navigate, close a tab, and come back. Polling GET /jobs/:id every 2 seconds gives you real-time-ish updates without WebSocket complexity. The UI shows meaningful states: "queued → processing → done" rather than a frozen spinner. When done, display the result or a link to download the report. Stop polling on completion or error. If the user navigates away, you can resume polling when they return by checking pending jobs on mount.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Increase the fetch timeout to 60 seconds and show an animated progress bar that fills over time',
        explanation: 'A fake progress bar is a UX lie — it doesn\'t reflect actual progress. A 60-second fetch blocks the connection and still fails for users on slow connections or who navigate away. Long-lived HTTP connections are fragile. The problem is architectural: synchronous request/response is the wrong model for async work.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Use a Web Worker to run the operation off the main thread so the UI doesn\'t freeze',
        explanation: 'Web Workers run JavaScript off the main thread — they\'re great for CPU-intensive client-side work (image processing, large data transforms). But report generation happens on the server, not in the browser. A Web Worker can\'t make the server faster. The UI "freezing" is because of the awaited fetch, not main thread blocking.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
