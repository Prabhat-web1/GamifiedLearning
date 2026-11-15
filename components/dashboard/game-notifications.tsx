"use client"

import { useGame } from '@/lib/game-context'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { X, Zap, Star, Award, AlertTriangle, Info, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GameNotifications() {
  const {
    showLevelUp,
    showBadgeUnlock,
    showXpGain,
    notifications,
    dismissLevelUp,
    dismissBadgeUnlock,
    dismissXpGain,
    dismissNotification,
  } = useGame()

  // Auto-dismiss XP gain after 2 seconds
  useEffect(() => {
    if (showXpGain) {
      const timer = setTimeout(dismissXpGain, 2000)
      return () => clearTimeout(timer)
    }
  }, [showXpGain, dismissXpGain])

  return (
    <>
      {/* XP Gain Popup */}
      {showXpGain && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right duration-300">
          <div className="glass rounded-xl p-4 border border-primary/30 neon-border-cyan flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary">+{showXpGain.amount} XP</p>
              <p className="text-xs text-muted-foreground">{showXpGain.reason}</p>
            </div>
          </div>
        </div>
      )}

      {/* Level Up Overlay */}
      {showLevelUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass rounded-3xl p-8 max-w-md text-center border border-primary/30 animate-level-up">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 animate-glow-pulse">
              <Star className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold neon-text-cyan mb-2">Level Up!</h2>
            <p className="text-muted-foreground mb-6">
              Congratulations! You have reached a new level.
            </p>
            <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              Level {/* This would show the new level */}
            </div>
            <Button onClick={dismissLevelUp} className="w-full">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Badge Unlock Overlay */}
      {showBadgeUnlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="glass rounded-3xl p-8 max-w-md text-center border border-secondary/30 neon-border-purple">
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 animate-badge-unlock">
              <span className="text-5xl">{showBadgeUnlock.icon}</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-purple-400">Badge Unlocked!</h2>
            </div>
            <h3 className="text-2xl font-bold mb-2">{showBadgeUnlock.name}</h3>
            <p className="text-muted-foreground mb-6">{showBadgeUnlock.description}</p>
            <Button onClick={dismissBadgeUnlock} variant="secondary" className="w-full">
              Awesome!
            </Button>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl glass border animate-in slide-in-from-right duration-300 max-w-sm",
              notification.type === 'success' && "border-green-500/30 bg-green-500/10",
              notification.type === 'warning' && "border-yellow-500/30 bg-yellow-500/10",
              notification.type === 'info' && "border-primary/30 bg-primary/10"
            )}
          >
            {notification.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
            )}
            {notification.type === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
            )}
            {notification.type === 'info' && (
              <Info className="w-5 h-5 text-primary shrink-0" />
            )}
            <p className="text-sm flex-1">{notification.message}</p>
            <button
              onClick={() => dismissNotification(notification.id)}
              className="p-1 rounded hover:bg-muted transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}
