import { ALL_CHALLENGES } from '@/lib/challenges'
import { ChallengeCard } from '@/components/challenges/ChallengeCard'
import { ChallengeFilters } from '@/components/challenges/ChallengeFilters'
import { TRACKS } from '@/lib/tracks'
import type { Challenge } from '@/lib/types'

interface PageProps {
  searchParams: { skill?: string; type?: string; difficulty?: string; track?: string }
}

const DIFF_CONFIG = {
  junior: { label: 'Junior', color: '#4ade80', rgb: '74,222,128' },
  mid:    { label: 'Mid',    color: '#facc15', rgb: '250,204,21' },
  senior: { label: 'Senior', color: '#f87171', rgb: '248,113,113' },
}

function SectionHeader({ difficulty, challenges, globalOffset }: {
  difficulty: 'junior' | 'mid' | 'senior'
  challenges: Challenge[]
  globalOffset: number
}) {
  const cfg = DIFF_CONFIG[difficulty]
  return (
    <>
      <div className="diff-header" style={{ '--level-color': cfg.color } as React.CSSProperties}>
        <div className="diff-header-inner">
          <span className="diff-label">{cfg.label}</span>
          <div className="diff-rule" />
          <span className="diff-count">{challenges.length}</span>
        </div>
      </div>
      {challenges.map((c, i) => (
        <ChallengeCard key={c.slug} challenge={c} index={globalOffset + i} />
      ))}
    </>
  )
}

