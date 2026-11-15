"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

// Types
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  requirement: string
}

export interface DailyMission {
  id: string
  type: 'coding' | 'interview' | 'resume'
  title: string
  description: string
  xpReward: number
  completed: boolean
}

export interface CodingChallenge {
  id: string
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  description: string
  examples: { input: string; output: string }[]
  starterCode: string
  xpReward: number
  timeLimit: number
  completed?: boolean
}

export interface InterviewQuestion {
  id: string
  category: string
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  tips: string[]
  xpReward: number
}

export interface User {
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  xpToNextLevel: number
  totalXp: number
  streak: number
  longestStreak: number
  badges: Badge[]
  rank: number
  joinedAt: Date
  lastActive: Date
}

export interface LeaderboardEntry {
  id: string
  name: string
  avatar: string
  level: number
  totalXp: number
  rank: number
  streak: number
}

interface GameState {
  user: User
  dailyMissions: DailyMission[]
  showLevelUp: boolean
  showBadgeUnlock: Badge | null
  showXpGain: { amount: number; reason: string } | null
  notifications: { id: string; message: string; type: 'info' | 'success' | 'warning' }[]
}

interface GameContextType extends GameState {
  addXp: (amount: number, reason: string) => void
  completeMission: (missionId: string) => void
  unlockBadge: (badge: Badge) => void
  dismissLevelUp: () => void
  dismissBadgeUnlock: () => void
  dismissXpGain: () => void
  addNotification: (message: string, type: 'info' | 'success' | 'warning') => void
  dismissNotification: (id: string) => void
  updateStreak: () => void
}

// Calculate XP needed for each level (exponential growth)
const calculateXpForLevel = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

// Initial badges library
const allBadges: Badge[] = [
  { id: 'first-challenge', name: 'First Steps', description: 'Complete your first coding challenge', icon: '🎯', requirement: 'Complete 1 challenge' },
  { id: 'streak-3', name: 'On Fire', description: 'Maintain a 3-day streak', icon: '🔥', requirement: '3-day streak' },
  { id: 'streak-7', name: 'Consistency King', description: 'Maintain a 7-day streak', icon: '👑', requirement: '7-day streak' },
  { id: 'dsa-warrior', name: 'DSA Warrior', description: 'Complete 10 DSA challenges', icon: '⚔️', requirement: '10 DSA challenges' },
  { id: 'interview-ace', name: 'Interview Ace', description: 'Complete 5 mock interviews', icon: '🎤', requirement: '5 mock interviews' },
  { id: 'resume-master', name: 'Resume Master', description: 'Achieve 90%+ resume score', icon: '📄', requirement: '90%+ resume score' },
  { id: 'level-5', name: 'Rising Star', description: 'Reach level 5', icon: '⭐', requirement: 'Level 5' },
  { id: 'level-10', name: 'Placement Ready', description: 'Reach level 10', icon: '🚀', requirement: 'Level 10' },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Complete a challenge in under 5 minutes', icon: '⚡', requirement: 'Challenge in < 5min' },
  { id: 'perfect-week', name: 'Perfect Week', description: 'Complete all daily missions for 7 days', icon: '🏆', requirement: '7 perfect days' },
]

// Initial daily missions
const generateDailyMissions = (): DailyMission[] => [
  {
    id: 'daily-coding',
    type: 'coding',
    title: 'Daily Coding Challenge',
    description: 'Complete one coding challenge',
    xpReward: 50,
    completed: false,
  },
  {
    id: 'daily-interview',
    type: 'interview',
    title: 'Mock Interview Practice',
    description: 'Answer one interview question',
    xpReward: 40,
    completed: false,
  },
  {
    id: 'daily-resume',
    type: 'resume',
    title: 'Resume Improvement',
    description: 'Review your resume score',
    xpReward: 30,
    completed: false,
  },
]

// Initial user state
const initialUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  avatar: '/avatars/default.png',
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalXp: 0,
  streak: 0,
  longestStreak: 0,
  badges: [],
  rank: 42,
  joinedAt: new Date(),
  lastActive: new Date(),
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>({
    user: initialUser,
    dailyMissions: generateDailyMissions(),
    showLevelUp: false,
    showBadgeUnlock: null,
    showXpGain: null,
    notifications: [],
  })

  // Check for inactivity reminder
  useEffect(() => {
    const checkInactivity = () => {
      const lastActive = new Date(state.user.lastActive)
      const now = new Date()
      const hoursSinceActive = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60)
      
      if (hoursSinceActive >= 24) {
        addNotification('You have been inactive for 24+ hours. Complete a mission to maintain your streak!', 'warning')
      }
    }

    const interval = setInterval(checkInactivity, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [state.user.lastActive])

  const addXp = useCallback((amount: number, reason: string) => {
    setState(prev => {
      let newXp = prev.user.xp + amount
      let newLevel = prev.user.level
      let newXpToNextLevel = prev.user.xpToNextLevel
      let leveledUp = false

      // Check for level up
      while (newXp >= newXpToNextLevel) {
        newXp -= newXpToNextLevel
        newLevel++
        newXpToNextLevel = calculateXpForLevel(newLevel)
        leveledUp = true
      }

      return {
        ...prev,
        user: {
          ...prev.user,
          xp: newXp,
          level: newLevel,
          xpToNextLevel: newXpToNextLevel,
          totalXp: prev.user.totalXp + amount,
          lastActive: new Date(),
        },
        showLevelUp: leveledUp,
        showXpGain: { amount, reason },
      }
    })
  }, [])

  const completeMission = useCallback((missionId: string) => {
    setState(prev => {
      const mission = prev.dailyMissions.find(m => m.id === missionId)
      if (!mission || mission.completed) return prev

      return {
        ...prev,
        dailyMissions: prev.dailyMissions.map(m =>
          m.id === missionId ? { ...m, completed: true } : m
        ),
      }
    })
  }, [])

  const unlockBadge = useCallback((badge: Badge) => {
    setState(prev => {
      if (prev.user.badges.some(b => b.id === badge.id)) return prev

      const unlockedBadge = { ...badge, unlockedAt: new Date() }
      return {
        ...prev,
        user: {
          ...prev.user,
          badges: [...prev.user.badges, unlockedBadge],
        },
        showBadgeUnlock: unlockedBadge,
      }
    })
  }, [])

  const updateStreak = useCallback(() => {
    setState(prev => {
      const newStreak = prev.user.streak + 1
      return {
        ...prev,
        user: {
          ...prev.user,
          streak: newStreak,
          longestStreak: Math.max(newStreak, prev.user.longestStreak),
        },
      }
    })
  }, [])

  const dismissLevelUp = useCallback(() => {
    setState(prev => ({ ...prev, showLevelUp: false }))
  }, [])

  const dismissBadgeUnlock = useCallback(() => {
    setState(prev => ({ ...prev, showBadgeUnlock: null }))
  }, [])

  const dismissXpGain = useCallback(() => {
    setState(prev => ({ ...prev, showXpGain: null }))
  }, [])

  const addNotification = useCallback((message: string, type: 'info' | 'success' | 'warning') => {
    const id = Math.random().toString(36).substr(2, 9)
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { id, message, type }],
    }))
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissNotification(id)
    }, 5000)
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id),
    }))
  }, [])

  return (
    <GameContext.Provider
      value={{
        ...state,
        addXp,
        completeMission,
        unlockBadge,
        dismissLevelUp,
        dismissBadgeUnlock,
        dismissXpGain,
        addNotification,
        dismissNotification,
        updateStreak,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

// Export badge library for reference
export { allBadges }
