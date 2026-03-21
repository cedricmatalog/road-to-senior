'use client'

import Link from 'next/link'

interface SkillCardProps {
  label: string
  slug: string
  coverage: number  // 0-1
}

export function SkillCard({ label, slug, coverage }: SkillCardProps) {
  const isGap = coverage <= 0.3
  const pct = Math.round(coverage * 100)

  return (
    <Link
      href={`/challenges?skill=${slug}`}
      data-testid="skill-card"
      data-gap={String(isGap)}
      className={`block rounded-lg border p-4 hover:shadow-md transition-shadow ${isGap ? 'border-amber-400 bg-amber-50' : 'border-gray-200 bg-white'}`}
    >
      <p className="font-medium text-sm text-gray-800 mb-2">{label}</p>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} completion: ${pct}%`}
        className="h-2 rounded-full bg-gray-100 overflow-hidden"
      >
        <div
          className={`h-full rounded-full ${isGap ? 'bg-amber-400' : 'bg-green-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">{pct}% complete</p>
    </Link>
  )
}