export default async function ChallengesPage({ searchParams }: PageProps) {
  let challenges: typeof ALL_CHALLENGES = ALL_CHALLENGES

  let activeTrackTitle: string | null = null
  if (searchParams.track) {
    const track = TRACKS.find(t => t.slug === searchParams.track)
    if (track) { challenges = challenges.filter(c => track.challengeSlugs.includes(c.slug)); activeTrackTitle = track.title }
  }
  if (searchParams.skill) challenges = challenges.filter(c => c.skills.includes(searchParams.skill as any))
  if (searchParams.type) challenges = challenges.filter(c => c.type === searchParams.type)
  if (searchParams.difficulty) challenges = challenges.filter(c => c.difficulty === searchParams.difficulty)

  const order = ['junior', 'mid', 'senior']
  challenges = [...challenges].sort((a, b) => order.indexOf(a.difficulty) - order.indexOf(b.difficulty))

  const junior = challenges.filter(c => c.difficulty === 'junior')
  const mid    = challenges.filter(c => c.difficulty === 'mid')
  const senior = challenges.filter(c => c.difficulty === 'senior')

  const isFiltered = !!(searchParams.skill || searchParams.type || searchParams.difficulty || searchParams.track)

  return (
    <main style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--page-px)' }}>
      <style>{`
        /* Row layout — mobile first */
        .ch-row {
          background: var(--bg-card);
          border-bottom: 1px solid var(--border);
          transition: background 0.12s;
          -webkit-tap-highlight-color: transparent;
        }
        .ch-row:hover { background: var(--bg-raised); }
        .ch-row:active { background: var(--bg-raised); }

        /* Mobile: compact single-column-ish */
        .ch-row-inner {
          display: grid;
          grid-template-columns: 24px 28px 1fr 32px;
          align-items: center;
          gap: 0;
          padding: 0 16px;
          min-height: 56px;
        }
        .ch-col-idx {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-faint);
          letter-spacing: 0.06em;
        }
        .ch-col-type {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-faint);
          letter-spacing: 0.04em;
        }
        .ch-col-main {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 14px 10px 14px 0;
          overflow: hidden;
          min-width: 0;
        }
        .ch-title {
          font-family: var(--mono);
          font-size: 13px;
          font-weight: 500;
          color: var(--text);
          letter-spacing: -0.01em;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.12s;
        }
        .ch-row:hover .ch-title { color: var(--accent); }
        .ch-desc {
          font-family: var(--sans);
          font-size: 11px;
          color: var(--text-faint);
          line-height: 1.4;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
        /* Skills hidden on mobile */
        .ch-col-skills { display: none; }
        .ch-skill {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-faint);
          border: 1px solid var(--border);
          padding: 2px 6px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: border-color 0.12s, color 0.12s;
        }
        .ch-row:hover .ch-skill { border-color: var(--border-hi); color: var(--text-dim); }
        .ch-skill-more { border-style: dashed; }
        .ch-col-diff {
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-align: right;
          flex-shrink: 0;
        }

        /* Desktop: show skills column */
        @media (min-width: 640px) {
          .ch-row-inner {
            grid-template-columns: 32px 32px 1fr auto 40px;
            padding: 0 20px;
            min-height: 52px;
          }
          .ch-col-skills {
            display: flex;
            gap: 4px;
            align-items: center;
            padding: 0 16px;
            flex-shrink: 0;
          }
        }

        /* Section headers */
        /* mobile: nav 52 + filter 91 + table-head 30 = 173px */
        .diff-header {
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          position: sticky;
          top: 173px;
          z-index: 10;
        }
        .diff-header-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          height: 34px;
        }
        @media (min-width: 640px) {
          .diff-header-inner { padding: 0 20px; height: 36px; }
        }
        .diff-label {
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--level-color, var(--text-dim));
          flex-shrink: 0;
        }
        .diff-rule {
          flex: 1;
          height: 1px;
          background: color-mix(in srgb, var(--level-color, var(--border)) 20%, var(--border));
        }
        .diff-count {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-faint);
          letter-spacing: 0.08em;
          flex-shrink: 0;
        }

        /* Table header */
        /* mobile: nav 52 + filter 91 = 143px */
        .ch-table-head {
          display: grid;
          grid-template-columns: 24px 28px 1fr 32px;
          gap: 0;
          padding: 0 16px;
          height: 30px;
          align-items: center;
          border-bottom: 1px solid var(--border);
          background: var(--bg);
          position: sticky;
          top: 143px;
          z-index: 11;
        }
        .ch-table-head span {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--text-faint);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .col-skills-head { display: none; }
        @media (min-width: 640px) {
          /* desktop: nav 52 + filter 41 = 93px */
          .ch-table-head {
            grid-template-columns: 32px 32px 1fr auto 40px;
            padding: 0 20px;
            height: 32px;
            top: 93px;
          }
          .col-skills-head { display: block; padding: 0 16px; }
          /* desktop: nav 52 + filter 41 + table-head 32 = 125px */
          .diff-header { top: 125px; }
        }

        /* Completed overlay */
        .ch-row-wrap { position: relative; }

        /* Stagger entrance */
        .ch-list .ch-row-wrap {
          opacity: 0;
          animation: rowIn 0.3s ease forwards;
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ch-list .diff-header { opacity: 0; animation: rowIn 0.3s ease forwards; }
        .ch-list > *:nth-child(1)  { animation-delay: 0ms; }
        .ch-list > *:nth-child(2)  { animation-delay: 20ms; }
        .ch-list > *:nth-child(3)  { animation-delay: 40ms; }
        .ch-list > *:nth-child(4)  { animation-delay: 60ms; }
        .ch-list > *:nth-child(5)  { animation-delay: 80ms; }
        .ch-list > *:nth-child(6)  { animation-delay: 100ms; }
        .ch-list > *:nth-child(7)  { animation-delay: 120ms; }
        .ch-list > *:nth-child(8)  { animation-delay: 140ms; }
        .ch-list > *:nth-child(9)  { animation-delay: 160ms; }
        .ch-list > *:nth-child(10) { animation-delay: 180ms; }
        .ch-list > *:nth-child(n+11) { animation-delay: 200ms; }

        /* Page header */
        .ch-page-header {
          padding: 32px 0 20px;
          border-bottom: 1px solid var(--border);
        }
        @media (min-width: 640px) {
          .ch-page-header { padding: 48px 0 24px; }
        }

        /* ── Filter bar ── */
        .filter-bar {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .filter-row {
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .filter-row::-webkit-scrollbar { display: none; }
        .filter-pill:hover {
          border-color: var(--border-hi) !important;
          color: var(--text-dim) !important;
          background: transparent !important;
        }
        .filter-pill[data-active="true"]:hover { opacity: 0.8; }
        .filter-skill {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 24px 5px 10px;
          cursor: pointer;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-faint);
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          transition: all 0.12s;
          white-space: nowrap;
          flex-shrink: 0;
          line-height: 1;
        }
        .filter-skill:focus { border-color: var(--border-hi); }
        @media (min-width: 640px) {
          .filter-bar { flex-direction: row; gap: 0; align-items: center; }
          .filter-row { overflow-x: visible; }
          .filter-row + .filter-row::before {
            content: '';
            display: inline-block;
            width: 1px;
            height: 14px;
            background: var(--border);
            margin: 0 4px;
            align-self: center;
            flex-shrink: 0;
          }
        }

        /* Filter bar row */
        .ch-filter-row {
          border-bottom: 1px solid var(--border);
          padding: 8px 0;
          position: sticky;
          top: 52px;
          z-index: 11;
          background: var(--bg);
        }
        /* mobile: 2 rows × 25px + gap 6px + 2×8px padding = 72px */
        /* desktop: 1 row × 25px + 2×8px padding = 41px */
      `}</style>

      {/* Page header */}
      <div className="ch-page-header">
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px' }}>
          Index
        </p>
        <h1 style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 500, color: 'var(--text)', margin: '0 0 4px', letterSpacing: '-0.03em', lineHeight: 0.95 }}>
          Challenges
        </h1>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', margin: '10px 0 0', letterSpacing: '0.02em' }}>
          <span style={{ color: 'var(--text)' }}>{challenges.length}</span>
          <span style={{ margin: '0 6px', color: 'var(--border-hi)' }}>/</span>
          <span>{ALL_CHALLENGES.length}</span>
          {activeTrackTitle && <span style={{ color: 'var(--accent)', marginLeft: '8px', fontSize: 'var(--text-xs)', letterSpacing: '0.1em' }}>{activeTrackTitle}</span>}
          {isFiltered && !activeTrackTitle && <span style={{ color: 'var(--accent)', marginLeft: '8px', fontSize: 'var(--text-xs)', letterSpacing: '0.1em' }}>filtered</span>}
        </p>
      </div>

      {/* Filter bar — full width, sticky */}
      <div className="ch-filter-row">
        <ChallengeFilters
          activeDiff={searchParams.difficulty ?? ''}
          activeType={searchParams.type ?? ''}
          activeSkill={searchParams.skill ?? ''}
          hasFilters={isFiltered}
        />
      </div>

      {challenges.length === 0 ? (
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', color: 'var(--text-faint)', letterSpacing: '0.05em' }}>— no challenges match —</p>
        </div>
      ) : (
        <>
          {/* Column headers */}
          <div className="ch-table-head">
            <span>#</span>
            <span>Type</span>
            <span>Challenge</span>
            <span className="col-skills-head">Skills</span>
            <span style={{ textAlign: 'right' }}>Lvl</span>
          </div>

          {/* Grouped rows */}
          <div className="ch-list" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
            {isFiltered ? (
              // Flat list when filtered — no section breaks
              challenges.map((c, i) => <ChallengeCard key={c.slug} challenge={c} index={i} />)
            ) : (
              <>
                {junior.length > 0 && <SectionHeader difficulty="junior" challenges={junior} globalOffset={0} />}
                {mid.length > 0 && <SectionHeader difficulty="mid" challenges={mid} globalOffset={junior.length} />}
                {senior.length > 0 && <SectionHeader difficulty="senior" challenges={senior} globalOffset={junior.length + mid.length} />}
              </>
            )}
          </div>
        </>
      )}

      <div style={{ height: '64px' }} />
    </main>
  )
}
