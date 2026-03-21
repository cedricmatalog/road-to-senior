import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-dependency-audit',
  title: 'Responding to a Vulnerable Dependency',
  description: '`npm audit` reports a high-severity CVE in a dependency. How do you respond?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['security'],
  content: {
    overview: 'Not every CVE is a crisis. The right response is a conscious risk assessment — is this exploitable in our context? — not reflexive upgrade or reflexive ignore.',
    situation: `You run npm audit and find a high-severity CVE in a popular utility library your app uses directly. The CVE is a prototype pollution vulnerability. There's a patched version available. But the library is deeply integrated — upgrading requires changes in 12 files. Your PM wants to ship a new feature next week and doesn't want to risk a big refactor. How do you handle this?`,
    options: [
      {
        id: 'a',
        label: 'Assess whether the vulnerability is actually exploitable in your app, then upgrade if yes — or document the decision with risk context if not',
        explanation: 'Not all CVEs are equal in your context. Prototype pollution is serious in user-facing apps that process untrusted input through the vulnerable code path — if your app does this, upgrade now regardless of the feature deadline. If the vulnerable code path is only called with internal, trusted data, the risk is different. Audit the actual usage. If you must defer, document the decision explicitly: why, the risk level, and a date to revisit. "We\'re aware of this CVE and not fixing it" with reasoning is better than silent non-action. Never ignore security issues — always consciously decide.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Immediately upgrade the dependency regardless of the feature deadline — security always comes first',
        explanation: '"Security always comes first" is a good default but context matters. A low-risk CVE in an internal tool might be appropriately deferred by one week for a critical release. The key is conscious decision-making with documented risk assessment, not blanket policies.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Ignore it for now — npm audit always has false positives and high-severity doesn\'t mean it\'s actually exploitable',
        explanation: 'Silently ignoring security advisories is negligent. Even if this specific CVE isn\'t exploitable in your context, establishing a habit of ignoring security audits will eventually lead to missing something that is exploitable. Always assess consciously.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
