import type { Metadata } from 'next'
import './globals.css'
import { ProgressProvider } from '@/context/ProgressContext'
import { Nav } from '@/components/ui/Nav'

export const metadata: Metadata = {
  title: 'Road to Senior',
  description: 'Practical challenges to level up your JavaScript skills — from junior to senior.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProgressProvider>
          <Nav />
          {children}
        </ProgressProvider>
      </body>
    </html>
  )
}
