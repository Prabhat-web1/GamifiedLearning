import { GameProvider } from "@/lib/game-context"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata: Metadata = {
  title: 'PrepQuest - Gamified Placement Preparation',
  description: 'Level up your placement prep with AI-powered challenges, mock interviews, and gamified learning. Earn XP, unlock badges, and climb the leaderboard!',
  keywords: ['placement preparation', 'coding challenges', 'mock interviews', 'gamified learning', 'DSA practice'],
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen`}>

        {/* 🔥 THIS FIXES YOUR ERROR */}
        <GameProvider>
          {children}
        </GameProvider>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}