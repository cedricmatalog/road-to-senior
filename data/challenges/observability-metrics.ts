import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'observability-metrics',
  title: 'Implement a Custom Metric',
  description: 'Instrument a checkout flow to track business-critical performance.',
  type: 'code',
  difficulty: 'senior',
  skills: ['observability', 'performance'],
  content: {
    overview: 'Metrics are the numerical signals of system health. The most useful metrics are business-level (checkout completion rate, payment latency) not just infrastructure-level (CPU). Instrumenting code to emit metrics — counters, gauges, histograms — is a core senior skill.',
    starterCode: `// Implement a simple metrics collector with three methods:
// - increment(name, tags?) — increment a counter by 1
// - gauge(name, value, tags?) — record a point-in-time value
// - histogram(name, value, tags?) — record a value for distribution tracking
//   (histogram should track: count, sum, min, max)
//
// Tags are optional key-value pairs: { env: 'prod', region: 'us-east' }
// All metrics are stored internally and retrievable via getMetrics()

class MetricsCollector {
  // your code here
}`,
    solution: `class MetricsCollector {
  constructor() {
    this._counters = {}
    this._gauges = {}
    this._histograms = {}
  }

  _key(name, tags = {}) {
    const tagStr = Object.entries(tags).sort().map(([k, v]) => \`\${k}:\${v}\`).join(',')
    return tagStr ? \`\${name}{\${tagStr}}\` : name
  }

  increment(name, tags = {}) {
    const key = this._key(name, tags)
    this._counters[key] = (this._counters[key] ?? 0) + 1
  }

  gauge(name, value, tags = {}) {
    const key = this._key(name, tags)
    this._gauges[key] = value
  }

  histogram(name, value, tags = {}) {
    const key = this._key(name, tags)
    if (!this._histograms[key]) {
      this._histograms[key] = { count: 0, sum: 0, min: Infinity, max: -Infinity }
    }
    const h = this._histograms[key]
    h.count++
    h.sum += value
    h.min = Math.min(h.min, value)
    h.max = Math.max(h.max, value)
  }

  getMetrics() {
    return {
      counters: { ...this._counters },
      gauges: { ...this._gauges },
      histograms: { ...this._histograms },
    }
  }
}`,
    explanation: 'The key pattern is the tag-based key: by serializing sorted tags into a string, the same metric name with different tag combinations is stored separately. This mirrors how real metrics systems (Prometheus, StatsD, Datadog) work. Sorting the tags ensures { env: "prod", region: "us-east" } and { region: "us-east", env: "prod" } produce the same key.',
    hints: [
      'Tags let you slice the same metric by different dimensions — store them as part of the key.',
      'Sort tag entries before stringifying to ensure consistent keys regardless of insertion order.',
      'A histogram needs at minimum: count, sum (for average), min, and max.',
    ],
    testCases: [
      {
        description: 'increment creates and increments a counter',
        testCode: `const m = new MetricsCollector()
m.increment('requests')
m.increment('requests')
const { counters } = m.getMetrics()
console.log(counters['requests'] === 2 ? 'PASS' : 'FAIL: ' + JSON.stringify(counters))`,
      },
      {
        description: 'increment respects tags as separate keys',
        testCode: `const m = new MetricsCollector()
m.increment('requests', { status: '200' })
m.increment('requests', { status: '500' })
m.increment('requests', { status: '200' })
const { counters } = m.getMetrics()
const ok = counters['requests{status:200}'] === 2 && counters['requests{status:500}'] === 1
console.log(ok ? 'PASS' : 'FAIL: ' + JSON.stringify(counters))`,
      },
      {
        description: 'gauge stores latest value',
        testCode: `const m = new MetricsCollector()
m.gauge('queue_depth', 10)
m.gauge('queue_depth', 42)
const { gauges } = m.getMetrics()
console.log(gauges['queue_depth'] === 42 ? 'PASS' : 'FAIL: ' + gauges['queue_depth'])`,
      },
      {
        description: 'histogram tracks count, sum, min, max',
        testCode: `const m = new MetricsCollector()
m.histogram('latency_ms', 100)
m.histogram('latency_ms', 200)
m.histogram('latency_ms', 50)
const { histograms } = m.getMetrics()
const h = histograms['latency_ms']
const ok = h.count === 3 && h.sum === 350 && h.min === 50 && h.max === 200
console.log(ok ? 'PASS' : 'FAIL: ' + JSON.stringify(h))`,
      },
    ],
  },
}
export default challenge
