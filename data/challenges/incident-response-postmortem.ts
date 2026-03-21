import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'incident-response-postmortem',
  title: 'Write a Blameless Postmortem',
  description: 'An incident just resolved. How do you run the postmortem so it actually prevents recurrence?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['incident-response', 'communication'],
  content: {
    overview: 'A postmortem\'s goal is to prevent recurrence, not assign blame. Systems fail for systemic reasons — a contributing human made a reasonable decision given the information they had. The "5 whys" technique digs past surface causes to systemic ones. Action items must be assigned, time-boxed, and tracked to completion or they won\'t happen.',
    situation: `Yesterday\'s incident: a junior engineer deleted a production database table while running a migration script they thought was pointed at staging. The site was down for 47 minutes. The table was restored from a backup.\n\nYou\'re running the postmortem. How do you approach it?`,
    options: [
      {
        id: 'a',
        label: 'Focus on what the junior dev did wrong and document it as a reminder for the team to double-check environments before running migrations',
        explanation: 'This misses the point of a postmortem. "Be more careful" is not an action item — it doesn\'t change the system. A different person in the same situation (unclear environment config, easy to point scripts at the wrong target) would make the same mistake. The postmortem should ask: why was it possible to run a migration against prod without safeguards?',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Use 5 whys to find the systemic cause, keep the discussion blameless, and produce specific action items: e.g. require explicit --env=production flag, add a prod migration approval step, improve environment variable naming to prevent confusion',
        explanation: 'This is the right approach. 5 whys: Why did prod go down? → migration deleted a table. Why? → migration ran against prod. Why? → environment config was ambiguous. Why? → no safeguard differentiated prod from staging. Why? → migration tooling had no required confirmation step. The fix is systemic: make it hard to run destructive operations against prod by accident. Specific action items with owners and deadlines are the only way postmortems prevent recurrence. "Be careful" is not an action item.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Cancel the postmortem — the backup restored successfully, the incident is over',
        explanation: 'The incident is resolved but the conditions that caused it still exist. Without a postmortem, the next engineer in a similar situation will make the same mistake. The backup working was lucky, not systematic.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Document a policy that only senior engineers can run migrations',
        explanation: 'Restricting access is a form of process control, not a fix. It doesn\'t address why it was possible to accidentally target prod, and it creates a bottleneck for all future migrations. Better: make the tooling safe for anyone to use.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
