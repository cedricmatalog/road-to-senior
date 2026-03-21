import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Challenge } from '@/lib/types'
import { ChallengeDetailClient } from './ChallengeDetailClient'

export default async function ChallengePage({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !data) notFound()

  return <ChallengeDetailClient challenge={data as Challenge} />
}
