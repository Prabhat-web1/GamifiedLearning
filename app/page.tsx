"use client"

import { GameProvider } from '@/lib/game-context'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { XpProgress } from '@/components/dashboard/xp-progress'
import { QuickStats } from '@/components/dashboard/quick-stats'
import { DailyMissions } from '@/components/dashboard/daily-missions'
import { StreakCard } from '@/components/dashboard/streak-card'
import { LeaderboardPreview } from '@/components/dashboard/leaderboard-preview'
import { RecommendedTasks } from '@/components/dashboard/recommended-tasks'
import { BadgeShowcase } from '@/components/dashboard/badge-showcase'

function DashboardContent() {
  return (
    <DashboardLayout
      title="Welcome back, Alex!"
      subtitle="Ready to level up today? Complete your daily missions to maintain your streak."
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <QuickStats />

        {/* XP Progress */}
        <XpProgress />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Missions */}
          <div className="lg:col-span-2 space-y-6">
            <DailyMissions />
            <RecommendedTasks />
          </div>

          {/* Right Column - Sidebar Widgets */}
          <div className="space-y-6">
            <StreakCard />
            <BadgeShowcase />
            <LeaderboardPreview />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function Home() {
  return (
    <GameProvider>
      <DashboardContent />
    </GameProvider>
  )
}
