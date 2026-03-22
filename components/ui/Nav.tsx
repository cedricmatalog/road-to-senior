'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const LINKS = [
  { href: '/challenges?type=scenario', label: 'Scenario', glyph: '///' },
  { href: '/challenges?type=code',     label: 'Code',     glyph: '{ }' },
  { href: '/tracks',                   label: 'Tracks',   glyph: '≡' },
  { href: '/skill-map',                label: 'Skills',   glyph: '◈' },
  { href: '/progress',                 label: 'Progress', glyph: '▸' },
  { href: '/settings',                 label: 'Settings', glyph: '⚙' },
]

function useIsActive() {
  const path = usePathname()
  const params = useSearchParams()
  const type = params.get('type')
  return function isActive(href: string) {
    if (href.includes('?type=')) {
      const linkType = new URLSearchParams(href.split('?')[1]).get('type')
      return path.startsWith('/challenges') && type === linkType
    }
    return path.startsWith(href)
  }
}

function DesktopLinks() {
  const isActive = useIsActive()
  return (
    <div className="nav-desktop-links">
      {LINKS.map(l => (
        <Link key={l.href} href={l.href} className={`nav-desktop-link${isActive(l.href) ? ' active' : ''}`}>
          {l.label}
        </Link>
      ))}
    </div>
  )
}

function BottomTabs() {
  const isActive = useIsActive()
  return (
    <nav className="nav-bottom" aria-label="Main navigation">
      {LINKS.map(l => (
        <Link key={l.href} href={l.href} className={`nav-tab${isActive(l.href) ? ' active' : ''}`}>
          <span className="nav-tab-glyph">{l.glyph}</span>
          <span className="nav-tab-label">{l.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export function Nav() {
  return (
    <>
      <nav className="nav-top">
        <div className="nav-top-inner">
          <Link href="/" className="nav-logo">
            RTS<span className="nav-logo-dot">.</span>
          </Link>
          <Suspense fallback={null}>
            <DesktopLinks />
          </Suspense>
        </div>
      </nav>
      <Suspense fallback={null}>
        <BottomTabs />
      </Suspense>
    </>
  )
}
