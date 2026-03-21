import { describe, it, expect } from 'vitest'
import { buildSubmissionCode, parseResults } from '@/lib/judge0'

describe('buildSubmissionCode', () => {
  it('appends test harness code to user code', () => {
    const result = buildSubmissionCode('const x = 1', [{ description: 'x is 1', testCode: 'if(x===1){console.log("PASS")}else{console.log("FAIL")}' }])
    expect(result).toContain('const x = 1')
    expect(result).toContain('PASS')
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
})
