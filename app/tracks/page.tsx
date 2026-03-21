'use client'

import Link from 'next/link'
import { TRACKS } from '@/lib/tracks'
import { useProgress } from '@/context/ProgressContext'
import { ALL_CHALLENGES } from '@/lib/challenges'

const TITLE_MAP: Record<string, string> = Object.fromEntries(ALL_CHALLENGES.map(c => [c.slug, c.title]))

const LEVEL_CONFIG = {
  junior:  { label: 'Junior',   color: 'var(--accent)', rgb: '200,241,53',  index: '01' },
  mid:     { label: 'Mid',      color: 'var(--amber)',  rgb: '245,166,35',  index: '02' },
  senior:  { label: 'Senior',   color: 'var(--red)',    rgb: '255,77,77',   index: '03' },
}

function ProgressRing({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = size / 2 - 4
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border)" strokeWidth={2} />
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease', opacity: pct === 0 ? 0.3 : 1 }}
      />
    </svg>
  )
}

function TrackCard({ track, idx }: { track: typeof TRACKS[0]; idx: number }) {
  const { completed } = useProgress()
  const done = track.challengeSlugs.filter(s => completed.includes(s)).length
  const total = track.challengeSlugs.length
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  const cfg = LEVEL_CONFIG[track.level]
  const isComplete = done === total
  const ctaLabel = done === 0 ? 'Start →' : done < total ? 'Continue →' : 'Review →'
  const num = String(idx + 1).padStart(2, '0')

  return (
    <div className="track-card" style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Completion glow top strip */}
      {isComplete && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
        }} />
      )}

      {/* Card header */}
      <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--text-faint)',
              }}>{num}</span>
              {isComplete && (
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: cfg.color,
                  border: `1px solid ${cfg.color}`, padding: '1px 6px',
                }}>complete</span>
              )}
            </div>
            <h3 style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', fontWeight: 500,
              color: 'var(--text)', margin: '0 0 6px', letterSpacing: '-0.01em', lineHeight: 1.3,
            }}>
              {track.title}
            </h3>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)',
              margin: 0, lineHeight: 1.6,
            }}>
              {track.description}
            </p>
          </div>

          {/* Progress ring + count */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <ProgressRing pct={pct} color={cfg.color} size={48} />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', fontWeight: 500,
                  color: pct === 0 ? 'var(--text-faint)' : cfg.color, transform: 'none',
                }}>{pct === 100 ? '✓' : `${pct}%`}</span>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
              {done}/{total}
            </span>
          </div>
        </div>
      </div>

      {/* Challenge list */}
      <div style={{ padding: '16px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {track.challengeSlugs.map((slug, i) => {
          const isDone = completed.includes(slug)
          const title = TITLE_MAP[slug] ?? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
          return (
            <Link
              key={slug}
              href={`/challenges/${slug}`}
              className="challenge-row"
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '5px 0', textDecoration: 'none',
                color: isDone ? 'var(--text-faint)' : 'var(--text-dim)',
                borderBottom: i < track.challengeSlugs.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span style={{
                fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', flexShrink: 0, width: '12px', textAlign: 'center',
                color: isDone ? cfg.color : 'var(--text-faint)',
              }}>
                {isDone ? '✓' : '·'}
              </span>
              <span style={{
                fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', lineHeight: 1.3, flex: 1,
                textDecoration: isDone ? 'line-through' : 'none',
                textDecorationColor: 'var(--border-hi)',
              }}>
                {title}
              </span>
            </Link>
          )
        })}
      </div>

      {/* CTA footer */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
        <Link
          href={`/challenges?track=${track.slug}`}
          className="track-cta"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none',
            color: isComplete ? cfg.color : 'var(--text-dim)',
            transition: 'color 0.15s',
          }}
        >
          <span style={{
            display: 'inline-block', width: '20px', height: '1px',
            background: 'currentColor', transition: 'width 0.2s ease',
          }} className="cta-line" />
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}

