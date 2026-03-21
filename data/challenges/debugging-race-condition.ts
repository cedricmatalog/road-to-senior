import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-race-condition',
  title: 'Debugging a Race Condition',
  description: 'Users are accidentally submitting a form twice, causing duplicate orders. How do you fix the race condition in the UI?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['debugging', 'async-js'],
  content: {
    overview: 'Race conditions in forms happen when the UI doesn\'t reflect in-flight state. The fix is to make the button disabled the moment it\'s clicked — and keep it disabled until the operation completes or fails.',
    situation: `Your checkout form occasionally creates duplicate orders. Looking at the logs, you see two identical POST /orders requests from the same user within milliseconds of each other. It happens on slow connections where the button click doesn\'t give immediate feedback and users click again. Your current code: \`const res = await fetch('/api/orders', { method: 'POST', body })\`. How do you fix this?`,
    options: [
      {
        id: 'a',
        label: 'Track loading state: set isSubmitting=true on submit, disable the button and show a spinner, reset to false on completion or error',
        explanation: 'This is the correct client-side fix. The moment the user clicks, set isSubmitting = true. The button becomes disabled immediately — no second click possible. Show a spinner or "Placing order..." label so users know something is happening. On success or error, set isSubmitting = false (or redirect on success). This is idiomatic React: `const [isSubmitting, setIsSubmitting] = useState(false)`. The pattern works for any async form action. It\'s also good UX: users on slow connections know their click was registered.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Add a debounce to the submit handler so rapid clicks are ignored',
        explanation: 'Debounce delays the first call, which is wrong for a submit button — you want the first click to fire immediately. It also doesn\'t prevent a second click after the debounce window passes. Disabling the button after the first click is the correct pattern, not debouncing.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Make the API endpoint idempotent using a unique request ID so duplicate POSTs are safely ignored',
        explanation: 'Idempotency keys on the API are a best practice and a good safety net — but they\'re a server-side defense, not a replacement for client-side UX. Users still see two clicks, still wait for two round trips, and may see confusing UI state. Fix the UI so the duplicate never happens, and add idempotency keys as a belt-and-suspenders measure.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
