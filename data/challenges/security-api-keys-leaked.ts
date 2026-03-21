import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'security-api-keys-leaked',
  title: 'API Key Committed to Git',
  description: 'A developer accidentally committed a live API key to a public repo. What do you do?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['security'],
  content: {
    overview: 'A leaked API key is an active security incident. Bots scan GitHub continuously — assume the key was harvested within minutes. Revoke first, clean history after.',
    situation: `A junior dev on your team accidentally committed an AWS access key to a public GitHub repo 2 hours ago. The commit is in git history. They deleted the key from the file and pushed a new commit, but the key is still visible in the git history. You've just been told about it. What's the correct order of actions?`,
    options: [
      {
        id: 'a',
        label: 'Immediately revoke the key in AWS, then audit CloudTrail logs for unauthorized use, then clean the git history',
        explanation: 'Revoke first — assume the key has been scraped (bots find exposed keys within minutes). Revoking it makes cleanup a documentation problem rather than a security emergency. Then check CloudTrail or equivalent access logs to understand if the key was used. Cleaning git history (via BFG Repo Cleaner or `git filter-branch`) comes last — it\'s cosmetic once the key is dead. Deleting the file in a new commit does NOT remove it from history.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Rewrite the git history to remove the commit, then force-push to erase the key',
        explanation: 'History rewriting is part of the response but not the first step. If you spend 30 minutes on git surgery while the live key is still active, an attacker could be provisioning resources in your account. Revoke first, clean history after.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Make the repository private immediately to prevent further exposure',
        explanation: 'Making the repo private stops new exposure, but bots scrape public GitHub continuously — the key was likely harvested within minutes of the original commit. Privacy doesn\'t invalidate an already-seen key. You still need to revoke it.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
