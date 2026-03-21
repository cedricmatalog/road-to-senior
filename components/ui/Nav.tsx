'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/challenges', label: 'Challenges', glyph: '{ }' },
  { href: '/tracks',    label: 'Tracks',     glyph: '≡' },
  { href: '/skill-map', label: 'Skills',     glyph: '◈' },
  { href: '/progress',  label: 'Progress',   glyph: '▸' },
  { href: '/settings',  label: 'Settings',   glyph: '⚙' },
]

export function Nav() {
  const path = usePathname()

  return (
    <>
      <style>{`
        /* ── Top bar ── */
        .nav-top {
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .nav-top-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-family: var(--mono);
          font-weight: 500;
          font-size: var(--text-sm);
          color: var(--text);
          text-decoration: none;
          letter-spacing: 0.05em;
        }
        .nav-logo-dot { color: var(--accent); }

        /* Desktop links — hidden on mobile */
        .nav-desktop-links {
          display: none;
          gap: 28px;
          align-items: center;
        }
        .nav-desktop-link {
          font-family: var(--mono);
          font-size: var(--text-xs);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-faint);
          text-decoration: none;
          transition: color 0.12s;
        }
        .nav-desktop-link:hover { color: var(--text); }
        .nav-desktop-link.active { color: var(--accent); }

        /* ── Bottom tab bar — mobile only ── */
        .nav-bottom {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .nav-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 10px 4px 8px;
          text-decoration: none;
          color: var(--text-faint);
          transition: color 0.12s;
          min-height: 52px;
          -webkit-tap-highlight-color: transparent;
        }
        .nav-tab.active { color: var(--accent); }
        .nav-tab-glyph {
          font-family: var(--mono);
          font-size: 15px;
          line-height: 1;
        }
        .nav-tab-label {
          font-family: var(--mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1;
        }
        /* Active indicator */
        .nav-tab.active .nav-tab-glyph {
          text-shadow: 0 0 12px rgba(200, 241, 53, 0.6);
        }

        /* Show desktop links, hide bottom bar on larger screens */
        @media (min-width: 640px) {
          .nav-desktop-links { display: flex; }
          .nav-bottom { display: none; }
        }

        /* Add bottom padding to body on mobile so content isn't under tab bar */
        @media (max-width: 639px) {
          body { padding-bottom: calc(52px + env(safe-area-inset-bottom, 0px)); }
        }
      `}</style>

      {/* Top bar */}
      <nav className="nav-top">
        <div className="nav-top-inner">
          <Link href="/" className="nav-logo">
            RTS<span className="nav-logo-dot">.</span>
          </Link>
          <div className="nav-desktop-links">
            {LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-desktop-link${path.startsWith(l.href) ? ' active' : ''}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom tab bar (mobile) */}
      <nav className="nav-bottom" aria-label="Main navigation">
        {LINKS.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav-tab${path.startsWith(l.href) ? ' active' : ''}`}
          >
            <span className="nav-tab-glyph">{l.glyph}</span>
            <span className="nav-tab-label">{l.label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
