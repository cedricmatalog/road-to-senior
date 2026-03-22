import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-naming-things',
  title: 'Naming Variables and Functions',
  description: 'A reviewer says your variable names are hard to follow. What makes a name good?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['code-review', 'refactoring'],
  content: {
    overview: 'Good names are the cheapest form of documentation. A well-named variable or function tells you what it does without a comment. Names are for the next person reading the code — including future you.',
    situation: `Your reviewer leaves this comment on your PR:\n\n\`\`\`js\nconst d = new Date()\nconst x = users.filter(u => u.a === true)\nconst temp = processData(x)\n\`\`\`\n\n"These names don't tell me anything. What is \`d\`? What is \`a\`? What does \`temp\` contain?"\n\nWhat's the right way to rewrite these?`,
    options: [
      {
        id: 'a',
        label: 'Rename to describe intent: `now`, `activeUsers`, `processedUsers` — names should say what the value represents, not how it\'s stored',
        explanation: '`d` could be anything — a date, a distance, a dimension. `now` or `createdAt` is unambiguous. `x` is a placeholder — `activeUsers` says exactly what the filtered list contains. `temp` is the worst kind of name — it says "I\'ll name this properly later" but later never comes. The rule: if you had to describe the variable to a colleague, use that description as the name. Avoid abbreviations (`usr`, `btn`, `cnt`) unless they\'re universal conventions.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Add comments above each line explaining what the variables hold',
        explanation: 'Comments explaining bad names are worse than fixing the names. A comment can go stale — the code changes, the comment doesn\'t. A good name is always accurate. If you need a comment to explain a variable name, rename the variable instead.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Single-letter names are fine for short-lived variables — it\'s standard practice',
        explanation: 'Single letters are acceptable only in very narrow contexts: loop indexes (`i`, `j`), math functions (`x`, `y`), and arrow function parameters in simple one-liners (`users.map(u => u.name)`). For any variable that persists beyond a line or two, use a descriptive name. Readability scales with the scope — the wider the scope, the more descriptive the name should be.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
