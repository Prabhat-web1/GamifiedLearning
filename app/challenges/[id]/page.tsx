"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { GameProvider, useGame } from '@/lib/game-context'
import { challenges, difficultyConfig } from '@/lib/challenges-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Clock,
  Zap,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  Code2,
  Send,
  Eye,
  EyeOff,
} from 'lucide-react'
import Link from 'next/link'

function ChallengeDetailContent() {
  const params = useParams()
  const router = useRouter()
  const { addXp, completeMission, addNotification } = useGame()

  const challenge = challenges.find(c => c.id === params.id)
  
  const [code, setCode] = useState(challenge?.starterCode || '')
  const [showHints, setShowHints] = useState(false)
  const [revealedHints, setRevealedHints] = useState<number[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, isSubmitted])

  // Start timer on first code edit
  useEffect(() => {
    if (code !== challenge?.starterCode && !isTimerRunning) {
      setIsTimerRunning(true)
    }
  }, [code, challenge?.starterCode, isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleRun = useCallback(() => {
    setIsRunning(true)
    setOutput({ type: 'info', message: 'Running your code...' })

    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false)
      // For demo, just show a sample output
      setOutput({
        type: 'success',
        message: `Test case 1: Passed\nTest case 2: Passed\nTest case 3: Passed\n\nAll test cases passed!`,
      })
    }, 1500)
  }, [])

  const handleSubmit = useCallback(() => {
    if (isSubmitted) return

    setIsRunning(true)
    setOutput({ type: 'info', message: 'Submitting your solution...' })

    setTimeout(() => {
      setIsRunning(false)
      setIsSubmitted(true)
      setIsTimerRunning(false)

      // Award XP
      const bonusXp = timeElapsed < (challenge?.timeLimit || 15) * 60 ? 10 : 0
      const totalXp = (challenge?.xpReward || 30) + bonusXp

      setOutput({
        type: 'success',
        message: `Congratulations! Solution accepted!\n\nRuntime: 42ms (faster than 85%)\nMemory: 40.2MB (less than 72%)\n\n+${totalXp} XP earned!`,
      })

      addXp(totalXp, `Completed "${challenge?.title}"`)
      completeMission('daily-coding')
      addNotification('Challenge completed! Great work!', 'success')
    }, 2000)
  }, [isSubmitted, timeElapsed, challenge, addXp, completeMission, addNotification])

  const handleReset = () => {
    setCode(challenge?.starterCode || '')
    setOutput(null)
    setIsSubmitted(false)
  }

  const revealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index])
    }
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Code2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Challenge not found</h2>
          <Link href="/challenges">
            <Button variant="outline">Back to Challenges</Button>
          </Link>
        </div>
      </div>
    )
  }

  const config = difficultyConfig[challenge.difficulty]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/challenges">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-bold">{challenge.title}</h1>
              <div className="flex items-center gap-2">
                <span className={cn("text-xs px-2 py-0.5 rounded-full border capitalize", config.color)}>
                  {challenge.difficulty}
                </span>
                <span className="text-xs text-muted-foreground">{challenge.category}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg",
              timeElapsed > challenge.timeLimit * 60 ? "bg-red-500/10 text-red-500" : "bg-muted"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timeElapsed)}</span>
              <span className="text-xs text-muted-foreground">/ {challenge.timeLimit}:00</span>
            </div>

            {/* XP Reward */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">+{challenge.xpReward} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-border overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Problem Description</h2>
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="whitespace-pre-line text-muted-foreground">{challenge.description}</p>
              </div>
            </div>

            {/* Examples */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Examples</h2>
              <div className="space-y-4">
                {challenge.examples.map((example, idx) => (
                  <div key={idx} className="glass rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-2">Example {idx + 1}</div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-primary font-medium">Input: </span>
                        <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{example.input}</code>
                      </div>
                      <div>
                        <span className="text-xs text-primary font-medium">Output: </span>
                        <code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{example.output}</code>
                      </div>
                      {example.explanation && (
                        <div className="text-xs text-muted-foreground mt-2">
                          <span className="font-medium">Explanation: </span>
                          {example.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints */}
            <div>
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                Hints ({challenge.hints.length})
                {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showHints && (
                <div className="mt-3 space-y-2">
                  {challenge.hints.map((hint, idx) => (
                    <div key={idx} className="glass rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Hint {idx + 1}</span>
                        {!revealedHints.includes(idx) ? (
                          <button
                            onClick={() => revealHint(idx)}
                            className="flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <Eye className="w-3 h-3" />
                            Reveal
                          </button>
                        ) : (
                          <EyeOff className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <p className={cn(
                        "text-sm mt-2 transition-all",
                        revealedHints.includes(idx) ? "blur-0" : "blur-sm select-none"
                      )}>
                        {hint}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm font-medium mb-2">Related Topics</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
              <span className="text-sm font-medium">JavaScript</span>
              <Button variant="ghost" size="sm" onClick={handleReset} disabled={isRunning}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-background font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
                disabled={isSubmitted}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="h-48 border-t border-border flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
              <span className="text-sm font-medium">Output</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRun}
                  disabled={isRunning || isSubmitted}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isRunning || isSubmitted}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </Button>
              </div>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
              ) : output ? (
                <div className={cn(
                  "text-sm font-mono whitespace-pre-wrap",
                  output.type === 'success' && "text-green-500",
                  output.type === 'error' && "text-red-500",
                  output.type === 'info' && "text-muted-foreground"
                )}>
                  {output.type === 'success' && <CheckCircle2 className="w-4 h-4 inline mr-2" />}
                  {output.type === 'error' && <XCircle className="w-4 h-4 inline mr-2" />}
                  {output.message}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Click &quot;Run&quot; to test your code or &quot;Submit&quot; to submit your solution.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChallengeDetailPage() {
  return (
    <GameProvider>
      <ChallengeDetailContent />
    </GameProvider>
  )
}
