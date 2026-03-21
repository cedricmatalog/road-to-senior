import Link from 'next/link'
import { ALL_CHALLENGES } from '@/lib/challenges'
import { HomeProgress } from '@/components/ui/HomeProgress'

export default function HomePage() {
  const total = ALL_CHALLENGES.length
  const codeCount = ALL_CHALLENGES.filter(c => c.type === 'code').length
  const scenarioCount = ALL_CHALLENGES.filter(c => c.type === 'scenario').length

  return (
    <main style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--page-px)' }}>
      <style>{`
        .cta-primary {
          background: var(--accent);
          color: var(--bg);
          transition: opacity 0.15s;
        }
        .cta-primary:hover { opacity: 0.85; }
        .cta-secondary {
          border: 1px solid var(--border-hi);
          color: var(--text-dim);
          transition: border-color 0.15s, color 0.15s;
        }
        .cta-secondary:hover { border-color: var(--text-dim); color: var(--text); }

        /* Hero */
        .hero {
          padding: 56px 0 48px;
          border-bottom: 1px solid var(--border);
        }
        .hero-eyebrow {
          font-family: var(--mono);
          font-size: var(--text-xs);
          color: var(--accent);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero-title {
          font-family: var(--mono);
          font-size: clamp(44px, 14vw, 96px);
          font-weight: 500;
          line-height: 0.93;
          color: var(--text);
          margin: 0 0 6px;
          letter-spacing: -0.03em;
        }
        .hero-subtitle {
          font-family: var(--sans);
          font-size: var(--text-sm);
          color: var(--text-dim);
          font-weight: 300;
          max-width: 480px;
          margin-top: 24px;
          line-height: 1.7;
        }
        @media (min-width: 640px) {
          .hero { padding: 96px 0 80px; }
          .hero-subtitle { font-size: var(--text-base); }
        }

        /* CTAs */
        .cta-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 32px;
        }
        .cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: var(--text-sm);
          font-weight: 500;
          padding: 14px 24px;
          text-decoration: none;
          letter-spacing: 0.04em;
          min-height: 48px;
        }
        @media (min-width: 400px) {
          .cta-row { flex-direction: row; flex-wrap: wrap; }
          .cta-btn { min-height: auto; padding: 12px 24px; }
        }

        /* Stats */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-bottom: 1px solid var(--border);
        }
        .stat-cell {
          padding: 24px 16px;
        }
        .stat-cell:not(:last-child) {
          border-right: 1px solid var(--border);
        }
        .stat-value {
          font-family: var(--mono);
          font-size: var(--text-base);
          font-weight: 500;
          color: var(--accent);
          line-height: 1;
          margin: 0;
        }
        .stat-label {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-faint);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 6px;
        }
        @media (min-width: 640px) {
          .stat-cell { padding: 32px 24px; }
          .stat-value { font-size: var(--text-lg); }
          .stat-label { font-size: var(--text-xs); margin-top: 8px; }
        }

        /* Track cards */
        .track-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1px;
          background: var(--border);
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 640px) {
          .track-cards { grid-template-columns: 1fr 1fr; }
        }
        .track-card {
          background: var(--bg-card);
          display: block;
          padding: 28px 20px;
          text-decoration: none;
          transition: background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .track-card:hover { background: var(--bg-raised); }
        @media (min-width: 640px) {
          .track-card { padding: 40px; }
        }
        .track-tag {
          font-family: var(--mono);
          font-size: var(--text-xs);
          color: var(--accent);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .track-title {
          font-family: var(--mono);
          font-size: var(--text-sm);
          font-weight: 500;
          color: var(--text);
          line-height: 1.4;
          margin: 14px 0 16px;
          white-space: pre-line;
        }
        @media (min-width: 640px) {
          .track-title { font-size: var(--text-base); }
        }
        .track-body {
          font-family: var(--sans);
          font-size: var(--text-sm);
          color: var(--text-dim);
          line-height: 1.7;
          margin: 0;
        }

        /* Footer */
        .home-footer {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        @media (min-width: 640px) {
          .home-footer {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 24px 0;
          }
        }
        .footer-note {
          font-family: var(--mono);
          font-size: var(--text-xs);
          color: var(--text-faint);
          letter-spacing: 0.05em;
          margin: 0;
        }
      `}</style>

      {/* Hero */}
      <section className="hero">
        <p className="hero-eyebrow">v1.0 — JavaScript Engineering</p>

        <h1 className="hero-title">
          Road to<br />
          <span style={{ color: 'var(--accent)' }}>Senior</span>
          <span className="cursor" style={{ marginLeft: '4px' }} />
        </h1>

        <p className="hero-subtitle">
          Practical challenges that close the gap between mid-level and senior engineer. Write real code. Make real decisions.
        </p>

        <div className="cta-row">
          <Link href="/challenges" className="cta-primary cta-btn">
            Start Challenges →
          </Link>
          <Link href="/tracks" className="cta-secondary cta-btn">
            View Tracks
          </Link>
        </div>

        <HomeProgress />
      </section>

      {/* Stats */}
      <section className="stats-row">
        {[
          { value: String(total).padStart(2, '0'),         label: 'Total Challenges' },
          { value: String(codeCount).padStart(2, '0'),     label: 'Code Exercises' },
          { value: String(scenarioCount).padStart(2, '0'), label: 'Scenario Reviews' },
        ].map((stat, i) => (
          <div key={i} className="stat-cell">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Track cards */}
      <section className="track-cards">
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
          <Link key={i} href={track.href} className="track-card">
            <span className="track-tag">{track.tag}</span>
            <h2 className="track-title">{track.title}</h2>
            <p className="track-body">{track.body}</p>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p className="footer-note">Progress saved locally — no account required</p>
        <p className="footer-note">road-to-senior</p>
      </footer>
    </main>
  )
}
