import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'system-design-search',
  title: 'Add Full-Text Search to Your App',
  description: 'Users need to search across 1M+ product records. Your PostgreSQL LIKE queries are too slow. What\'s your approach?',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['system-design', 'performance'],
  content: {
    overview: 'Always optimise in place before reaching for a new system. PostgreSQL full-text search handles millions of records well. Elasticsearch is powerful but operationally expensive — earn it.',
    situation: `Your e-commerce app has 1M+ products. Users can search by name, description, and tags. Currently you're using PostgreSQL with ILIKE queries — they're taking 2-5 seconds on large searches. You need sub-100ms search. The data changes ~5,000 times per day (new products, price updates). You have 2 engineers and about 2 weeks. What's your approach?`,
    options: [
      {
        id: 'a',
        label: 'Add PostgreSQL full-text search with GIN indexes first — if still too slow, then evaluate Elasticsearch',
        explanation: 'Start with what you have. PostgreSQL\'s full-text search (tsvector + GIN index) gets you to 100-500ms easily and handles most search needs — stemming, ranking, multi-column search. Setup takes a day, not a week. Only move to Elasticsearch if you need advanced features (fuzzy matching, faceted search, geo) or sub-10ms at very high load. Elasticsearch adds operational complexity (another service, index sync, cluster management) that two engineers don\'t need for a straightforward product search. Optimise in place first.',
        isRecommended: true,
      },
      {
        id: 'b',
        label: 'Migrate to Elasticsearch — it\'s purpose-built for search and will scale better',
        explanation: 'Elasticsearch is powerful but operationally heavy. Index synchronisation from PostgreSQL requires an ETL pipeline. You now maintain two data stores and handle eventual consistency. With 2 engineers and 2 weeks, this is unlikely to ship well. PostgreSQL full-text handles millions of records at acceptable speeds with a fraction of the complexity.',
        isRecommended: false,
      },
      {
        id: 'c',
        label: 'Add a Redis cache for the most common search queries',
        explanation: 'Caching helps for repeated identical queries but not for long-tail searches (which are most searches). Users constantly search for new terms that aren\'t cached. This reduces load without solving the latency problem for uncached queries. It\'s a complement to indexing, not a replacement.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
