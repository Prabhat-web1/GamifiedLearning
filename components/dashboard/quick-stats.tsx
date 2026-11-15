"use client"

import { Code2, Mic2, FileText, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  color: 'cyan' | 'purple' | 'green' | 'gold'
}

const colorClasses = {
  cyan: 'from-cyan-500 to-blue-500',
  purple: 'from-purple-500 to-pink-500',
  green: 'from-green-500 to-emerald-500',
  gold: 'from-yellow-500 to-orange-500',
}

function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color }: StatCardProps) {
  return (
    <div className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
            colorClasses[color]
          )}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              trend === 'up' && "bg-green-500/10 text-green-500",
              trend === 'down' && "bg-red-500/10 text-red-500",
              trend === 'neutral' && "bg-muted text-muted-foreground"
            )}
          >
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend === 'neutral' && <Minus className="w-3 h-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
        <p className="text-xs text-muted-foreground/70 mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

export function QuickStats() {
  // Sample stats - in real app, these would come from API/state
  const stats = [
    {
      title: 'Challenges Solved',
      value: 47,
      subtitle: 'This week: 12',
      icon: Code2,
      trend: 'up' as const,
      trendValue: '+8%',
      color: 'cyan' as const,
    },
    {
      title: 'Interview Sessions',
      value: 23,
      subtitle: 'Avg score: 85%',
      icon: Mic2,
      trend: 'up' as const,
      trendValue: '+12%',
      color: 'purple' as const,
    },
    {
      title: 'Resume Score',
      value: '78%',
      subtitle: 'Last updated: 2d ago',
      icon: FileText,
      trend: 'neutral' as const,
      trendValue: 'Same',
      color: 'green' as const,
    },
    {
      title: 'Global Rank',
      value: '#42',
      subtitle: 'Top 5%',
      icon: Trophy,
      trend: 'up' as const,
      trendValue: '+5',
      color: 'gold' as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
