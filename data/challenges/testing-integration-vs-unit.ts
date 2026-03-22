import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-integration-vs-unit',
  title: 'Integration Tests vs Unit Tests',
  description: 'Your team debates whether to write unit or integration tests for a checkout flow. What\'s the right call?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['testing'],
  content: {
    overview: 'Unit tests verify isolated logic quickly and cheaply. Integration tests verify that components work together correctly — they catch a different class of bugs. The best test suites use both strategically: unit tests for pure logic and edge cases, integration tests for critical paths and component boundaries.',
    situation: `You're leading the testing strategy for a new checkout flow. The flow involves: a cart summary component, a payment form, an order confirmation API call, and a success page. A teammate argues: "We should unit test every component in isolation — it's faster and more focused." Another says: "We should write end-to-end integration tests — that's what actually proves it works."

What's the right approach?`,
    options: [
      {
        id: 'a',
        label: 'Use both: unit tests for the payment form\'s validation logic and price calculations; integration tests for the full checkout path (add to cart → submit → success page)',
        explanation: 'Unit tests shine for isolated logic — form validation rules, price calculation edge cases, error message content. They\'re fast, precise, and easy to debug. Integration tests cover what unit tests can\'t: that the cart total flows correctly into the payment form, that a successful API response navigates to the confirmation page, that error states surface properly to the user. Neither alone is sufficient. The classic test pyramid is wrong in one direction — over-emphasising unit tests leaves integration bugs uncaught. The right balance for a checkout flow is heavy integration coverage of the happy path and critical error paths, with unit tests focused on pure logic.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Unit test everything — isolation means faster tests and clearer failures',
        explanation: 'Unit tests can\'t tell you that the payment form correctly passes the total to the API, or that a failed payment shows the right error. You can unit-test every individual piece and still have a broken checkout. Integration tests aren\'t slower unit tests — they answer a fundamentally different question: does the system behave correctly as a whole?',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Write only end-to-end tests — they prove the real user experience works',
        explanation: 'Full end-to-end tests are slow, brittle (network, browser, environment), and give poor signal when they fail — a test failure might be anywhere in the stack. They shouldn\'t be your primary coverage layer. Integration tests at the component boundary give most of the confidence with far less flakiness.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
