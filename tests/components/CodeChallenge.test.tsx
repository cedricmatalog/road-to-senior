import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CodeChallenge } from '@/components/challenges/CodeChallenge'
import type { CodeContent } from '@/lib/types'

// CodeMirror does not render meaningfully in jsdom — mock the whole editor.
// This lets us test the submit flow and result display without CodeMirror's DOM complexity.
vi.mock('@uiw/react-codemirror', () => ({
  default: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <textarea data-testid="code-editor" value={value} onChange={e => onChange(e.target.value)} />
  ),
}))

const content: CodeContent = {
  starterCode: 'function add(a, b) { return a + b }',
  testCases: [{ description: 'adds two numbers', testCode: 'if(add(1,2)===3){console.log("PASS")}' }],
}

describe('CodeChallenge', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('renders the editor with starter code', () => {
    render(<CodeChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByTestId('code-editor')).toHaveValue('function add(a, b) { return a + b }')
  })

  it('shows Run Tests button', () => {
    render(<CodeChallenge content={content} onComplete={vi.fn()} />)
    expect(screen.getByRole('button', { name: /run tests/i })).toBeInTheDocument()
  })

  it('calls /api/run and displays results on submit', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [{ description: 'adds two numbers', passed: true, message: null }], compileError: null, runtimeError: null }),
    })
    global.fetch = mockFetch

    const onComplete = vi.fn()
    render(<CodeChallenge content={content} onComplete={onComplete} />)
    fireEvent.click(screen.getByRole('button', { name: /run tests/i }))

    await waitFor(() => expect(screen.getByText('adds two numbers')).toBeInTheDocument())
    expect(onComplete).toHaveBeenCalledOnce()
  })

  it('shows error message when /api/run fails', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 503 })
    render(<CodeChallenge content={content} onComplete={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /run tests/i }))
    await waitFor(() => expect(screen.getByText(/try again/i)).toBeInTheDocument())
  })
})
