import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { loadProgress, saveProgress } from '@/lib/progress'

describe('loadProgress', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('returns empty progress when nothing stored', () => {
    const p = loadProgress()
    expect(p).toEqual({ version: 1, completed: [] })
  })

  it('returns stored progress', () => {
    localStorage.setItem('rts:progress', JSON.stringify({ version: 1, completed: ['slug-1'] }))
    expect(loadProgress().completed).toContain('slug-1')
  })

  it('returns empty progress when localStorage throws (private mode)', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    expect(loadProgress()).toEqual({ version: 1, completed: [] })
  })

  it('returns empty completed when stored data is missing completed field', () => {
    localStorage.setItem('rts:progress', JSON.stringify({ version: 1 }))
    expect(loadProgress().completed).toEqual([])
  })
})

describe('saveProgress', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => vi.restoreAllMocks())

  it('persists completed slugs', () => {
    saveProgress({ version: 1, completed: ['slug-a'] })
    expect(localStorage.getItem('rts:progress')).toContain('slug-a')
  })

  it('silently ignores localStorage write errors', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    expect(() => saveProgress({ version: 1, completed: [] })).not.toThrow()
  })
})
