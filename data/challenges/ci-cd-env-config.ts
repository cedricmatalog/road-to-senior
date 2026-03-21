import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'ci-cd-env-config',
  title: 'Manage Environment Configuration Safely',
  description: 'A junior dev committed a .env file to git. Fix the damage and prevent recurrence.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['ci-cd', 'security'],
  content: {
    overview: 'Secrets in version control is one of the most common and dangerous security mistakes. Once a secret is committed — even if deleted in a later commit — it exists forever in git history. The response requires both immediate remediation and structural prevention.',
    situation: `A junior developer committed a .env file containing database credentials, an API key for a payment processor, and a JWT signing secret to a public GitHub repository. The commit was pushed 3 hours ago. You discover this when a security scanner sends an alert.\n\nWhat do you do?`,
    options: [
      {
        id: 'a',
        label: 'Delete the .env file in a new commit and add it to .gitignore',
        explanation: 'This is dangerously insufficient. The file still exists in git history — anyone who cloned the repo in the last 3 hours has the credentials. The credentials themselves must be rotated immediately. Removing the file does not undo the exposure.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Immediately rotate all exposed credentials, then remove the file from git history with git filter-repo or BFG, add pre-commit hooks and CI checks to prevent future commits of secrets',
        explanation: 'This is the correct full response. Step 1: rotate all credentials immediately — assume they are compromised. Step 2: rewrite git history to remove the file (git filter-repo or BFG Repo Cleaner). Force-push the cleaned history and notify all contributors to re-clone. Step 3: add a pre-commit hook (e.g. gitleaks, detect-secrets) and a CI check to catch secrets before they reach the remote. Step 4: review access logs for the payment processor and database for the exposure window.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Make the repository private immediately, then clean up the history when you have time',
        explanation: 'Making the repo private is a good immediate step but it\'s not sufficient — the exposure window was 3 hours in a public repo. Bots scan GitHub for exposed credentials within minutes. Assume the credentials are already compromised and rotate them regardless.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Ask the junior dev to be more careful and document a policy about not committing .env files',
        explanation: 'Documentation and education matter, but they don\'t address the immediate security incident or prevent future accidents. Secrets management should be enforced by tooling (pre-commit hooks, CI checks, secrets managers), not by asking people to remember.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
