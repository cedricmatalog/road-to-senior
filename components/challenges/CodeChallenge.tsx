'use client'

import { useState, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import type { CodeContent } from '@/lib/types'
import type { TestResult } from '@/lib/judge0'

interface CodeChallengeProps {
  content: CodeContent
  onComplete: () => void
}

export function CodeChallenge({ content, onComplete }: CodeChallengeProps) {
  const [code, setCode] = useState(content.starterCode)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [compileError, setCompileError] = useState<string | null>(null)
  const [runtimeError, setRuntimeError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const completedRef = useRef(false)

  async function handleRun() {
    setLoading(true)
    setFetchError(null)
    setResults(null)
    setCompileError(null)
    setRuntimeError(null)

    try {
      const res = await fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userCode: code, testCases: content.testCases }),
      })

      if (!res.ok) throw new Error(`Server error ${res.status}`)

      const data = await res.json()
      setResults(data.results ?? null)
      setCompileError(data.compileError ?? null)
      setRuntimeError(data.runtimeError ?? null)

      const allPassed = data.results?.every((r: TestResult) => r.passed)
      if (allPassed && !completedRef.current) {
        completedRef.current = true
        onComplete()
      }
    } catch {
      setFetchError('Could not reach the code runner. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        theme={oneDark}
        onChange={setCode}
      />

      <button
        onClick={handleRun}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Running…' : 'Run Tests'}
      </button>

      {fetchError && (
        <p className="text-sm text-red-600">
          <span>Could not reach the code runner. </span>
          <button onClick={handleRun} className="underline">Try again</button>
        </p>
      )}

      {compileError && (
        <pre className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 overflow-auto">{compileError}</pre>
      )}

      {runtimeError && (
        <pre className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700 overflow-auto">{runtimeError}</pre>
      )}

      {results && (
        <ul className="space-y-2">
          {results.map((r, i) => (
            <li key={i} className={`flex items-start gap-2 text-sm rounded-lg p-3 ${r.passed ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <span>{r.passed ? '✓' : '✗'}</span>
              <span>{r.description}{r.message ? `: ${r.message}` : ''}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
