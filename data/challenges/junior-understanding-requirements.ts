import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'junior-understanding-requirements',
  title: 'The Ticket Is Vague',
  description: 'You\'re assigned a ticket with unclear requirements. How do you proceed?',
  type: 'scenario',
  difficulty: 'junior',
  skills: ['communication'],
  content: {
    overview: 'Unclear requirements are one of the biggest sources of wasted work. Asking clarifying questions before coding is always faster than building the wrong thing.',
    situation: `Your ticket says: "Improve the dashboard performance."\n\nNo acceptance criteria. No specific metrics. No details on which parts are slow. You have two options on how to start. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Ask the ticket author for specifics before starting: which pages, what "improved" means, and how you\'ll know when it\'s done',
        explanation: 'Ambiguous tickets produce ambiguous results. Before writing a line of code, clarify: "Which part of the dashboard is slow? Is there a target load time? Are there specific user complaints or metrics to hit?" This takes 5 minutes and can save days of work in the wrong direction. It also shows maturity — experienced engineers always define "done" before starting.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Start with whatever performance improvements you know — lazy loading, memoization — and show results later',
        explanation: 'Guessing at the problem means you might improve the wrong thing entirely. Maybe the complaint is about a specific slow query, or a large bundle, or a slow third-party widget — not the general things you\'d reach for first. Optimising blindly wastes time and can introduce unintended side effects.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Mark the ticket as blocked and wait for it to be updated before doing anything',
        explanation: 'Marking as blocked without taking action to clarify is passive. You have enough information to ask good questions — do that. Blocked status is for when you genuinely can\'t proceed and have already tried to get the information you need.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
