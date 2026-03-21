import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'testing-tdd-approach',
  title: 'When to Use TDD',
  description: 'Your team is debating whether to adopt TDD. When does test-first development actually make sense?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['testing'],
  content: {
    overview: 'TDD is a tool, not a religion. It adds the most value when requirements are clear upfront — business logic, data pipelines. It adds friction where requirements are discovered through iteration — UI, prototypes.',
    situation: `A senior engineer on your team advocates for strict TDD (write tests before any implementation code) for everything. Another engineer thinks TDD is slow and counterproductive for UI work and exploratory features. You're asked to weigh in. The team builds a mix of: REST API business logic, React UI components, data processing pipelines, and the occasional exploratory prototype. What's your take?`,
    options: [
      {
        id: 'a',
        label: 'TDD is highly valuable for business logic and data pipelines — less so for UI and exploratory work. Apply it where requirements are clear and behaviour is unambiguous.',
        explanation: 'TDD works best when you know what the function should do before you write it. For business logic (pricing calculations, validation rules, permission checks) and data pipelines (transforms, aggregations), the expected outputs are clear upfront — tests first drives good API design. For UI, tests often describe visual structure that changes constantly — the feedback loop of visual iteration is faster than a test suite. For exploratory work, you\'re discovering requirements, not implementing them — write tests after you know what you\'re building. Pragmatic TDD: write tests first for stable, behavioural code; write tests after for uncertain or visual code.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Apply strict TDD everywhere — the discipline is the point, not the convenience',
        explanation: 'Strict TDD everywhere causes real friction in UI and exploratory work. Writing tests for React components that are being designed visually in real time creates churn — tests get rewritten every iteration. The ROI of TDD varies by context. Applying it uniformly is a religious practice, not an engineering decision.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Don\'t use TDD at all — write code first, add tests when the implementation stabilises',
        explanation: 'Test-after works fine for stable, simple code. But for complex business logic, TDD prevents the most common mistake: writing implementation code that\'s hard to test (because the API was designed around implementation, not usage). TDD forces you to design the public interface before the internals — a valuable constraint for algorithmic and business-logic code.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
