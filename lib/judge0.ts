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

  const res = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
    body: JSON.stringify({ source_code, language_id: 63, stdin: '' }),
    signal: AbortSignal.timeout(10_000),
  })

  if (!res.ok) throw new Error(`Judge0 HTTP ${res.status}`)

  const data = await res.json()

  if (data.status?.id === 6) {
    return { results: [], compileError: data.compile_output ?? 'Compilation error', runtimeError: null }
  }
  if (data.status?.id === 11) {
    return { results: [], compileError: null, runtimeError: data.stderr ?? 'Runtime error' }
  }

  const descriptions = testCases.map(tc => tc.description)
  return {
    results: parseResults(data.stdout ?? '', descriptions),
    compileError: null,
    runtimeError: null,
  }
}
