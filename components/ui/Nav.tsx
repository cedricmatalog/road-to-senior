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
