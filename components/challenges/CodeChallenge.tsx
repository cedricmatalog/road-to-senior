'use client'

import { useState, useRef, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { indentWithTab } from '@codemirror/commands'
import { keymap } from '@codemirror/view'
import { autocompletion, acceptCompletion } from '@codemirror/autocomplete'
import type { CodeContent } from '@/lib/types'
import type { TestResult } from '@/lib/judge0'

interface CodeChallengeProps {
  content: CodeContent
  onComplete: () => void
  onAnswer?: () => void
}

export function CodeChallenge({ content, onComplete, onAnswer }: CodeChallengeProps) {
  const [code, setCode] = useState(content.starterCode)
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [compileError, setCompileError] = useState<string | null>(null)
  const [runtimeError, setRuntimeError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [showAnswerConfirm, setShowAnswerConfirm] = useState(false)
  const [answerShown, setAnswerShown] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const completedRef = useRef(false)
  const hints = content.hints ?? []
  const solution = content.solution
  const explanation = content.explanation
  const overview = content.overview

  const passedCount = results?.filter(r => r.passed).length ?? 0
  const totalCount = results?.length ?? 0
  const allPassed = results !== null && passedCount === totalCount

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        if (!loading) handleRun()
      }
      if (e.key === 'Escape' && showAnswerConfirm) {
        setShowAnswerConfirm(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, showAnswerConfirm])

  function handleShowAnswer() {
    if (!showAnswerConfirm) { setShowAnswerConfirm(true); return }
    setCode(solution!)
    setAnswerShown(true)
    setShowAnswerConfirm(false)
    setResults(null)
    if (explanation) setShowExplanation(true)
  }

  async function handleRun() {
    if (!code?.trim()) {
      setCompileError('Nothing to run — write some code first.')
      return
    }
    setLoading(true)
    setFetchError(false)
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

      const passed = data.results?.every((r: TestResult) => r.passed)
      if (passed && !completedRef.current) {
        completedRef.current = true
        onAnswer?.()
        onComplete()
        if (explanation) setShowExplanation(true)
      }
    } catch {
      setFetchError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        /* Editor chrome */
        .editor-chrome {
          border: 1px solid var(--border);
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .editor-chrome:focus-within { border-color: var(--border-hi); }
        .editor-toolbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 14px; height: 36px;
          background: #1a1a1c;
          border-bottom: 1px solid var(--border);
        }
        .editor-filename {
          font-family: var(--mono); font-size: 11px; color: var(--text-faint);
          letter-spacing: 0.04em; display: flex; align-items: center; gap: 8px;
        }
        .editor-filename-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--border-hi); flex-shrink: 0;
        }
        .editor-kbd {
          font-family: var(--mono); font-size: 9px; color: var(--text-faint);
          letter-spacing: 0.06em; opacity: 0.6;
        }

        /* Run button */
        .run-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          border: none; padding: 10px 20px; cursor: pointer;
          transition: opacity 0.15s, background 0.15s;
          position: relative; overflow: hidden;
        }
        .run-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.08);
          opacity: 0; transition: opacity 0.15s;
        }
        .run-btn:hover::before { opacity: 1; }
        .run-btn:disabled { cursor: not-allowed; }

        /* Test results */
        .results-bar {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-bottom: none;
          background: var(--bg-card);
        }
        .results-bar-count {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-dim);
        }
        .results-bar-progress {
          flex: 1; height: 2px; background: var(--border); border-radius: 1px; overflow: hidden;
        }
        .results-bar-fill {
          height: 100%; border-radius: 1px; transition: width 0.4s ease;
        }
        .test-row {
          font-family: var(--mono); font-size: 12px;
          padding: 10px 14px;
          border: 1px solid var(--border);
          border-top: none;
          display: flex; flex-direction: column; gap: 4px;
          animation: testIn 0.2s ease both;
        }
        @keyframes testIn {
          from { opacity: 0; transform: translateX(-3px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .test-row-main { display: flex; gap: 10px; align-items: flex-start; }
        .test-icon { flex-shrink: 0; font-size: 11px; line-height: 1.5; }
        .test-hint {
          font-family: var(--sans); font-size: 12px; color: var(--text-faint);
          margin: 2px 0 0 21px; line-height: 1.5;
        }

        /* Hints */
        .hints-section {
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .hints-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
        }
        .hints-label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--text-faint);
        }
        .hint-item {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          display: flex; gap: 12px; align-items: flex-start;
          animation: testIn 0.25s ease both;
        }
        .hint-item:last-child { border-bottom: none; }
        .hint-num {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          color: var(--accent-dim); flex-shrink: 0; margin-top: 3px;
          background: rgba(200,241,53,0.06); padding: 1px 6px;
        }
        .hint-text {
          font-family: var(--sans); font-size: 13px; color: var(--text-dim); line-height: 1.6;
        }

        /* Overview */
        .overview-block {
          padding: 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-left: 3px solid var(--border-hi);
        }
        .overview-text {
          font-family: var(--sans); font-size: 13px; color: var(--text-dim); line-height: 1.7; margin: 0;
        }

        /* Explanation */
        .explanation-block {
          padding: 20px;
          background: rgba(200,241,53,0.03);
          border: 1px solid rgba(200,241,53,0.12);
          animation: testIn 0.3s ease both;
        }
        .explanation-label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--accent-dim); margin: 0 0 10px;
        }
        .explanation-text {
          font-family: var(--sans); font-size: 14px; color: var(--text-dim); line-height: 1.75; margin: 0;
        }

        /* Toolbar actions */
        .toolbar-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .ghost-btn {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;
          background: none; border: 1px solid var(--border); color: var(--text-faint);
          padding: 5px 12px; cursor: pointer; transition: all 0.12s;
        }
        .ghost-btn:hover { border-color: var(--border-hi); color: var(--text-dim); }
        .ghost-btn-danger:hover { border-color: var(--red); color: var(--red); }
        .ghost-btn-accent:hover { border-color: var(--accent-dim); color: var(--accent); }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

        {/* Overview */}
        {overview && (
          <div className="overview-block">
            <p className="overview-text">{overview}</p>
          </div>
        )}

        {/* Editor */}
        <div className="editor-chrome">
          <div className="editor-toolbar">
            <div className="editor-filename">
              <div className="editor-filename-dot" style={{ background: answerShown ? 'var(--accent)' : 'var(--border-hi)' }} />
              solution.js
            </div>
            <span className="editor-kbd">⌘↵ to run</span>
          </div>
          <CodeMirror
            value={code}
            height="340px"
            extensions={[
              javascript(),
              autocompletion(),
              keymap.of([{ key: 'Tab', run: acceptCompletion }, indentWithTab]),
            ]}
            theme={oneDark}
            onChange={setCode}
            style={{ fontFamily: 'var(--mono)' }}
          />
        </div>

        {/* Run + secondary actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <button
            onClick={handleRun}
            disabled={loading}
            className="run-btn"
            style={{
              background: loading ? 'var(--bg-raised)' : allPassed ? 'var(--accent)' : 'var(--accent)',
              color: loading ? 'var(--text-dim)' : 'var(--bg)',
              opacity: loading ? 0.6 : 1,
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)' }}>{loading ? '■' : '▶'}</span>
            {loading ? 'Running…' : 'Run Tests'}
          </button>

          <div className="toolbar-actions">
            {hints.length > 0 && hintsRevealed < hints.length && (
              <button
                className="ghost-btn ghost-btn-accent"
                onClick={() => setHintsRevealed(h => h + 1)}
              >
                {hintsRevealed === 0 ? '? Hint' : `? Hint ${hintsRevealed + 1}/${hints.length}`}
              </button>
            )}

            {solution && !answerShown && !showAnswerConfirm && (
              <button className="ghost-btn ghost-btn-danger" onClick={handleShowAnswer}>
                ⚑ Answer
              </button>
            )}
            {showAnswerConfirm && (
              <>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-dim)' }}>Load solution?</span>
                <button className="ghost-btn ghost-btn-danger" onClick={handleShowAnswer}>Yes</button>
                <button className="ghost-btn" onClick={() => setShowAnswerConfirm(false)}>Cancel</button>
              </>
            )}
            {answerShown && (
              <button className="ghost-btn" onClick={() => { setCode(content.starterCode); setAnswerShown(false); setResults(null) }}>
                ↺ Reset
              </button>
            )}
          </div>
        </div>

        {/* Fetch error */}
        {fetchError && (
          <div style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--red)', border: '1px solid rgba(255,77,77,0.2)', padding: '10px 14px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span>Could not reach the runner.</span>
            <button onClick={handleRun} style={{ color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', textDecoration: 'underline', padding: 0 }}>Retry</button>
          </div>
        )}

        {/* Compile / runtime errors */}
        {compileError && (
          <pre style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--red)', background: 'rgba(255,77,77,0.05)', border: '1px solid rgba(255,77,77,0.2)', padding: '14px', overflowX: 'auto', margin: 0, lineHeight: 1.6 }}>{compileError}</pre>
        )}
        {runtimeError && (
          <pre style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--amber)', background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)', padding: '14px', overflowX: 'auto', margin: 0, lineHeight: 1.6 }}>{runtimeError}</pre>
        )}

        {/* Hints revealed */}
        {hintsRevealed > 0 && (
          <div className="hints-section">
            <div className="hints-header">
              <span className="hints-label">Hints</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.08em' }}>
                {hintsRevealed}/{hints.length}
              </span>
            </div>
            {hints.slice(0, hintsRevealed).map((hint, i) => (
              <div key={i} className="hint-item" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="hint-num">H{i + 1}</span>
                <span className="hint-text">{hint}</span>
              </div>
            ))}
          </div>
        )}

        {/* Test results */}
        {results && (
          <div>
            {/* Summary bar */}
            <div className="results-bar">
              <span className="results-bar-count" style={{ color: allPassed ? 'var(--accent)' : passedCount > 0 ? 'var(--amber)' : 'var(--red)' }}>
                {passedCount}/{totalCount}
              </span>
              <div className="results-bar-progress">
                <div
                  className="results-bar-fill"
                  style={{
                    width: `${(passedCount / totalCount) * 100}%`,
                    background: allPassed ? 'var(--accent)' : passedCount > 0 ? 'var(--amber)' : 'var(--red)',
                  }}
                />
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: allPassed ? 'var(--accent)' : 'var(--text-faint)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {allPassed ? 'All passed' : 'Tests'}
              </span>
            </div>

            {results.map((r, i) => {
              const tc = content.testCases[i]
              return (
                <div
                  key={r.description}
                  className="test-row"
                  style={{
                    background: r.passed ? 'rgba(200,241,53,0.04)' : 'rgba(255,77,77,0.04)',
                    borderLeftColor: r.passed ? 'var(--accent)' : 'var(--red)',
                    borderLeftWidth: '2px',
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <div className="test-row-main">
                    <span className="test-icon" style={{ color: r.passed ? 'var(--accent)' : 'var(--red)' }}>
                      {r.passed ? '✓' : '✗'}
                    </span>
                    <span style={{ color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', lineHeight: 1.5 }}>
                      {r.description}
                      {r.message && <span style={{ color: 'var(--red)' }}>: {r.message}</span>}
                    </span>
                  </div>
                  {tc?.explanation && !r.passed && (
                    <p className="test-hint">{tc.explanation}</p>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Explanation */}
        {showExplanation && explanation && (
          <div className="explanation-block">
            <p className="explanation-label">◈ Explanation</p>
            <p className="explanation-text">{explanation}</p>
          </div>
        )}
      </div>
    </>
  )
}
