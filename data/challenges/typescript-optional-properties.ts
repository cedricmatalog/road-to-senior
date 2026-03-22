import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'typescript-optional-properties',
  title: 'Optional vs Required Properties',
  description: 'You\'re building a user profile card. Some fields like name are always present; others like bio are user-supplied and may be missing.',
  type: 'code',
  difficulty: 'junior',
  skills: ['typescript'],
  content: {
    overview: 'In TypeScript, adding `?` after a property name makes it optional — the object can exist without it. Required properties must always be present. Getting this right prevents "cannot read property of undefined" bugs and documents your data shape so every caller knows what to expect.',
    starterCode: `// You're building a user profile card component.
// Every user has an id, name, and email (set during signup).
// Bio and avatarUrl are optional — users fill them in later.
//
// Define the UserProfile interface, then implement:
// - getDisplayName(user): returns the user's name
// - getAvatar(user): returns avatarUrl, or '/default-avatar.png' if not set

interface UserProfile {
  // your interface here
}

function getDisplayName(user: UserProfile): string {
  // your code here
  return ''
}

function getAvatar(user: UserProfile): string {
  // your code here
  return ''
}`,
    solution: `interface UserProfile {
  id: number
  name: string
  email: string
  bio?: string
  avatarUrl?: string
}

function getDisplayName(user: UserProfile): string {
  return user.name
}

function getAvatar(user: UserProfile): string {
  return user.avatarUrl ?? '/default-avatar.png'
}`,
    explanation: 'Optional properties use `?`: `bio?: string`. Required properties have no `?`. For `getAvatar`, the nullish coalescing operator `??` returns the right-hand value when the left is `null` or `undefined` — cleaner than an if/else.',
    hints: [
      'Optional properties use `?`: `bio?: string`',
      'For `getAvatar`, use the nullish coalescing operator `??` to fall back to the default',
      'Required properties have no `?` — TypeScript will error if they\'re missing when creating an object',
    ],
    testCases: [
      {
        description: 'getDisplayName returns name',
        testCode: `const user = { id: 1, name: 'Alice', email: 'a@b.com' }
assert.strictEqual(getDisplayName(user), 'Alice')`,
      },
      {
        description: 'getAvatar returns avatarUrl when set',
        testCode: `const user = { id: 1, name: 'Alice', email: 'a@b.com', avatarUrl: '/alice.png' }
assert.strictEqual(getAvatar(user), '/alice.png')`,
      },
      {
        description: 'getAvatar returns default when avatarUrl missing',
        testCode: `const user = { id: 2, name: 'Bob', email: 'b@b.com' }
assert.strictEqual(getAvatar(user), '/default-avatar.png')`,
      },
    ],
  },
}
export default challenge
