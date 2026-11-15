"use client"

import { useGame } from '@/lib/game-context'
import { cn } from '@/lib/utils'
import { Code2, Mic2, FileText, CheckCircle2, Circle, Zap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const missionIcons = {
  coding: Code2,
  interview: Mic2,
  resume: FileText,
}

const missionLinks = {
  coding: '/challenges',
  interview: '/interviews',
  resume: '/resume',
}

export function DailyMissions() {
  const { dailyMissions, completeMission, addXp } = useGame()

  const completedCount = dailyMissions.filter(m => m.completed).length
  const totalXp = dailyMissions.reduce((sum, m) => sum + m.xpReward, 0)
  const earnedXp = dailyMissions.filter(m => m.completed).reduce((sum, m) => sum + m.xpReward, 0)

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Daily Missions
          </h3>
          <p className="text-sm text-muted-foreground">
            Complete all for bonus XP
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-sm font-semibold">{completedCount}/{dailyMissions.length}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-muted relative">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                className="text-primary"
                strokeDasharray={`${(completedCount / dailyMissions.length) * 100} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold">{Math.round((completedCount / dailyMissions.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {dailyMissions.map((mission) => {
          const Icon = missionIcons[mission.type]
          const link = missionLinks[mission.type]

          return (
            <div
              key={mission.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                mission.completed
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-muted/50 hover:bg-muted border border-transparent"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  mission.completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-background"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <h4 className="font-medium text-sm">{mission.title}</h4>
                <p className="text-xs text-muted-foreground">{mission.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-background">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-xs font-semibold">+{mission.xpReward} XP</span>
                </div>
                
                {mission.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                ) : (
                  <Link href={link}>
                    <Button size="sm" variant="outline" className="text-xs">
                      Start
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bonus XP indicator */}
      {completedCount === dailyMissions.length && (
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">All missions completed!</span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-bold">+50 Bonus XP</span>
          </div>
        </div>
      )}

      {/* XP Progress for missions */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Daily XP Progress</span>
          <span className="font-semibold">{earnedXp}/{totalXp} XP</span>
        </div>
        <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
          <div
            className="h-full gradient-xp rounded-full transition-all duration-500"
            style={{ width: `${(earnedXp / totalXp) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
