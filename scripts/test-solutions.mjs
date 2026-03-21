/**
 * Runs every code challenge's solution against its test cases.
 * Reports any that fail.
 */
import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import vm from 'vm'

const __dirname = dirname(fileURLToPath(import.meta.url))
const challengesDir = join(__dirname, '../data/challenges')

function buildHarness(solution, testCases) {
  const blocks = testCases.map(tc => {
    return `{
const assert = {
  strictEqual(a, b) { if (a !== b) throw new Error(String(a) + ' !== ' + String(b)) },
  deepStrictEqual(a, b) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(JSON.stringify(a) + ' !== ' + JSON.stringify(b)) },
  deepEqual(a, b) { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(JSON.stringify(a) + ' !== ' + JSON.stringify(b)) },
  ok(v, msg) { if (!v) throw new Error(msg || 'Expected truthy') },
  doesNotThrow(fn) { try { fn() } catch(e) { throw new Error('Expected not to throw but got: ' + e.message) } },
};
const _linesBefore = _lines.length;
try {
${tc.testCode}
if (_lines.length === _linesBefore) console.log('PASS')
} catch(e) { console.log('FAIL: ' + e.message) }
}`
  })
  return `${solution}\n\n// --- tests ---\n${blocks.join('\n')}`
}

async function runSolution(slug, solution, testCases) {
  const lines = []
  const ctx = {
    _lines: lines,
    console: { log: (...args) => lines.push(args.map(String).join(' ')) },
    setTimeout, clearTimeout, setInterval, clearInterval,
    Promise, Error, JSON, Math, Array, Object, String, Number, Boolean,
  }
  ctx.global = ctx

  const source = buildHarness(solution, testCases)
  const sandbox = vm.createContext(ctx)

  try {
    new vm.Script(source).runInContext(sandbox, { timeout: 5000 })

    const deadline = Date.now() + 5000
    let prev = -1
    while (lines.length !== prev && Date.now() < deadline) {
      prev = lines.length
      await new Promise(r => setTimeout(r, 20))
    }
    await new Promise(r => setTimeout(r, 20))
  } catch (err) {
    return { slug, error: err.message, results: [] }
  }

  const results = testCases.map((tc, i) => ({
    description: tc.description,
    line: lines[i] ?? '(no output)',
    passed: lines[i] === 'PASS',
  }))

  return { slug, error: null, results }
}

// Dynamically import all challenge files
const files = readdirSync(challengesDir).filter(f => f.endsWith('.ts'))

let passed = 0
let failed = 0
const failures = []

for (const file of files) {
  const raw = readFileSync(join(challengesDir, file), 'utf8')

  // Only process code challenges
  if (!raw.includes("type: 'code'")) continue

  // Extract solution and testCases via naive regex on the raw TS source
  const solutionMatch = raw.match(/solution:\s*`([\s\S]*?)`,?\s*\n\s*(explanation|hints|testCases)/)
  const testCodeMatches = [...raw.matchAll(/testCode:\s*`([\s\S]*?)`/g)]
  const descMatches = [...raw.matchAll(/description:\s*'([^']+)'/g)]

  if (!solutionMatch || testCodeMatches.length === 0) {
    console.log(`⚠  SKIP  ${file} — could not extract solution or tests`)
    continue
  }

  // Skip TypeScript-only challenges (type syntax can't run in a plain JS VM)
  if (solutionMatch[1].includes('type My') || solutionMatch[1].includes(': T[K]')) {
    console.log(`⚠  SKIP  ${file.replace('.ts','')} — TypeScript type-level only`)
    continue
  }

  // Unescape: TS template literals store \\ as \\, \` as \` etc — we need to eval them back
  function unescape(s) {
    return s.replace(/\\`/g, '`').replace(/\\\\/g, '\\').replace(/\\\$/g, '$')
  }

  const solution = unescape(solutionMatch[1].trim())
  const testCases = testCodeMatches.map((m, i) => ({
    testCode: unescape(m[1].trim()),
    description: descMatches[i + 1]?.[1] ?? `test ${i + 1}`,
  }))

  const slug = file.replace('.ts', '')
  const result = await runSolution(slug, solution, testCases)

  // top-level await in test code can't run in a plain vm.Script context
  const hasTopLevelAwait = testCases.some(tc => /^\s*const\s+\w+\s*=\s*await|^\s*await\s+/m.test(tc.testCode))
  if (hasTopLevelAwait) {
    console.log(`⚠  SKIP  ${slug} — top-level await (works in browser, not in plain vm)`)
    continue
  }

  const allPassed = result.error == null && result.results.every(r => r.passed)

  if (allPassed) {
    passed++
    console.log(`✓  ${slug}`)
  } else {
    failed++
    failures.push(result)
    console.log(`✗  ${slug}`)
    if (result.error) {
      console.log(`   Error: ${result.error}`)
    } else {
      result.results.filter(r => !r.passed).forEach(r => {
        console.log(`   FAIL [${r.description}]: ${r.line}`)
      })
    }
  }
}

console.log(`\n${passed + failed} challenges — ${passed} passed, ${failed} failed`)
if (failed > 0) process.exit(1)
