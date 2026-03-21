'use client'

import { useProgress } from '@/context/ProgressContext'
import { CodeChallenge } from '@/components/challenges/CodeChallenge'
import { ScenarioChallenge } from '@/components/challenges/ScenarioChallenge'
import { SignUpPrompt } from '@/components/ui/SignUpPrompt'
import type { Challenge, CodeContent, ScenarioContent } from '@/lib/types'

export function ChallengeDetailClient({ challenge }: { challenge: Challenge }) {
  const { completed, markComplete } = useProgress()
  const isCompleted = completed.includes(challenge.slug)

  function handleComplete() {
    if (!isCompleted) {
      markComplete(challenge.slug)
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
        <p className="text-gray-600 mt-2">{challenge.description}</p>
        {isCompleted && (
          <span className="inline-block mt-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-0.5">
            Completed
          </span>
        )}
      </div>

      {challenge.type === 'code' ? (
        <CodeChallenge content={challenge.content as CodeContent} onComplete={handleComplete} />
      ) : (
        <ScenarioChallenge content={challenge.content as ScenarioContent} onComplete={handleComplete} />
      )}

      {/* SignUpPrompt manages its own visibility via sessionStorage — always rendered so it can check */}
      <SignUpPrompt showAfterCompletion={isCompleted} />
    </main>
  )
}
