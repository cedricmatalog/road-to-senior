import { supabase } from '@/lib/supabase'
import { SkillMap } from '@/components/skill-map/SkillMap'

export default async function SkillMapPage() {
  const { data, error } = await supabase.from('challenges').select('slug, skills')

  if (error) {
    console.error('Failed to load challenges for skill map:', error)
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-600">Failed to load skill map. Please refresh.</p>
      </main>
    )
  }

  // data is { slug: string, skills: string[] }[] — a valid subset of Challenge
  const challenges = (data ?? []) as Array<{ slug: string; skills: string[] }>

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill Map</h1>
      <p className="text-gray-500 mb-8">Your coverage across the skills that define a senior engineer.</p>
      <SkillMap challenges={challenges} />
    </main>
  )
}
