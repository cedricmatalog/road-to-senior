import { ALL_CHALLENGES } from '@/lib/challenges'
import { SkillMap } from '@/components/skill-map/SkillMap'

export default function SkillMapPage() {
  const challenges = ALL_CHALLENGES.map(c => ({ slug: c.slug, skills: c.skills }))

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      <div style={{ padding: '48px 0 32px', borderBottom: '1px solid var(--border)', marginBottom: '40px' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Skill Map</p>
        <h1 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Coverage</h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)', margin: 0 }}>The skills that define a senior engineer. <span style={{ color: 'var(--amber)' }}>Amber</span> = gap.</p>
      </div>
      <SkillMap challenges={challenges} />
      <div style={{ height: '64px' }} />
    </main>
  )
}
