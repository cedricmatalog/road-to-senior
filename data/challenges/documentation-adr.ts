import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'documentation-adr',
  title: 'Write an Architecture Decision Record',
  description: 'The team keeps relitigating the same database choice. Write an ADR to settle it.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['documentation'],
  content: {
    overview: 'An Architecture Decision Record (ADR) documents a significant technical decision: the context that led to it, the options considered, and the reasoning behind the choice. ADRs are written once and referenced forever — they stop teams from relitigating decisions and help new engineers understand why the system is the way it is.',
    situation: `Every quarter, someone proposes switching from PostgreSQL to MongoDB for your main datastore. The debate consumes hours of meeting time and always ends with "let\'s keep Postgres for now" with no written record. A new senior engineer just joined and immediately asked "why aren\'t we using MongoDB?"\n\nYour tech lead asks you to write an ADR so this conversation can finally be closed. The real reasons Postgres was chosen: strong relational integrity for financial transactions, existing team expertise, mature tooling, and the data is highly relational (users → orders → line items → products). MongoDB was evaluated but rejected because flexible schemas were not needed and the join-heavy queries would have been harder.\n\nWhat does a good ADR include?`,
    options: [
      {
        id: 'a',
        label: 'Write a Confluence page summarizing the last meeting\'s discussion and link it in the Slack channel',
        explanation: 'Meeting notes decay. A Confluence page in a channel that\'ll be archived is not a decision record — it\'s a log. ADRs live in the codebase (docs/decisions/ or adr/) so they\'re versioned with the code and discoverable by anyone reading the repo.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Write a short structured document with: Status, Context, Decision, Consequences — commit it to the repo as docs/decisions/001-database-choice.md',
        explanation: 'This is the ADR format. Status: Accepted. Context: the business and technical situation that required a decision (financial transactions, relational data model, team expertise). Decision: "We will use PostgreSQL as our primary datastore." Consequences: what becomes easier, what becomes harder, what\'s explicitly out of scope. Committing to the repo means it\'s versioned, searchable, and lives with the code it describes. The next time someone asks, the answer is: read ADR-001. An ADR doesn\'t have to be long — 200-400 words is normal.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Create a detailed technical comparison document with benchmarks for PostgreSQL vs MongoDB vs DynamoDB vs MySQL',
        explanation: 'Exhaustive comparisons are useful inputs to a decision, not the decision itself. An ADR should be concise and focused on why you chose what you chose, not a comprehensive survey of every alternative. The reader needs to understand the reasoning, not re-evaluate every option from scratch.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Add a comment in the database configuration file explaining why PostgreSQL was chosen',
        explanation: 'A code comment is better than nothing, but it\'s not discoverable or searchable at the organizational level. Someone who doesn\'t know to look there won\'t find it. ADRs in a dedicated directory are the standard pattern for this reason.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
