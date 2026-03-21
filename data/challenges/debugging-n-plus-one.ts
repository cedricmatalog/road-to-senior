import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'debugging-n-plus-one',
  title: 'Diagnosing an N+1 Query Problem',
  description: 'A page that displays a list of posts with their authors is slow. How do you diagnose and fix it?',
  type: 'scenario',
  difficulty: 'mid',
  skills: ['debugging', 'performance'],
  content: {
    overview: 'The N+1 query is one of the most common database performance bugs. It\'s invisible until you turn on query logging — and obvious once you do.',
    situation: `A "blog posts" page takes 3 seconds to load. It shows 50 posts, each with the author's name. The database has 50k posts and 10k users. There are no slow query logs firing. When you add query logging, you see 51 database queries running for one page load — one to get the 50 posts, then one per post to get the author. How do you fix this?`,
    options: [
      {
        id: 'a',
        label: 'Fix with a JOIN or two-query approach: fetch all posts with authors in one query, or batch the user IDs into a single WHERE IN lookup',
        explanation: "This is the N+1 problem — 1 query to get N items, then N queries to get related data. Two fixes: (1) SQL JOIN: SELECT posts.*, users.name FROM posts JOIN users ON posts.author_id = users.id — one query, (2) two-query approach: fetch posts, collect unique author_ids, then SELECT * FROM users WHERE id IN (...) — two queries. The JOIN is clean for simple cases; the two-query approach is better when you need to avoid duplicating post data or when working with an ORM. Both reduce 51 queries to 1-2. ORM users: this is what .include(:author) (Rails), with('author') (Laravel), or relations: ['author'] (TypeORM) solve.",
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Cache each author lookup in Redis so repeated queries for the same author are fast',
        explanation: 'Caching reduces the per-query cost but doesn\'t eliminate the 50 round trips. With 50 cache hits you still have 50 network round trips to Redis. Eliminating the queries entirely (JOIN/batch) is faster and simpler than caching each one.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Paginate to 10 posts per page — that reduces the N+1 to 11 queries instead of 51',
        explanation: 'This reduces the symptom, not the cause. You still have N+1 — it\'s just a smaller N. As soon as you show more posts or the feature grows, the problem returns. Fix the query pattern, not the page size.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
