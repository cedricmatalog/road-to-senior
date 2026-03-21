import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-auth-jwt',
  title: 'Where to Store Auth Tokens in the Browser',
  description: 'You\'re adding authentication to a React app. Where do you store the token, and why does it matter?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['security', 'architecture'],
  content: {
    overview: 'Token storage in the browser is a security decision, not a convenience decision. localStorage is vulnerable to XSS — any injected script can steal it. HttpOnly cookies are immune to XSS but require CSRF protection. Pick the right tool for your threat model.',
    situation: `You're building auth for a React SPA. After login, the server returns a JWT. You need to store it client-side so the user stays logged in across page refreshes. A teammate suggests storing it in localStorage for simplicity. Another suggests HttpOnly cookies set by the server. You need to decide. What do you choose and why?`,
    options: [
      {
        id: 'a',
        label: 'HttpOnly cookies set by the server — they cannot be accessed by JavaScript, eliminating XSS token theft',
        explanation: 'HttpOnly cookies are the right default for auth tokens. JavaScript cannot read them — `document.cookie` won\'t see them. This means even if an attacker injects a script into your page via XSS, they cannot steal the token. The browser sends them automatically on requests to the same origin. You\'ll need CSRF protection (SameSite=Lax or a CSRF token) since cookies are sent automatically. This is the approach used by most auth providers (NextAuth, Auth0 sessions). The tradeoff: more complex server-side setup, and you need to handle cross-origin requests carefully.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'localStorage — it\'s simpler, persists across tabs, and is easy to clear on logout',
        explanation: 'localStorage is convenient but insecure for auth tokens. Any JavaScript running on your page — including third-party scripts, ad networks, or injected code via XSS — can read it with `localStorage.getItem(\'token\')`. XSS is the most common web vulnerability. Storing your auth token in localStorage turns every XSS bug into a full account takeover.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'In-memory (React state or a module variable) — not persistent, but immune to both XSS token theft and CSRF',
        explanation: 'In-memory storage is the most secure option — no persistence means no storage to attack. But it means users are logged out on every page refresh, which is poor UX for most apps. A common hybrid: store a short-lived access token in memory, store a long-lived refresh token in an HttpOnly cookie. On refresh, silently exchange the cookie for a new access token. This pattern (used by Auth0\'s SPA SDK) gives you security without forcing users to log in constantly.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