function LevelSection({ level, tracks, totalCompleted }: {
  level: 'junior' | 'mid' | 'senior'
  tracks: typeof TRACKS
  totalCompleted: number
}) {
  const cfg = LEVEL_CONFIG[level]
  const totalInLevel = tracks.reduce((sum, t) => sum + t.challengeSlugs.length, 0)
  const doneInLevel = totalCompleted
  const allComplete = doneInLevel === totalInLevel && totalInLevel > 0

  return (
    <section className="level-section" style={{ marginBottom: '64px' }}>
      {/* Level header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '24px' }}>
        {/* Spine node */}
        <div style={{
          width: '32px', height: '32px', border: `2px solid ${cfg.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: allComplete ? cfg.color : 'var(--bg)', flexShrink: 0,
          marginRight: '16px',
        }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', fontWeight: 500,
            color: allComplete ? 'var(--bg)' : cfg.color,
          }}>{cfg.index}</span>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <h2 style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--text-sm)', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: cfg.color, margin: 0,
            }}>
              {cfg.label}
            </h2>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)',
              letterSpacing: '0.08em',
            }}>
              {tracks.length} track{tracks.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Horizontal rule */}
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, var(--border), transparent)`, marginLeft: '16px' }} />
      </div>

      {/* Cards grid */}
      <div className="stagger" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1px',
        background: 'var(--border)',
        marginLeft: '48px',
      }}>
        {tracks.map((track, i) => <TrackCard key={track.slug} track={track} idx={i} />)}
      </div>
    </section>
  )
}

export default function TracksPage() {
  const { completed } = useProgress()

  const levels = (['junior', 'mid', 'senior'] as const).map(level => {
    const tracks = TRACKS.filter(t => t.level === level)
    const totalCompleted = tracks.reduce((sum, t) =>
      sum + t.challengeSlugs.filter(s => completed.includes(s)).length, 0
    )
    return { level, tracks, totalCompleted }
  })

  const totalTracks = TRACKS.length
  const totalDone = TRACKS.reduce((sum, t) =>
    sum + t.challengeSlugs.filter(s => completed.includes(s)).length, 0
  )
  const totalChallenges = TRACKS.reduce((sum, t) => sum + t.challengeSlugs.length, 0)

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
      <style>{`
        .track-card {
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .track-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-hi) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .challenge-row { transition: color 0.1s; }
        .challenge-row:hover { color: var(--text) !important; }
        .track-cta:hover { color: var(--text) !important; }
        .track-cta:hover .cta-line { width: 28px !important; }
        .level-section { animation: fadeUp 0.5s ease both; }
        .level-section:nth-child(1) { animation-delay: 0ms; }
        .level-section:nth-child(2) { animation-delay: 80ms; }
        .level-section:nth-child(3) { animation-delay: 160ms; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Page header */}
      <div style={{ padding: '48px 0 48px', borderBottom: '1px solid var(--border)', marginBottom: '48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <div>
            <p style={{
              fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--accent)',
              letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px',
            }}>Learning Path</p>
            <h1 style={{
              fontFamily: 'var(--mono)', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 500,
              color: 'var(--text)', margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 0.95,
            }}>
              Tracks<span className="cursor" style={{ marginLeft: '4px' }} />
            </h1>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: 'var(--text-sm)', color: 'var(--text-dim)',
              margin: 0, maxWidth: '400px', lineHeight: 1.7,
            }}>
              Structured sequences from junior to senior. Each track targets a specific skill domain.
            </p>
          </div>

          {/* Summary stats */}
          <div style={{ display: 'flex', gap: '0', border: '1px solid var(--border)' }}>
            {[
              { value: String(totalTracks), label: 'Tracks' },
              { value: String(totalChallenges), label: 'Challenges' },
              { value: `${Math.round((totalDone / totalChallenges) * 100) || 0}%`, label: 'Done' },
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '16px 20px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 'var(--text-base)', fontWeight: 500,
                  color: 'var(--accent)', lineHeight: 1, marginBottom: '4px',
                }}>{stat.value}</div>
                <div style={{
                  fontFamily: 'var(--mono)', fontSize: 'var(--text-xs)', color: 'var(--text-faint)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Overall progress bar */}
        {totalDone > 0 && (
          <div style={{ marginTop: '24px' }}>
            <div style={{ height: '2px', background: 'var(--border)', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${Math.round((totalDone / totalChallenges) * 100)}%`,
                background: 'var(--accent)',
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        )}
      </div>

      {/* Level sections */}
      {levels.map(({ level, tracks, totalCompleted }) => (
        <LevelSection key={level} level={level} tracks={tracks} totalCompleted={totalCompleted} />
      ))}

      <div style={{ height: '64px' }} />
    </main>
  )
}
