import { Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import { ChallengeFilters } from '@/components/challenges/ChallengeFilters'
import type { Challenge } from '@/lib/types'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: { skill?: string; type?: string; difficulty?: string }
}

export default async function ChallengesPage({ searchParams }: PageProps) {
  let query = supabase.from('challenges').select('*')

  if (searchParams.skill) query = query.contains('skills', [searchParams.skill])
  if (searchParams.type) query = query.eq('type', searchParams.type)
  if (searchParams.difficulty) query = query.eq('difficulty', searchParams.difficulty)

  const { data, error } = await query.order('difficulty')

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-600">Failed to load challenges. Please refresh.</p>
      </main>
    )
  }

  const challenges = (data ?? []) as Challenge[]

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Challenges</h1>
      <Suspense fallback={null}>
        <ChallengeFilters />
      </Suspense>
      {challenges.length === 0 ? (
        <p className="text-gray-500">No challenges match these filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {challenges.map(c => <ChallengeCard key={c.slug} challenge={c} />)}
        </div>
      )}
    </main>
  )
}
