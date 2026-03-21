import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-wrong-data',
  title: 'Users Seeing Stale or Wrong Data',
  description: 'After navigating between pages, users see another user\'s data briefly, or stale data from a previous session. How do you investigate?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['debugging', 'security'],
  content: {
    overview: 'Wrong data in a React app is almost always a state leak: something was not reset between users, routes, or sessions. The pattern — wrong data for a short time, then correct — points to stale cache or shared state, not a network bug.',
    situation: `You get a support ticket: "I logged out, my colleague logged in on the same machine, and for a few seconds they saw my order history before their own loaded." You've seen 3 similar reports this week. Your app uses React with a global state store (Zustand/Redux) and React Query for server state. No errors in the console. This is a serious data leak. How do you investigate?`,
    options: [
      {
        id: 'a',
        label: 'Investigate state reset on logout: check that the global store is cleared, React Query cache is cleared, and no stale data from the previous user persists across the login boundary',
        explanation: 'The pattern (wrong data for a moment, then correct) is a signature of stale client-side state. When user A logs out, the global store and query cache still hold their data. User B logs in, their data starts loading — but for a window of time, user A\'s data is displayed. The fix: on logout, call store.reset() and queryClient.clear() before redirecting to login. With React Query, `queryClient.clear()` removes all cached queries. With Zustand/Redux, dispatch a RESET action that returns state to its initial values. This is a P0 data leak — treat it as an incident.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Add a loading spinner that hides all content until the new user\'s data arrives',
        explanation: 'Hiding data behind a spinner masks the symptom without fixing the leak. The wrong data is still in memory and could be exposed in other ways — prefetch requests, debug tools, or a future change that removes the spinner. Fix the root cause: clear state on logout.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Check if the API is returning the correct data — maybe the backend is serving the wrong user',
        explanation: 'Worth ruling out, but the timing pattern (wrong data for a moment, then correct) doesn\'t match a backend bug. A backend data leak would show consistently wrong data, not briefly-wrong-then-right. The brief window strongly suggests client-side cache or state that hasn\'t been cleared. Start with the client.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
