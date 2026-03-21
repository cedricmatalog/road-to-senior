import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'api-design-rest-conventions',
  title: 'Design a REST API for a Todo Service',
  description: 'Review a proposed API design and identify what violates REST conventions.',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['api-design'],
  content: {
    overview: 'Good API design is a contract. The people consuming your API — including future you — depend on it being predictable. REST has conventions, not rules, but violating them creates friction that compounds over time.',
    situation: `A teammate proposes this API for a todo service:\n\nGET  /getTodos\nPOST /createTodo\nPOST /deleteTodo?id=123\nGET  /markTodoDone?id=123\n\nYou're doing a design review before implementation starts. What's your response?`,
    options: [
      {
        id: 'a',
        label: 'The design is fine — it works and the names are clear enough',
        explanation: 'It works, but "works" is a low bar for an API you\'ll maintain for years. Clear names don\'t substitute for consistent conventions. The issue is not readability — it\'s predictability. Anyone who knows REST will be confused by these choices.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Redesign using resource-oriented URLs and HTTP verbs: GET /todos, POST /todos, DELETE /todos/:id, PATCH /todos/:id',
        explanation: 'This is the right call. REST uses nouns for URLs and HTTP verbs for actions. GET /todos (list), POST /todos (create), DELETE /todos/:id (delete), PATCH /todos/:id (update status). Verbs in URLs (getTodos, createTodo) and using POST for deletes are red flags that signal the designer doesn\'t understand REST. Fix it before implementation, not after.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'It\'s an internal API so conventions don\'t matter — just document it well',
        explanation: '"Internal" APIs become external eventually, get consumed by more teams, and outlive their original context. Documentation that compensates for bad design is a maintenance burden. The cost of a 15-minute redesign now vs. years of confusion is obvious.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Suggest adding versioning (v1/) and authentication but leave the URL structure as-is',
        explanation: 'Versioning and auth are important additions, but they don\'t fix the core problem: the URL structure violates REST conventions. You\'re layering good practices on a broken foundation.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
