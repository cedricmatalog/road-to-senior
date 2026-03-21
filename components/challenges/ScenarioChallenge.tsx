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
    if (selectedId) return  // already answered
    setSelectedId(id)
    onComplete()
  }

  const selected = content.options.find(o => o.id === selectedId)

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <p className="text-gray-800 leading-relaxed">{content.situation}</p>
      </div>

      <div className="space-y-3">
        {content.options.map(option => {
          const isSelected = selectedId === option.id
          const isAnswered = selectedId !== null
          const isRecommended = option.isRecommended

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered && !isSelected}
              className={`w-full text-left rounded-lg border p-4 transition-colors
                ${isAnswered && isSelected && isRecommended ? 'border-green-500 bg-green-50' : ''}
                ${isAnswered && isSelected && !isRecommended ? 'border-red-400 bg-red-50' : ''}
                ${!isAnswered ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50' : ''}
                ${isAnswered && !isSelected ? 'opacity-40 cursor-default' : 'cursor-pointer'}
              `}
            >
              <span className="font-medium">{option.label}</span>
            </button>
          )
        })}
      </div>

      {selected && (
        <div className={`rounded-lg p-4 ${selected.isRecommended ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
          <p className="text-sm font-semibold mb-1">{selected.isRecommended ? 'Good choice!' : 'Worth reconsidering'}</p>
          <p className="text-sm text-gray-700">{selected.explanation}</p>
          {!selected.isRecommended && (
            <p className="text-sm text-gray-500 mt-2">
              Recommended: <strong>{content.options.find(o => o.isRecommended)?.label}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
