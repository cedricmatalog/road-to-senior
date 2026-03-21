'use client'

import { useState } from 'react'
import type { ScenarioContent } from '@/lib/types'

interface ScenarioChallengeProps {
  content: ScenarioContent
  onComplete: () => void
}

export function ScenarioChallenge({ content, onComplete }: ScenarioChallengeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleSelect(id: string) {
    if (selectedId) return
    setSelectedId(id)
    const option = content.options.find(o => o.id === id)
    if (option?.isRecommended) onComplete()
  }

  const isAnswered = selectedId !== null

  return (
    <>
      <style>{`
        /* Overview */
        .sc-overview {
          padding: 16px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-left: 3px solid var(--border-hi);
          margin-bottom: 24px;
        }
        .sc-overview p {
          font-family: var(--sans); font-size: 13px; color: var(--text-dim);
          line-height: 1.7; margin: 0;
        }

        /* Situation */
        .sc-situation {
          padding: 24px 28px;
          background: var(--bg-card);
          border: 1px solid var(--border-hi);
          margin-bottom: 28px;
          position: relative;
        }
        .sc-situation-label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--accent);
          margin: 0 0 14px; display: flex; align-items: center; gap: 8px;
        }
        .sc-situation-label::after {
          content: ''; flex: 1; height: 1px; background: rgba(200,241,53,0.15);
        }
        .sc-situation-text {
          font-family: var(--sans); font-size: 15px; color: var(--text);
          line-height: 1.8; margin: 0;
        }

        /* Options */
        .sc-options-label {
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--text-faint); margin: 0 0 10px;
        }
        .sc-option {
          width: 100%; text-align: left; cursor: pointer;
          display: grid; grid-template-columns: 40px 1fr;
          align-items: stretch; gap: 0;
          border: 1px solid var(--border);
          border-top: none;
          background: var(--bg-card);
          padding: 0; transition: border-color 0.12s, background 0.12s;
          overflow: hidden;
        }
        .sc-option:first-of-type { border-top: 1px solid var(--border); }
        .sc-option:hover:not(:disabled) { border-color: var(--border-hi); background: var(--bg-raised); }
        .sc-option:disabled { cursor: default; }
        .sc-option-key {
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 12px; font-weight: 500;
          color: var(--text-faint); background: var(--bg);
          border-right: 1px solid var(--border);
          transition: all 0.12s;
          padding: 16px 0;
        }
        .sc-option:hover:not(:disabled) .sc-option-key {
          color: var(--text); background: var(--bg-raised);
        }
        .sc-option-text {
          font-family: var(--sans); font-size: 14px; color: var(--text);
          line-height: 1.55; padding: 16px 18px;
          transition: color 0.12s;
        }

        /* Option states after answering */
        .sc-option-correct {
          border-color: var(--accent) !important;
          background: rgba(200,241,53,0.04) !important;
        }
        .sc-option-correct .sc-option-key {
          color: var(--accent); background: rgba(200,241,53,0.08);
          border-right-color: rgba(200,241,53,0.2);
        }
        .sc-option-wrong {
          border-color: var(--red) !important;
          background: rgba(255,77,77,0.04) !important;
        }
        .sc-option-wrong .sc-option-key {
          color: var(--red); background: rgba(255,77,77,0.08);
          border-right-color: rgba(255,77,77,0.2);
        }
        .sc-option-dimmed { opacity: 0.25; }
        .sc-option-dimmed .sc-option-text { color: var(--text-faint); }

        /* Breakdown */
        .sc-breakdown {
          margin-top: 28px; display: flex; flex-direction: column; gap: 0;
          border: 1px solid var(--border); overflow: hidden;
        }
        .sc-breakdown-header {
          padding: 10px 16px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--text-faint);
        }
        .sc-breakdown-item {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          display: flex; gap: 16px; align-items: flex-start;
          animation: bdIn 0.25s ease both;
        }
        .sc-breakdown-item:last-child { border-bottom: none; }
        @keyframes bdIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sc-bd-icon {
          font-family: var(--mono); font-size: 11px; font-weight: 500;
          flex-shrink: 0; margin-top: 2px; width: 18px; text-align: center;
        }
        .sc-bd-body { flex: 1; min-width: 0; }
        .sc-bd-verdict {
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em;
          text-transform: uppercase; margin: 0 0 6px;
        }
        .sc-bd-explanation {
          font-family: var(--sans); font-size: 13px; color: var(--text-dim);
          line-height: 1.65; margin: 0;
        }
      `}</style>

      {/* Overview */}
      {content.overview && (
        <div className="sc-overview">
          <p>{content.overview}</p>
        </div>
      )}

      {/* Situation */}
      <div className="sc-situation">
        <p className="sc-situation-label">Situation</p>
        <p className="sc-situation-text">{content.situation}</p>
      </div>

      {/* Options */}
      <div>
        <p className="sc-options-label">Your move</p>
        {content.options.map((option, i) => {
          const isSelected = selectedId === option.id
          const dimmed = isAnswered && !isSelected
          const correct = isAnswered && isSelected && option.isRecommended
          const wrong = isAnswered && isSelected && !option.isRecommended

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={dimmed || isAnswered}
              className={[
                'sc-option',
                correct ? 'sc-option-correct' : '',
                wrong ? 'sc-option-wrong' : '',
                dimmed ? 'sc-option-dimmed' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="sc-option-key">
                {isAnswered && isSelected
                  ? (option.isRecommended ? '✓' : '✗')
                  : String.fromCharCode(65 + i)}
              </span>
              <span className="sc-option-text">{option.label}</span>
            </button>
          )
        })}
      </div>

      {/* Breakdown */}
      {isAnswered && (
        <div className="sc-breakdown">
          <div className="sc-breakdown-header">Breakdown</div>
          {content.options.map((option, i) => {
            const isSelected = selectedId === option.id
            const verdict = isSelected
              ? (option.isRecommended ? '✓ Your choice — correct' : '✗ Your choice — not ideal')
              : (option.isRecommended ? '✓ Best answer' : null)
            const accentColor = option.isRecommended ? 'var(--accent)' : isSelected ? 'var(--red)' : null

            return (
              <div
                key={option.id}
                className="sc-breakdown-item"
                style={{
                  animationDelay: `${i * 70}ms`,
                  opacity: !isSelected && !option.isRecommended ? 0.5 : 1,
                  background: isSelected
                    ? (option.isRecommended ? 'rgba(200,241,53,0.03)' : 'rgba(255,77,77,0.03)')
                    : 'transparent',
                }}
              >
                <span className="sc-bd-icon" style={{ color: accentColor ?? 'var(--text-faint)' }}>
                  {String.fromCharCode(65 + i)}
                </span>
                <div className="sc-bd-body">
                  {verdict && (
                    <p className="sc-bd-verdict" style={{ color: accentColor ?? 'var(--text-faint)' }}>
                      {verdict}
                    </p>
                  )}
                  <p className="sc-bd-explanation">{option.explanation}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
