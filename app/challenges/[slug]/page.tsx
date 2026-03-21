import { notFound } from 'next/navigation'
import { getChallengeBySlug } from '@/lib/challenges'
import { ChallengeDetailClient } from './ChallengeDetailClient'

export default async function ChallengePage({ params }: { params: { slug: string } }) {
  const challenge = getChallengeBySlug(params.slug)

  if (!challenge) notFound()

  return <ChallengeDetailClient challenge={challenge} />
}
