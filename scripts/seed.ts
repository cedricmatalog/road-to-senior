import { createClient } from '@supabase/supabase-js'
import asyncPromiseChain from '../data/challenges/async-promise-chain'
import closuresCounter from '../data/challenges/closures-counter'
import errorHandlingFetch from '../data/challenges/error-handling-fetch'
import codeReviewPrFeedback from '../data/challenges/code-review-pr-feedback'
import debuggingSilentBug from '../data/challenges/debugging-silent-bug'
import systemDesignRateLimit from '../data/challenges/system-design-rate-limit'

const challenges = [
  asyncPromiseChain, closuresCounter, errorHandlingFetch,
  codeReviewPrFeedback, debuggingSilentBug, systemDesignRateLimit,
]

async function seed() {
  // Use service_role key — bypasses RLS so we can write. Never expose this client-side.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  for (const challenge of challenges) {
    const { error } = await supabase
      .from('challenges')
      .upsert(challenge, { onConflict: 'slug' })

    if (error) {
      console.error(`Seed failed for challenge "${challenge.slug}":`, error)
      process.exit(1)
    }
  }

  console.log(`Seeded ${challenges.length} challenges.`)
}

seed()
