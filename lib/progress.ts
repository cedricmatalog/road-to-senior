import type { StoredProgress } from './types'

const KEY = 'rts:progress'
const DEFAULT: StoredProgress = { version: 1, completed: [] }

export function loadProgress(): StoredProgress {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(DEFAULT)
    return JSON.parse(raw) as StoredProgress
  } catch {
    return structuredClone(DEFAULT)
  }
}

export function saveProgress(progress: StoredProgress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
  } catch {
    // private mode or storage quota — silently ignore
  }
}
