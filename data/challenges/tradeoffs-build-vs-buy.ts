import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'tradeoffs-build-vs-buy',
  title: 'Build vs. Buy: Authentication',
  description: 'The team wants to build a custom auth system. Should you?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['tradeoffs', 'architecture'],
  content: {
    overview: 'Build vs. buy is one of the most consequential decisions a senior engineer makes. The default instinct is to build — it feels like more control, more customization. The reality is that building means owning maintenance, security patches, edge cases, and on-call forever.',
    situation: `Your startup is building a B2B SaaS product. The team lead suggests building a custom authentication system because "Auth0 is expensive and we want control over our user data." The feature list: email/password login, magic links, SSO (SAML/OIDC), MFA, session management, and password reset flows.\n\nYou're a team of 4 engineers. The product launch is in 8 weeks. What do you recommend?`,
    options: [
      {
        id: 'a',
        label: 'Build it — you\'ll have full control and can avoid vendor lock-in',
        explanation: 'Authentication is one of the worst things to build yourself. It\'s not just email/password — it\'s session management, token rotation, SAML/OIDC implementations, MFA, password hashing, brute force protection, account recovery, compliance (SOC2, GDPR), and security patches when vulnerabilities are discovered. A team of 4 will spend months on auth instead of the product. And auth bugs are security bugs.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Use a managed auth provider (Auth0, Clerk, Supabase Auth) — the cost is far less than the engineering time to build and maintain it',
        explanation: 'This is the right call. Auth providers handle the security-critical edge cases you haven\'t thought of yet. At a startup with 8 weeks to launch, every week spent on auth is a week not spent on your actual product. Vendor lock-in is a real concern but manageable — abstract the auth layer behind an interface so you can swap providers if needed. The "control" argument usually disappears when the team realizes what they\'re signing up to maintain.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Build email/password now and add SSO/MFA later when customers ask for it',
        explanation: 'Phased building still means owning a custom auth system. You\'ll spend time on the basic implementation, then more time adding SSO (which is notoriously complex to implement correctly), then more time on MFA. B2B customers often require SSO and MFA before they\'ll sign — you may need these sooner than you think.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Use Passport.js to build on top of an open-source framework — best of both worlds',
        explanation: 'Passport.js handles some OAuth strategies but you still own the session management, token storage, MFA, SAML, security hardening, and everything else. It\'s a building block, not a complete solution. You\'re still building.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
