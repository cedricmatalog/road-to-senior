import Link from 'next/link'
import type { Challenge } from '@/lib/types'
import { SKILL_AREAS } from '@/lib/skills'
import { ChallengeCardCompleted } from './ChallengeCardCompleted'

const DIFF_CONFIG = {
  junior: { label: 'JR', color: '#4ade80' },
  mid:    { label: 'MID', color: '#facc15' },
  senior: { label: 'SR', color: '#f87171' },
}

const TYPE_CONFIG = {
  code:     { glyph: '{ }', title: 'Code' },
  scenario: { glyph: '///', title: 'Scenario' },
}

export function ChallengeCard({ challenge, index }: { challenge: Challenge; index?: number }) {
  const diff = DIFF_CONFIG[challenge.difficulty]
  const type = TYPE_CONFIG[challenge.type as keyof typeof TYPE_CONFIG] ?? { glyph: '?', title: challenge.type }
  const num = String((index ?? 0) + 1).padStart(2, '0')

  return (
    <div className="ch-row-wrap">
      <Link
        href={`/challenges/${challenge.slug}`}
        className="ch-row scanline"
        style={{ textDecoration: 'none', position: 'relative', display: 'block' }}
      >
        <ChallengeCardCompleted slug={challenge.slug} />
        <div className="ch-row-inner">
          {/* Index */}
          <span className="ch-col-idx">{num}</span>

          {/* Type glyph */}
          <span className="ch-col-type" title={type.title}>{type.glyph}</span>

          {/* Title + description */}
          <div className="ch-col-main">
            <span className="ch-title">{challenge.title}</span>
            <span className="ch-desc">{challenge.description}</span>
          </div>

          {/* Skills */}
          <div className="ch-col-skills">
            {challenge.skills.slice(0, 2).map(s => (
              <span key={s} className="ch-skill">{SKILL_AREAS[s]?.label ?? s}</span>
            ))}
            {challenge.skills.length > 2 && (
              <span className="ch-skill ch-skill-more">+{challenge.skills.length - 2}</span>
            )}
          </div>

          {/* Difficulty */}
          <span className="ch-col-diff" style={{ color: diff.color }}>{diff.label}</span>
        </div>
      </Link>
    </div>
  )
}
