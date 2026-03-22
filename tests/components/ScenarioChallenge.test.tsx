import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ScenarioChallenge } from '@/components/challenges/ScenarioChallenge'
import type { ScenarioContent } from '@/lib/types'

const content: ScenarioContent = {
  situation: 'A junior asks you for feedback on their PR.',
  options: [
    { id: 'a', label: 'Give specific inline comments', explanation: 'Best approach because...', isRecommended: true },
    { id: 'b', label: 'Approve and fix yourself', explanation: 'Misses teaching moment.', isRecommended: false },
  ],
}

describe('ScenarioChallenge', () => {
  it('renders the situation text', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByText(/junior asks/)).toBeInTheDocument()
  })

  it('renders all option buttons', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByText('Give specific inline comments')).toBeInTheDocument()
    expect(screen.getByText('Approve and fix yourself')).toBeInTheDocument()
  })

  it('reveals explanation after selecting an option', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    fireEvent.click(screen.getByText('Give specific inline comments'))
    expect(screen.getByText(/Best approach because/)).toBeInTheDocument()
  })

  it('calls onComplete after selecting an option', () => {
    const onComplete = vi.fn()
    render(<ScenarioChallenge content={content} onComplete={onComplete} />)
    fireEvent.click(screen.getByText('Give specific inline comments'))
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('shows wrong answer feedback when non-recommended option is selected', () => {
    render(<ScenarioChallenge content={content} onComplete={vi.fn()} />)
    fireEvent.click(screen.getByText('Approve and fix yourself'))
    expect(screen.getByText(/Misses teaching moment/)).toBeInTheDocument()
    expect(screen.getByText(/not ideal/i)).toBeInTheDocument()
  })
})
