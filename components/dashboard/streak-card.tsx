"use client"

import { useGame } from '@/lib/game-context'
import { Flame, Calendar, TrendingUp, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StreakCard() {
  const { user } = useGame()

  // Generate last 7 days
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const today = new Date().getDay()
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = (today - 6 + i + 7) % 7
    return {
      day: days[dayIndex],
      isToday: i === 6,
      isActive: i >= 7 - user.streak || i === 6, // Simulated streak
    }
  })

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Flame className="w-6 h-6 text-white animate-streak-flame" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{user.streak} Day Streak</h3>
            <p className="text-sm text-muted-foreground">Keep it going!</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Award className="w-4 h-4" />
            <span className="text-xs">Best: {user.longestStreak} days</span>
          </div>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="flex items-center justify-between gap-2">
        {last7Days.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">{day.day}</span>
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                day.isActive
                  ? "bg-gradient-to-br from-orange-500 to-red-500"
                  : "bg-muted",
                day.isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              {day.isActive ? (
                <Flame className="w-4 h-4 text-white" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Streak Milestones */}
      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">Next milestone</span>
          <span className="text-sm font-semibold">7-day streak</span>
        </div>
        <div className="relative">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all"
              style={{ width: `${Math.min((user.streak / 7) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {[3, 7, 14, 30].map((milestone) => (
              <div
                key={milestone}
                className={cn(
                  "flex flex-col items-center",
                  user.streak >= milestone && "text-orange-500"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold",
                    user.streak >= milestone
                      ? "bg-orange-500 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {user.streak >= milestone ? '✓' : milestone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          <span className="text-sm">
            {user.streak < 3
              ? "Start your streak today!"
              : user.streak < 7
              ? `${7 - user.streak} more days for Consistency King badge!`
              : "You are on fire! Keep the momentum!"}
          </span>
        </div>
      </div>
    </div>
  )
}
