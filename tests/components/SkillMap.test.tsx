import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SkillMap } from '@/components/skill-map/SkillMap'

vi.mock('@/context/ProgressContext', () => ({
  useProgress: () => ({ completed: ['async-promise-chain'], markComplete: vi.fn() }),
}))

// Minimal challenge list for testing
const mockChallenges = [
  { slug: 'async-promise-chain', skills: ['async-js'], type: 'code', difficulty: 'junior', title: '', description: '', content: { starterCode: '', testCases: [] } },
  { slug: 'closures-counter', skills: ['closures-scope'], type: 'code', difficulty: 'junior', title: '', description: '', content: { starterCode: '', testCases: [] } },
]

describe('SkillMap', () => {
  it('renders a card for every skill area', () => {
    render(<SkillMap challenges={mockChallenges as any} />)
    expect(screen.getByText('Async JS')).toBeInTheDocument()
    expect(screen.getByText('Closures & Scope')).toBeInTheDocument()
  })

  it('shows gap for skills with 0 completion', () => {
    render(<SkillMap challenges={mockChallenges as any} />)
    // closures-scope has 1 challenge, 0 completed — should be marked as a gap
    const gapCards = screen.getAllByTestId('skill-card').filter(el => el.getAttribute('data-gap') === 'true')
    expect(gapCards.length).toBeGreaterThan(0)
  })
})
