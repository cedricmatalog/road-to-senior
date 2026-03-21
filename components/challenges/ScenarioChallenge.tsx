'use client'

import { useState } from 'react'
import type { ScenarioContent } from '@/lib/types'

interface ScenarioChallengeProps {
  content: ScenarioContent
  onComplete: () => void
  onAnswer?: () => void
}

export function ScenarioChallenge({ content, onComplete, onAnswer }: ScenarioChallengeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  function handleSelect(id: string) {
    if (selectedId) return
    setSelectedId(id)
    onAnswer?.()
    const option = content.options.find(o => o.id === id)
    if (option?.isRecommended) onComplete()
  }

  const isAnswered = selectedId !== null

  return (
    <>
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
