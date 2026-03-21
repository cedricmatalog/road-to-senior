import Link from 'next/link'
import type { Challenge } from '@/lib/types'
import { SKILL_AREAS } from '@/lib/skills'

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const difficultyColor = {
    junior: 'bg-green-100 text-green-700',
    mid: 'bg-yellow-100 text-yellow-700',
    senior: 'bg-red-100 text-red-700',
  }[challenge.difficulty] ?? 'bg-gray-100 text-gray-600'

  return (
    <Link href={`/challenges/${challenge.slug}`} className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor}`}>
          {challenge.difficulty}
        </span>
        <span className="text-xs text-gray-500">{challenge.type}</span>
      </div>
      <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{challenge.description}</p>
      <div className="flex flex-wrap gap-1 mt-3">
        {challenge.skills.map(s => (
          <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {SKILL_AREAS[s]?.label ?? s}
          </span>
        ))}
      </div>
    </Link>
  )
}
