import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-production-memory-leak',
  title: 'Browser Memory Leak',
  description: 'Your app gets sluggish after extended use. The tab\'s memory climbs steadily. How do you diagnose it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['debugging', 'performance'],
  content: {
    overview: 'Memory leaks in browser apps are almost always about references that outlive their purpose: event listeners added but never removed, timers not cleared, or closures that hold onto DOM nodes after they unmount.',
    situation: `Users report the app becomes slow and unresponsive after 30-60 minutes of use, particularly on the dashboard page that auto-refreshes data every 10 seconds. Opening Chrome DevTools → Performance Monitor shows memory climbing from 80MB to 500MB+ without ever dropping. A deploy 3 days ago added real-time chart components and a new notification polling system. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Take heap snapshots in Chrome DevTools before and after navigating to/from the dashboard, compare to find what\'s accumulating — then check the chart and polling code for missing cleanup in useEffect',
        explanation: 'Correct approach. In Chrome DevTools → Memory, take a heap snapshot, navigate to the dashboard, wait 30s, navigate away, take another snapshot. The "Comparison" view shows what grew and wasn\'t garbage collected. Common culprits after this kind of deploy: (1) setInterval or setTimeout not cleared in useEffect cleanup — returns a new interval on every render, stacking up. (2) Event listeners added to window or document without removeEventListener in cleanup. (3) WebSocket or EventSource connections not closed on unmount. (4) Chart libraries that hold references to data arrays. The fix is always a useEffect cleanup function: `return () => { clearInterval(id); window.removeEventListener(...) }`.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Reload the page every hour automatically to reset memory usage',
        explanation: 'An auto-reload is a workaround, not a fix. It disrupts the user\'s workflow and doesn\'t address the root cause. It also won\'t help users who are actively working in the tab when the reload happens. Profile and fix the leak.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Roll back the deploy and see if memory stabilises — if so, the bug is in the new chart or polling code',
        explanation: 'Rollback confirms the deploy caused it, but you still don\'t know what or why — and you\'ve lost the feature. Since you already know the new chart and polling code are suspect, reproduce the leak locally by navigating to/from the dashboard in a loop, and profile it directly. That\'s faster than a rollback.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
