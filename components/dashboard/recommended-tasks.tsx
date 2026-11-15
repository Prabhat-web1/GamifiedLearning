"use client"

import { Brain, Sparkles, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface RecommendedTask {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
  estimatedTime: string
  link: string
  reason: string
}

const recommendedTasks: RecommendedTask[] = [
  {
    id: '1',
    title: 'Two Sum Problem',
    description: 'Find indices of two numbers that add up to target',
    category: 'Arrays',
    difficulty: 'easy',
    xpReward: 30,
    estimatedTime: '15 min',
    link: '/challenges/two-sum',
    reason: 'Based on your recent performance',
  },
  {
    id: '2',
    title: 'Binary Tree Traversal',
    description: 'Practice inorder, preorder, and postorder traversals',
    category: 'Trees',
    difficulty: 'medium',
    xpReward: 50,
    estimatedTime: '25 min',
    link: '/challenges/tree-traversal',
    reason: 'Strengthen your weak areas',
  },
  {
    id: '3',
    title: 'Tell Me About Yourself',
    description: 'Practice the most common interview opener',
    category: 'Behavioral',
    difficulty: 'easy',
    xpReward: 25,
    estimatedTime: '10 min',
    link: '/interviews?q=tell-me',
    reason: 'High priority for interviews',
  },
]

const difficultyColors = {
  easy: 'bg-green-500/10 text-green-500 border-green-500/30',
  medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  hard: 'bg-red-500/10 text-red-500 border-red-500/30',
}

export function RecommendedTasks() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold flex items-center gap-2">
              AI Recommendations
              <Sparkles className="w-4 h-4 text-purple-500" />
            </h3>
            <p className="text-sm text-muted-foreground">Personalized for your goals</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {recommendedTasks.map((task) => (
          <div
            key={task.id}
            className="group p-4 rounded-xl bg-muted/30 hover:bg-muted/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-purple-400 font-medium">{task.category}</span>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full border capitalize",
                      difficultyColors[task.difficulty]
                    )}
                  >
                    {task.difficulty}
                  </span>
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {task.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{task.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">+{task.xpReward} XP</span>
                </div>
              </div>
              <Link href={task.link}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                >
                  Start
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* AI Reason */}
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 text-purple-500" />
              <span className="italic">{task.reason}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <Link href="/challenges">
          <Button variant="outline" className="gap-2">
            <Sparkles className="w-4 h-4" />
            View All Recommendations
          </Button>
        </Link>
      </div>
    </div>
  )
}
