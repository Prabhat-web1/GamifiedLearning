"use client"

import { useGame } from '@/lib/game-context'
import { Zap, Star, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function XpProgress() {
  const { user } = useGame()
  const progress = (user.xp / user.xpToNextLevel) * 100

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Star className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Level {user.level}</h3>
            <p className="text-sm text-muted-foreground">
              {user.xpToNextLevel - user.xp} XP to next level
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">{user.totalXp.toLocaleString()} Total XP</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="relative">
        <div className="h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-xp rounded-full transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{user.xp} XP</span>
          <span>{user.xpToNextLevel} XP</span>
        </div>
      </div>

      {/* Level Milestones */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        {[user.level - 1, user.level, user.level + 1, user.level + 2].map((level, idx) => (
          <div
            key={level}
            className={cn(
              "flex flex-col items-center",
              level === user.level && "scale-110"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                level < user.level
                  ? "bg-primary text-primary-foreground"
                  : level === user.level
                  ? "bg-gradient-to-br from-primary to-secondary text-white neon-border-cyan"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {level > 0 ? level : ''}
            </div>
            {level === user.level && (
              <span className="text-[10px] text-primary mt-1 font-medium">Current</span>
            )}
            {level === user.level + 1 && (
              <span className="text-[10px] text-muted-foreground mt-1">Next</span>
            )}
          </div>
        ))}
        <div className="flex items-center gap-1 text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          <span className="text-xs">+{Math.round((user.level + 2) * 1.5)}% harder</span>
        </div>
      </div>
    </div>
  )
}
