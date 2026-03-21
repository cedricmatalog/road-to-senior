import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Road to Senior</h1>
      <p className="text-lg text-gray-600 mb-8">
        Practical challenges to level up your JavaScript skills — from junior to senior.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/challenges" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Browse Challenges
        </Link>
        <Link href="/skill-map" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
          View Skill Map
        </Link>
      </div>
    </main>
  )
}
