import Link from 'next/link'

export function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900">Road to Senior</Link>
        <div className="flex gap-4 text-sm">
          <Link href="/challenges" className="text-gray-600 hover:text-gray-900">Challenges</Link>
          <Link href="/skill-map" className="text-gray-600 hover:text-gray-900">Skill Map</Link>
        </div>
      </div>
    </nav>
  )
}
