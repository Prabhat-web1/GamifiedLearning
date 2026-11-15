"use client"

import { useGame, allBadges } from '@/lib/game-context'
import { Award, Lock, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function BadgeShowcase() {
  const { user } = useGame()

  // Take first 6 badges from library for showcase
  const showcaseBadges = allBadges.slice(0, 6)

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Badges</h3>
            <p className="text-sm text-muted-foreground">
              {user.badges.length}/{allBadges.length} unlocked
            </p>
          </div>
        </div>
        <Link href="/profile?tab=badges">
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {showcaseBadges.map((badge) => {
          const isUnlocked = user.badges.some(b => b.id === badge.id)

          return (
            <div
              key={badge.id}
              className={cn(
                "relative p-4 rounded-xl text-center transition-all duration-300 group",
                isUnlocked
                  ? "bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 hover:scale-105"
                  : "bg-muted/30 border border-border/50 opacity-60"
              )}
            >
              {!isUnlocked && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "text-3xl mb-2 transition-transform",
                  isUnlocked && "group-hover:scale-110"
                )}
              >
                {badge.icon}
              </div>
              <h4 className="text-xs font-semibold truncate">{badge.name}</h4>
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                {badge.requirement}
              </p>
            </div>
          )
        })}
      </div>

      {/* Progress to next badge */}
      <div className="mt-4 p-3 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Next badge: On Fire</span>
          <span className="text-xs text-muted-foreground">2/3 days</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            style={{ width: '66%' }}
          />
        </div>
      </div>
    </div>
  )
}
