import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ProgressProvider, useProgress } from '@/context/ProgressContext'

function TestConsumer() {
  const { completed, markComplete } = useProgress()
  return (
    <div>
      <span data-testid="count">{completed.length}</span>
      <button onClick={() => markComplete('slug-1')}>complete</button>
    </div>
  )
}

describe('ProgressContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts with empty completed list', () => {
    render(<ProgressProvider><TestConsumer /></ProgressProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('markComplete adds a slug', async () => {
    render(<ProgressProvider><TestConsumer /></ProgressProvider>)
    await act(async () => screen.getByText('complete').click())
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('markComplete is idempotent — does not duplicate slugs', async () => {
    render(<ProgressProvider><TestConsumer /></ProgressProvider>)
    await act(async () => { screen.getByText('complete').click(); screen.getByText('complete').click() })
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('useProgress throws when used outside provider', () => {
    // suppress console.error for expected throw
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestConsumer />)).toThrow('useProgress must be used inside ProgressProvider')
    spy.mockRestore()
  })
})
