import { NextRequest, NextResponse } from 'next/server'
import { runCode } from '@/lib/judge0'

export async function POST(req: NextRequest) {
  const { userCode, testCases } = await req.json()

  if (!userCode || !testCases) {
    return NextResponse.json({ error: 'Missing userCode or testCases' }, { status: 400 })
  }

  try {
    const result = await runCode(userCode, testCases)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 503 })
  }
}
