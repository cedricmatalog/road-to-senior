import Link from 'next/link'

export function Nav() {
  return (
    <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
      <style>{`
        .nav-link { color: var(--text-dim); transition: color 0.15s; }
        .nav-link:hover { color: var(--text); }
      `}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'var(--mono)', fontWeight: 500, fontSize: 'var(--text-sm)', color: 'var(--text)', textDecoration: 'none', letterSpacing: '0.05em' }}>
          RTS<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/challenges" className="nav-link" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Challenges
          </Link>
          <Link href="/tracks" className="nav-link" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Tracks
          </Link>
          <Link href="/skill-map" className="nav-link" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Skill Map
          </Link>
          <Link href="/progress" className="nav-link" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Progress
          </Link>
          <Link href="/settings" className="nav-link" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Settings
          </Link>
        </div>
      </div>
    </nav>
  )
}
