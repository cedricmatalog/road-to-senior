import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SkillCard } from '@/components/skill-map/SkillCard'

describe('SkillCard', () => {
  it('displays skill label', () => {
    render(<SkillCard label="Async JS" coverage={0.5} slug="async-js" />)
    expect(screen.getByText('Async JS')).toBeInTheDocument()
  })

  it('shows gap indicator when coverage <= 0.3', () => {
    render(<SkillCard label="Async JS" coverage={0.2} slug="async-js" />)
    expect(screen.getByTestId('skill-card')).toHaveAttribute('data-gap', 'true')
  })

  it('shows gap indicator when coverage is exactly 0.3', () => {
    render(<SkillCard label="Async JS" coverage={0.3} slug="async-js" />)
    expect(screen.getByTestId('skill-card')).toHaveAttribute('data-gap', 'true')
  })

  it('does not show gap indicator when coverage > 0.3', () => {
    render(<SkillCard label="Async JS" coverage={0.5} slug="async-js" />)
    expect(screen.getByTestId('skill-card')).toHaveAttribute('data-gap', 'false')
  })

  it('completion bar width reflects coverage percentage', () => {
    render(<SkillCard label="Async JS" coverage={0.75} slug="async-js" />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '75')
  })
})
