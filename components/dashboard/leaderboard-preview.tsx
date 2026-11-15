"use client"

import { useGame } from '@/lib/game-context'
import { Trophy, Medal, Crown, ArrowRight, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  level: number
  totalXp: number
  rank: number
}

const mockLeaderboard: LeaderboardUser[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'S', level: 15, totalXp: 12500, rank: 1 },
  { id: '2', name: 'Mike Johnson', avatar: 'M', level: 14, totalXp: 11200, rank: 2 },
  { id: '3', name: 'Emily Davis', avatar: 'E', level: 13, totalXp: 10800, rank: 3 },
  { id: '4', name: 'Chris Lee', avatar: 'C', level: 12, totalXp: 9500, rank: 4 },
  { id: '5', name: 'Anna Wilson', avatar: 'A', level: 11, totalXp: 8900, rank: 5 },
]

const rankIcons: { [key: number]: React.ElementType } = {
  1: Crown,
  2: Medal,
  3: Medal,
}

const rankColors: { [key: number]: string } = {
  1: 'from-yellow-400 to-orange-500 text-white',
  2: 'from-gray-300 to-gray-400 text-gray-800',
  3: 'from-amber-600 to-amber-700 text-white',
}

export function LeaderboardPreview() {
  const { user } = useGame()

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top performers this week</p>
          </div>
        </div>
        <Link href="/leaderboard">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((entry) => {
          const isCurrentUser = entry.id === user.id
          const RankIcon = rankIcons[entry.rank]

          return (
            <div
              key={entry.id}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all",
                isCurrentUser
                  ? "bg-primary/10 border border-primary/30 neon-border-cyan"
                  : "hover:bg-muted/50"
              )}
            >
              {/* Rank */}
              <div className="w-8 flex justify-center">
                {entry.rank <= 3 ? (
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg bg-gradient-to-br flex items-center justify-center",
                      rankColors[entry.rank]
                    )}
                  >
                    {RankIcon && <RankIcon className="w-4 h-4" />}
                  </div>
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {entry.rank}
                  </span>
                )}
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <span className="text-sm font-bold">{entry.avatar}</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {entry.name}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">Level {entry.level}</p>
                </div>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-semibold">
                  {entry.totalXp.toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Current User Position (if not in top 5) */}
      {user.rank > 5 && (
        <>
          <div className="my-4 flex items-center gap-2 px-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">Your Position</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex items-center gap-4 p-3 rounded-xl bg-primary/10 border border-primary/30">
            <div className="w-8 flex justify-center">
              <span className="text-lg font-bold text-primary">#{user.rank}</span>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                  <span className="text-sm font-bold">{user.name.charAt(0)}</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">Level {user.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-semibold">
                {user.totalXp.toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
