'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useProgress } from '@/context/ProgressContext'
import { CodeChallenge } from '@/components/challenges/CodeChallenge'
import { ScenarioChallenge } from '@/components/challenges/ScenarioChallenge'
import { SignUpPrompt } from '@/components/ui/SignUpPrompt'
import { ALL_CHALLENGES } from '@/lib/challenges'
import { SKILL_AREAS } from '@/lib/skills'
import type { Challenge, CodeContent, ScenarioContent } from '@/lib/types'

const DIFF_CONFIG = {
  junior: { label: 'Junior', color: '#4ade80', rgb: '74,222,128' },
  mid:    { label: 'Mid',    color: '#facc15', rgb: '250,204,21' },
  senior: { label: 'Senior', color: '#f87171', rgb: '248,113,113' },
}

const TYPE_CONFIG = {
  code:     { glyph: '{ }', label: 'Code' },
  scenario: { glyph: '///', label: 'Scenario' },
}

export function ChallengeDetailClient({ challenge }: { challenge: Challenge }) {
  const { completed, markComplete } = useProgress()
  const isCompleted = completed.includes(challenge.slug)
  const [isAnswered, setIsAnswered] = useState(false)
  useEffect(() => { if (isCompleted) setIsAnswered(true) }, [isCompleted])
  const diff = DIFF_CONFIG[challenge.difficulty] ?? { label: challenge.difficulty, color: 'var(--text-dim)', rgb: '100,100,100' }
  const typeInfo = TYPE_CONFIG[challenge.type as keyof typeof TYPE_CONFIG] ?? { glyph: '?', label: challenge.type }

  const idx = ALL_CHALLENGES.findIndex(c => c.slug === challenge.slug)
  const prev = idx > 0 ? ALL_CHALLENGES[idx - 1] : null
  const next = idx < ALL_CHALLENGES.length - 1 ? ALL_CHALLENGES[idx + 1] : null

  function handleComplete() {
    if (!isCompleted) markComplete(challenge.slug)
    setIsAnswered(true)
  }

  function handleAnswer() {
    setIsAnswered(true)
  }

  return (
    <div className="challenge-detail-root">
      <style>{`
        .challenge-detail-root {
          animation: detailIn 0.35s ease both;
        }
        @keyframes detailIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top difficulty stripe */
        .diff-stripe {
          height: 2px;
          width: 100%;
          background: linear-gradient(90deg, rgba(${diff.rgb},0.9) 0%, rgba(${diff.rgb},0.2) 60%, transparent 100%);
        }

        /* Nav bar — mobile first */
        .detail-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          position: sticky;
          top: 52px;
          z-index: 20;
          gap: 8px;
        }
        .detail-nav-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .detail-nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .nav-back {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-faint); text-decoration: none;
          display: flex; align-items: center; gap: 5px;
          transition: color 0.12s; white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
          padding: 4px 0;
        }
        .nav-back:hover { color: var(--text); }
        .nav-type-badge {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--text-faint);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        /* Hide type badge on very small screens */
        @media (max-width: 380px) { .nav-type-badge { display: none; } }
        .nav-step {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-faint); text-decoration: none;
          transition: color 0.12s; padding: 4px 2px;
          -webkit-tap-highlight-color: transparent;
          min-width: 40px; text-align: center;
        }
        .nav-step:hover { color: var(--text); }
        .nav-step-disabled {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.06em;
          color: var(--text-faint); opacity: 0.25;
          min-width: 40px; text-align: center;
        }
        .nav-counter {
          font-family: var(--mono); font-size: 9px;
          color: var(--text-faint); letter-spacing: 0.08em;
          padding: 0 8px; border-left: 1px solid var(--border); border-right: 1px solid var(--border);
          white-space: nowrap;
        }
        @media (min-width: 640px) {
          .detail-nav { padding: 14px 24px; }
          .detail-nav-left { gap: 20px; }
          .detail-nav-right { gap: 16px; }
          .nav-counter { padding: 0 12px; font-size: 10px; }
        }

        /* Header */
        .challenge-header {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 24px var(--page-px) 20px;
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 640px) {
          .challenge-header { padding: 32px 24px 28px; }
        }
        .challenge-meta {
          display: flex; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap;
        }
        .meta-diff {
          font-family: var(--mono); font-size: 10px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 8px; border: 1px solid currentColor;
        }
        .meta-type {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--text-faint);
        }
        .meta-complete {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em;
          color: var(--accent);
          display: flex; align-items: center; gap: 5px;
          padding: 3px 8px; border: 1px solid rgba(200,241,53,0.3);
          background: rgba(200,241,53,0.05);
        }
        .challenge-title {
          font-family: var(--mono);
          font-size: clamp(20px, 3.5vw, 30px);
          font-weight: 500;
          color: var(--text);
          margin: 0 0 10px;
          letter-spacing: -0.02em;
          line-height: 1.25;
        }
        .challenge-desc {
          font-family: var(--sans);
          font-size: 14px;
          color: var(--text-dim);
          margin: 0 0 16px;
          line-height: 1.7;
          max-width: 640px;
        }
        .skill-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .skill-tag {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--text-faint);
          border: 1px solid var(--border); padding: 2px 8px;
        }

        /* Body */
        .challenge-body {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 24px var(--page-px);
        }
        @media (min-width: 640px) {
          .challenge-body { padding: 32px 24px; }
        }

        /* Up next */
        .up-next {
          max-width: var(--page-max);
          margin: 0 auto;
          padding: 0 var(--page-px);
        }
        @media (min-width: 640px) {
          .up-next { padding: 0 24px; }
        }
        .up-next-inner {
          border-top: 1px solid var(--border);
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .up-next-inner { padding: 28px 0; gap: 20px; }
        }
        .up-next-label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--accent); margin: 0 0 6px;
        }
        .up-next-title {
          font-family: var(--mono); font-size: 13px; color: var(--text); margin: 0;
          letter-spacing: -0.01em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          max-width: 180px;
        }
        @media (min-width: 480px) { .up-next-title { max-width: 300px; font-size: 14px; } }
        @media (min-width: 640px) { .up-next-title { max-width: 500px; } }
        .up-next-cta {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em;
          text-transform: uppercase; text-decoration: none;
          color: var(--bg); background: var(--accent);
          padding: 10px 16px; flex-shrink: 0; white-space: nowrap;
          transition: opacity 0.15s;
          -webkit-tap-highlight-color: transparent;
          min-height: 44px; display: flex; align-items: center;
        }
        .up-next-cta:hover { opacity: 0.85; }
        @media (min-width: 640px) { .up-next-cta { padding: 10px 20px; } }
      `}</style>

      {/* Difficulty stripe */}
      <div className="diff-stripe" />

      {/* Sticky nav */}
      <div className="detail-nav">
        <div className="detail-nav-left">
          <Link href="/challenges" className="nav-back">
            <span style={{ lineHeight: 1 }}>←</span>
            <span>Challenges</span>
          </Link>
          <span className="nav-type-badge" style={{ color: diff.color }}>
            {typeInfo.glyph} {typeInfo.label}
          </span>
        </div>
        <div className="detail-nav-right">
          {prev ? (
            <Link href={`/challenges/${prev.slug}`} className="nav-step" title={prev.title}>←</Link>
          ) : (
            <span className="nav-step-disabled">←</span>
          )}
          <span className="nav-counter">{idx + 1} / {ALL_CHALLENGES.length}</span>
          {next ? (
            <Link href={`/challenges/${next.slug}`} className="nav-step" title={next.title}>→</Link>
          ) : (
            <span className="nav-step-disabled">→</span>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="challenge-header">
        <div className="challenge-meta">
          <span className="meta-diff" style={{ color: diff.color, borderColor: `rgba(${diff.rgb},0.4)` }}>
            {diff.label}
          </span>
          <span className="meta-type">{typeInfo.glyph}</span>
          {isCompleted && (
            <span className="meta-complete">✓ completed</span>
          )}
        </div>
        <h1 className="challenge-title">{challenge.title}</h1>
        <p className="challenge-desc">{challenge.description}</p>
        <div className="skill-tags">
          {challenge.skills.map(s => (
            <span key={s} className="skill-tag">
              {SKILL_AREAS[s]?.label ?? s}
            </span>
          ))}
        </div>
      </div>

      {/* Challenge body */}
      <div className="challenge-body">
        {challenge.type === 'code' ? (
          <CodeChallenge content={challenge.content as CodeContent} onComplete={handleComplete} onAnswer={handleAnswer} />
        ) : (
          <ScenarioChallenge content={challenge.content as ScenarioContent} onComplete={handleComplete} onAnswer={handleAnswer} />
        )}
      </div>

      {/* Up next */}
      {isAnswered && next && (
        <div className="up-next">
          <div className="up-next-inner">
            <div>
              <p className="up-next-label">Up next</p>
              <p className="up-next-title">{next.title}</p>
            </div>
            <Link href={`/challenges/${next.slug}`} className="up-next-cta">
              Next →
            </Link>
          </div>
        </div>
      )}

      <div style={{ height: '64px' }} />
      <SignUpPrompt showAfterCompletion={isCompleted} />
    </div>
  )
}
