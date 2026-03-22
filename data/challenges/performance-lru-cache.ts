import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'performance-lru-cache',
  title: 'Implement an LRU Cache',
  description: 'A profile lookup hits the database on every request. You want to cache recent results but can\'t let memory grow unboundedly. Build a fixed-capacity cache that drops the least recently used entry.',
  type: 'code',
  difficulty: 'senior',
  skills: ['performance', 'architecture'],
  content: {
    overview: `An LRU cache keeps the most recently accessed items and discards the least recently used when full. It's used in browser caches, database query caches, and CDNs. The efficient implementation uses a Map (which maintains insertion order) as a doubly-linked list substitute.`,
    starterCode: `// Implement an LRU (Least Recently Used) cache with:
// - constructor(capacity) — max number of entries
// - get(key) — returns value or -1 if not found (marks as recently used)
// - put(key, value) — inserts or updates (evicts LRU if at capacity)

class LRUCache {
  constructor(capacity) {
    // your code here
  }
}`,
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }
  get(key) {
    if (!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }
  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key)
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}`,
    explanation: `JavaScript's Map maintains insertion order. To make a key "most recently used", delete it and re-insert it at the end. The least recently used key is always \`map.keys().next().value\` (the first key). This gives O(1) get, set, and eviction without a custom doubly-linked list. This Map trick is a well-known pattern in JavaScript interviews and production code.`,
    hints: [
      'Use a Map — it maintains insertion order, making the first key the least recently used.',
      'On get: delete the key and re-set it to move it to "most recently used" position.',
      'On set: if over capacity, delete the first key (map.keys().next().value) before inserting.',
    ],
    testCases: [
      {
        description: 'get returns -1 for missing keys',
        explanation: 'Cache miss must return -1, not undefined or null.',
        testCode: `
class LRUCache {
  constructor(c) { this.capacity = c; this.cache = new Map() }
  get(k) { if (!this.cache.has(k)) return -1; const v = this.cache.get(k); this.cache.delete(k); this.cache.set(k, v); return v }
  set(k, v) { if (this.cache.has(k)) this.cache.delete(k); else if (this.cache.size >= this.capacity) this.cache.delete(this.cache.keys().next().value); this.cache.set(k, v) }
}
const c = new LRUCache(2)
if (c.get('x') === -1) { console.log("PASS") } else { console.log("FAIL") }`,
      },
      {
        description: 'evicts least recently used on overflow',
        explanation: 'When capacity is exceeded, the least recently used key must be evicted.',
        testCode: `
class LRUCache {
  constructor(c) { this.capacity = c; this.cache = new Map() }
  get(k) { if (!this.cache.has(k)) return -1; const v = this.cache.get(k); this.cache.delete(k); this.cache.set(k, v); return v }
  set(k, v) { if (this.cache.has(k)) this.cache.delete(k); else if (this.cache.size >= this.capacity) this.cache.delete(this.cache.keys().next().value); this.cache.set(k, v) }
}
const c = new LRUCache(2)
c.set('a', 1); c.set('b', 2)
c.get('a') // 'a' is now most recently used
c.set('c', 3) // 'b' should be evicted (LRU)
if (c.get('b') === -1 && c.get('a') === 1 && c.get('c') === 3) { console.log("PASS") }
else { console.log("FAIL: a=" + c.get('a') + " b=" + c.get('b') + " c=" + c.get('c')) }`,
      },
    ],
  },
}
export default challenge
