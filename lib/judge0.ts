export interface TestResult {
  description: string
  passed: boolean
  message: string | null
}

export function buildSubmissionCode(
  userCode: string,
  testCases: Array<{ description: string; testCode: string }>
): string {
  const harness = testCases.map(tc => tc.testCode).join('\n')
  return `${userCode}\n\n// --- test harness ---\n${harness}`
}

export function parseResults(stdout: string, descriptions: string[]): TestResult[] {
  const lines = stdout.trim().split('\n')
  return descriptions.map((description, i) => {
    const line = lines[i] ?? ''
    if (line === 'PASS') return { description, passed: true, message: null }
    const message = line.startsWith('FAIL: ') ? line.slice(6) : line || 'No output'
    return { description, passed: false, message }
  })
}

export async function runCode(
  userCode: string,
  testCases: Array<{ description: string; testCode: string }>
): Promise<{ results: TestResult[]; compileError: string | null; runtimeError: string | null }> {
  const source_code = buildSubmissionCode(userCode, testCases)
  const descriptions = testCases.map(tc => tc.description)

  try {
    const vm = await import('vm')
    const lines: string[] = []
    const ctx: Record<string, unknown> = {
      console: { log: (...args: unknown[]) => lines.push(args.map(String).join(' ')) },
      setTimeout, clearTimeout, setInterval, clearInterval,
      Promise, Error, JSON, Math, Array, Object, String, Number, Boolean,
    }
    ctx.global = ctx

    const sandbox = vm.createContext(ctx)
    // Run synchronously — kicks off async Promise chains in the host event loop
    new vm.Script(source_code).runInContext(sandbox, { timeout: 5000 })

    // Drain the microtask/macrotask queue until output stabilises or 5s passes.
    // vm Promises share the host event loop, so yielding here lets .then() callbacks fire.
    const deadline = Date.now() + 5000
    let prev = -1
    while (lines.length !== prev && Date.now() < deadline) {
      prev = lines.length
      await new Promise(r => setTimeout(r, 20))
    }
    // One final yield to catch any last microtasks after the last setTimeout batch
    await new Promise(r => setTimeout(r, 20))

    return { results: parseResults(lines.join('\n'), descriptions), compileError: null, runtimeError: null }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (err instanceof SyntaxError) {
      return { results: [], compileError: msg, runtimeError: null }
    }
    return { results: [], compileError: null, runtimeError: msg }
  }
}
