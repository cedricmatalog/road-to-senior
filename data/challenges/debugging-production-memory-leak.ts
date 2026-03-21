import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-production-memory-leak',
  title: 'Production Memory Leak',
  description: 'Your Node.js service restarts every few hours due to OOM. How do you diagnose it?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['debugging', 'performance'],
  content: {
    overview: 'Memory leaks in Node.js are almost always about references that outlive their purpose: event listeners, closures, or intervals that never get cleaned up.',
    situation: `Your Node.js API service has been restarting every 3-4 hours in production with an out-of-memory error. Memory usage climbs steadily from ~200MB at startup to ~1.5GB before the crash. It's been happening for 3 days — since a deploy that added a new WebSocket feature and a background job. Logs show no errors before the crash. What's your first move?`,
    options: [
      {
        id: 'a',
        label: 'Take a heap snapshot before and after load, compare to find what\'s accumulating — then look at the WebSocket and job code for missing cleanup',
        explanation: 'Correct approach. Steady memory growth almost always means something is accumulating without being released — event listeners not removed, objects held in closures, intervals not cleared. A heap snapshot comparison tells you *what* is growing. Then you narrow to the recent deploy: WebSocket connections typically leak when `removeEventListener` or `socket.close()` is missed; background jobs leak when they hold references across runs. Chrome DevTools or `--inspect` + `v8.writeHeapSnapshot()` are your tools here.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Increase the memory limit with --max-old-space-size and monitor if the crashes stop',
        explanation: 'This is a band-aid, not a diagnosis. More memory just delays the crash — the leak will eventually exhaust any limit. It\'s only acceptable as a temporary measure to buy time while you investigate, not as a fix.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Roll back the deploy and see if memory usage stabilises — if so, the bug is in the new code',
        explanation: 'Rollback confirms the deploy caused it, but you still don\'t know what or why. And you\'ve now lost the feature. Better to reproduce locally and profile the new code directly — you already know from the timeline that the WebSocket/job changes are suspect.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
