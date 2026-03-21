import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'architecture-dependency-injection',
  title: 'Choosing Between Dependency Injection Approaches',
  description: 'Your service imports an email sender directly. You want to make it testable. Which DI approach do you use?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['architecture', 'testing'],
  content: {
    overview: 'Dependency injection makes code testable by moving dependencies from hard-coded imports to parameters. The simplest form requires no framework — just pass what you need.',
    situation: `You have a UserService that sends welcome emails. Currently: \`import { sendEmail } from './emailService'\` — called directly inside the service. This makes unit testing hard (you'd have to mock the module). You want to make it testable without a DI framework. Your team has debated three approaches. Which do you recommend?`,
    options: [
      {
        id: 'a',
        label: 'Constructor/parameter injection: pass the emailSender as a parameter to the service function or class constructor',
        explanation: 'Parameter injection is the simplest, most explicit form of DI — no magic, no framework. `function UserService(emailSender) { ... }` or `function createUser(user, emailSender)`. In tests: pass a stub. In production: pass the real emailService. Dependencies are visible in the function signature — you always know what a module needs. This is the pattern used by virtually every testable JavaScript codebase. It requires no framework and works equally well with functions or classes.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Use a DI container (NestJS-style) to register and inject dependencies automatically',
        explanation: 'DI containers are useful at scale (large apps with many interdependent services) but overkill for most cases. They add learning curve, magic (dependencies appear "from nowhere"), and framework lock-in. Start with manual parameter injection — migrate to a container only if you have 50+ services with complex dependency graphs.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Use jest.mock() or similar to mock the import in tests',
        explanation: 'Module mocking works but it\'s a testing workaround for a design problem. The production code still has a hidden dependency (the import). Module mocks are brittle — they depend on module resolution, can cause test ordering issues, and make test setup verbose. Fixing the design (injection) fixes both production code quality and test simplicity simultaneously.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
