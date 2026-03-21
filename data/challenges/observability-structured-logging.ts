import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'observability-structured-logging',
  title: 'Add Useful Logging to a Service',
  description: 'A service is failing silently in production. Decide what to log and how.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['observability', 'debugging'],
  content: {
    overview: 'Logs are your primary debugging tool in production. The difference between "something went wrong" and "the payment processor returned a 422 for user 9182 at 14:03:21 with payload X" is structured logging. console.log strings don\'t scale — machines need to query logs, and that requires structured fields.',
    situation: `A payment processing service occasionally fails with a generic 500 error. You have no idea why — the only log is console.log("Payment failed"). You need to add proper logging before the next incident.\n\nThe service: receives a POST /charge, calls a third-party payment API, updates the database, and sends a confirmation email.\n\nWhat logging strategy do you implement?`,
    options: [
      {
        id: 'a',
        label: 'Add console.log at each step with descriptive strings: "Calling payment API...", "Payment succeeded", "DB updated"',
        explanation: 'Better than nothing, but plain strings are hard to search and impossible to aggregate. You can\'t easily filter "all payment failures for user X" or "all failures with error code Y" in a log management tool. Structured logs with consistent fields are queryable; strings are not.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Log structured JSON at each step with consistent fields: requestId, userId, event, durationMs, and error details when applicable',
        explanation: 'This is the right approach. Structured logging means every log entry is a JSON object with consistent fields. A requestId ties all logs for one request together. userId lets you trace one user\'s journey. event names are machine-readable. durationMs lets you spot slow calls. Error objects include the full message, code, and stack. Log management tools (Datadog, CloudWatch, Loki) can then filter, aggregate, and alert on any field.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Add try/catch around every step and send errors to Sentry — no additional logging needed',
        explanation: 'Error tracking (Sentry) captures exceptions, but it misses successful flows that behave unexpectedly, slow operations, and the context around errors. Logging and error tracking are complementary. You need both.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Log everything — every variable, every function call — to maximize debugging information',
        explanation: 'Over-logging creates noise, inflates storage costs, and can leak PII (card numbers, tokens, passwords) into log files. Log meaningful events at appropriate levels (info for normal flow, warn for recoverable issues, error for failures) with enough context to diagnose problems.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
