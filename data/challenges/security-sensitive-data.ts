import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-sensitive-data',
  title: 'Handling Sensitive Data in Logs',
  description: 'You discover that your logging system is capturing passwords and credit card numbers. How do you fix it?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['security'],
  content: {
    overview: 'Sensitive data in logs is a compliance violation. The fix is at the source — filter before logging, not after. Restricting access doesn\'t make the data disappear.',
    situation: `During a security review, you discover that your application logs are recording full request bodies — including passwords in login requests and credit card numbers in payment forms. The logs are stored in your logging service and accessible to 20 engineers. This is a compliance violation (PCI-DSS for card data, general security practice for passwords). What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Immediately scrub sensitive fields from logs at the source, delete/purge existing logs with card/password data, and document what was exposed and for how long',
        explanation: 'Three steps: (1) Fix the source — add a log sanitiser that redacts known sensitive fields before logging (`password`, `cardNumber`, `cvv`, `ssn`, etc.). Never filter after-the-fact at the logging service — filter at the point of logging. (2) Purge existing compromised logs — if you can\'t delete selectively, rotate/purge log batches. (3) Document the exposure — scope, duration, who had access. This may require notifying your security team and legal, and depending on jurisdiction, regulatory notification. "We found it and fixed it quickly" is a far better story than "we knew and didn\'t act."',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Restrict access to the logs so fewer engineers can see sensitive data',
        explanation: 'Access restriction is a partial mitigation but not a fix. Sensitive data in logs violates PCI-DSS regardless of who can see it. The data still exists in the logging system, potentially replicated to backups, cold storage, or third-party SIEM tools. Remove the data, don\'t just restrict it.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Switch to a more secure logging service that encrypts logs at rest',
        explanation: 'Encryption at rest doesn\'t help here — the sensitive data is readable by the logging service and anyone with decryption access. The problem is that the data is being logged at all, not how it\'s stored. Stop logging it at the source.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
