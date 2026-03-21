import { describe, it, expect } from 'vitest'
import { buildSubmissionCode, parseResults } from '@/lib/judge0'

describe('buildSubmissionCode', () => {
  it('appends test harness code to user code', () => {
    const result = buildSubmissionCode('const x = 1', [{ description: 'x is 1', testCode: 'if(x===1){console.log("PASS")}else{console.log("FAIL")}' }])
    expect(result).toContain('const x = 1')
    expect(result).toContain('// --- test harness ---')
    expect(result.indexOf('const x = 1')).toBeLessThan(result.indexOf('// --- test harness ---'))
  })
})

describe('parseResults', () => {
  it('parses all PASS lines as passed', () => {
    const results = parseResults('PASS\nPASS\n', ['test 1', 'test 2'])
    expect(results).toEqual([
      { description: 'test 1', passed: true, message: null },
      { description: 'test 2', passed: true, message: null },
    ])
  })

  it('parses FAIL lines with message', () => {
    const results = parseResults('PASS\nFAIL: wrong value\n', ['test 1', 'test 2'])
    expect(results[1]).toEqual({ description: 'test 2', passed: false, message: 'wrong value' })
  })

  it('returns No output when stdout has fewer lines than descriptions', () => {
    const results = parseResults('PASS\n', ['test 1', 'test 2'])
    expect(results[1]).toEqual({ description: 'test 2', passed: false, message: 'No output' })
  })

  it('returns raw line for unrecognized output', () => {
    const results = parseResults('unexpected\n', ['test 1'])
    expect(results[0]).toEqual({ description: 'test 1', passed: false, message: 'unexpected' })
  })
})
