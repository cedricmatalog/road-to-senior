import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-copy-paste-code',
  title: 'You Copied Code You Don\'t Fully Understand',
  description: 'You found working code on Stack Overflow and it solves your problem. Should you use it?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['debugging', 'security'],
  content: {
    overview: 'Using existing solutions is smart. Copying code you can\'t explain is a liability — you can\'t debug it when it breaks, and you might introduce security issues without knowing.',
    situation: `You need to implement file upload with drag-and-drop. You find a Stack Overflow answer with 200 upvotes that does exactly what you need — 50 lines of code. You paste it in and it works. Your lead asks in code review: "Can you walk me through how this file validation part works?" You realise you can\'t explain it. What should you have done?`,
    options: [
      {
        id: 'a',
        label: 'Read and understand the code before using it — be able to explain every meaningful line, especially security-sensitive parts',
        explanation: 'Copy-pasting working code is fine as a starting point, but you must understand what it does before shipping it. For file uploads specifically: does it validate file type? File size? Is it vulnerable to path traversal? A 200-upvote answer might be 5 years old and insecure by today\'s standards. If you can\'t explain a line, look it up. Understanding the code you ship is a professional responsibility — not just a nice-to-have.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'It has 200 upvotes and works — that\'s sufficient validation for production use',
        explanation: 'Upvotes measure helpfulness at the time of posting, not security or correctness for your specific context. Old answers may use deprecated APIs or have known vulnerabilities. You\'re responsible for the code you ship, regardless of where it came from.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a comment linking to the Stack Overflow answer so the team knows where it came from',
        explanation: 'Linking to sources is good practice — but it doesn\'t substitute for understanding. A link doesn\'t help when the code breaks at 2am and you need to debug it. It also doesn\'t help you spot security issues before they reach production.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
