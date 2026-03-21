import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'code-review-security-issue',
  title: 'Catching a SQL Injection in Review',
  description: 'You spot a SQL injection vulnerability in a PR. How do you handle it?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['code-review', 'security'],
  content: {
    overview: 'Security vulnerabilities found in review cost orders of magnitude less to fix than those found in production. Every engineer is a security reviewer.',
    situation: `You're reviewing a PR that adds a user search endpoint. You see this code:\n\n\`const query = \`SELECT * FROM users WHERE name = '\${req.query.name}'\`\`\n\nThis is a textbook SQL injection vulnerability. The author is a mid-level dev who clearly didn't think about it. The PR is otherwise well-written. How do you handle this in the review?`,
    options: [
      {
        id: 'a',
        label: 'Block the PR, explain the SQL injection risk specifically, show the parameterised query fix, and link to a resource on the topic',
        explanation: 'Security vulnerabilities are blockers — this one can\'t ship. Be specific about the attack: "A user could pass `\' OR 1=1 --` as the name and get all users in the database." Show the fix: use parameterised queries (`WHERE name = $1` with `[req.query.name]`). Link to OWASP SQL Injection. The mid-level dev may not have security training — this is a teaching moment, not a blame moment. A clear explanation with the correct pattern prevents the same mistake in future PRs.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Fix it yourself in the PR to ship faster and mention it to them later',
        explanation: 'Fixing it yourself skips the teaching moment. The dev needs to understand *why* this is dangerous, not just that you changed their string interpolation to parameterised. They\'ll write the same vulnerability in the next feature.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Approve the PR but add a TODO comment to fix the injection before going to production',
        explanation: 'TODOs in security-critical code are promises that rarely get kept. "Fix before production" TODOs become production code. Never approve a security vulnerability — it creates a false signal in the git history that the code was reviewed and approved.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
