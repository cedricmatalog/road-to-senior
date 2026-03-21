import Link from 'next/link'
import { ALL_CHALLENGES } from '@/lib/challenges'
import { HomeProgress } from '@/components/ui/HomeProgress'

export default function HomePage() {
  const total = ALL_CHALLENGES.length
  const codeCount = ALL_CHALLENGES.filter(c => c.type === 'code').length
  const scenarioCount = ALL_CHALLENGES.filter(c => c.type === 'scenario').length

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      <style>{`
        .cta-primary { background: var(--accent); color: var(--bg); transition: opacity 0.15s; }
        .cta-primary:hover { opacity: 0.85; }
        .cta-secondary { border: 1px solid var(--border-hi); color: var(--text-dim); transition: border-color 0.15s, color 0.15s; }
        .cta-secondary:hover { border-color: var(--text-dim); color: var(--text); }
        .track-card { background: var(--bg-card); border: 1px solid var(--border); transition: border-color 0.2s; }
        .track-card:hover { border-color: var(--border-hi); }
      `}</style>

      {/* Hero */}
      <section style={{ paddingTop: '96px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>
          v1.0 — JavaScript Engineering
        </p>

        <h1 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 500, lineHeight: '0.95', color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
          Road to<br />
          <span style={{ color: 'var(--accent)' }}>Senior</span>
          <span className="cursor" style={{ marginLeft: '4px' }} />
        </h1>

        <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-base)', color: 'var(--text-dim)', fontWeight: 300, maxWidth: '480px', marginTop: '28px', lineHeight: '1.7' }}>
          Practical challenges that close the gap between mid-level and senior engineer. Write real code. Make real decisions.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '40px', flexWrap: 'wrap' }}>
          <Link href="/challenges" className="cta-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', fontWeight: 500,
            padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.04em',
          }}>
            Start Challenges →
          </Link>
          <Link href="/tracks" className="cta-secondary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)',
            padding: '12px 24px', textDecoration: 'none', letterSpacing: '0.04em',
          }}>
            View Tracks
          </Link>
        </div>
        <HomeProgress />
      </section>

      {/* Stats row */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--border)' }}>
        {[
          { value: String(total).padStart(2, '0'), label: 'Total Challenges' },
          { value: String(codeCount).padStart(2, '0'), label: 'Code Exercises' },
          { value: String(scenarioCount).padStart(2, '0'), label: 'Scenario Reviews' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '32px 24px',
            borderRight: i < 2 ? '1px solid var(--border)' : 'none',
          }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--accent)', lineHeight: 1, margin: 0 }}>{stat.value}</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '8px' }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Track cards */}
      <section style={{ padding: '64px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)', borderBottom: '1px solid var(--border)' }}>
        {[
          {
            tag: 'Code',
            title: 'Fix it.\nTest it.\nShip it.',
            body: 'Real JavaScript problems with a test harness. No scaffolding, no hints. Just your code against the spec.',
            href: '/challenges?type=code',
          },
          {
            tag: 'Scenario',
            title: 'Read the room.\nMake the call.',
            body: 'Engineering decisions, PR reviews, system design tradeoffs. The soft skills that separate seniors from the rest.',
            href: '/challenges?type=scenario',
          },
        ].map((track, i) => (
          <Link key={i} href={track.href} className="track-card" style={{
            display: 'block', padding: '40px', textDecoration: 'none',
          }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{track.tag}</span>
            <h2 style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--text)', lineHeight: 1.3, margin: '16px 0 20px', whiteSpace: 'pre-line' }}>{track.title}</h2>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>{track.body}</p>
          </Link>
        ))}
      </section>

      {/* Footer note */}
      <footer style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.05em', margin: 0 }}>Progress saved locally — no account required</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.05em', margin: 0 }}>road-to-senior</p>
      </footer>

    </main>
  )
}
