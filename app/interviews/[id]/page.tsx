"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { GameProvider, useGame } from '@/lib/game-context'
import { interviewQuestions, difficultyColors } from '@/lib/interview-data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  Clock,
  Zap,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Send,
  Eye,
  EyeOff,
  Star,
  MessageSquare,
  RefreshCw,
  Award,
} from 'lucide-react'
import Link from 'next/link'

function InterviewDetailContent() {
  const params = useParams()
  const router = useRouter()
  const { addXp, completeMission, addNotification } = useGame()

  const question = interviewQuestions.find(q => q.id === params.id)

  const [answer, setAnswer] = useState('')
  const [showTips, setShowTips] = useState(false)
  const [showSampleAnswer, setShowSampleAnswer] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<{
    score: number
    strengths: string[]
    improvements: string[]
    keyPointsCovered: string[]
  } | null>(null)

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

  // Start timer on first answer edit
  useEffect(() => {
    if (answer.length > 0 && !isTimerRunning && !isSubmitted) {
      setIsTimerRunning(true)
    }
  }, [answer, isTimerRunning, isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const analyzeAnswer = useCallback(() => {
    if (!question) return null

    // Simulate AI analysis based on key points coverage
    const coveredPoints = question.keyPoints.filter(point =>
      answer.toLowerCase().includes(point.toLowerCase().split(' ')[0])
    )

    const coverage = coveredPoints.length / question.keyPoints.length
    const lengthBonus = answer.length > 200 ? 10 : answer.length > 100 ? 5 : 0
    const score = Math.min(100, Math.round(coverage * 80 + lengthBonus + Math.random() * 10))

    const strengths: string[] = []
    const improvements: string[] = []

    if (answer.length > 150) strengths.push('Good level of detail in your response')
    else improvements.push('Try to provide more detailed examples')

    if (coveredPoints.length > 0) strengths.push(`Covered ${coveredPoints.length} key points`)
    if (coveredPoints.length < question.keyPoints.length) {
      const missed = question.keyPoints.filter(p => !coveredPoints.includes(p))
      improvements.push(`Consider including: ${missed[0]}`)
    }

    if (answer.includes('example') || answer.includes('for instance')) {
      strengths.push('Good use of examples to illustrate points')
    } else {
      improvements.push('Add specific examples to strengthen your answer')
    }

    return {
      score,
      strengths,
      improvements,
      keyPointsCovered: coveredPoints,
    }
  }, [answer, question])

  const handleSubmit = useCallback(() => {
    if (isSubmitted || !question) return

    setIsSubmitted(true)
    setIsTimerRunning(false)

    const analysis = analyzeAnswer()
    setFeedback(analysis)

    if (analysis) {
      // Award XP based on score
      const xpMultiplier = analysis.score >= 80 ? 1 : analysis.score >= 60 ? 0.75 : 0.5
      const earnedXp = Math.round(question.xpReward * xpMultiplier)

      addXp(earnedXp, `Interview practice: "${question.question.slice(0, 30)}..."`)
      completeMission('daily-interview')
      addNotification(`Great practice! You scored ${analysis.score}%`, 'success')
    }
  }, [isSubmitted, question, analyzeAnswer, addXp, completeMission, addNotification])

  const handleReset = () => {
    setAnswer('')
    setTimeElapsed(0)
    setIsTimerRunning(false)
    setIsSubmitted(false)
    setFeedback(null)
    setShowSampleAnswer(false)
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Question not found</h2>
          <Link href="/interviews">
            <Button variant="outline">Back to Interview Questions</Button>
          </Link>
        </div>
      </div>
    )
  }

  const config = difficultyColors[question.difficulty]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/interviews">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={cn("text-xs px-2 py-0.5 rounded-full border capitalize", config)}>
                  {question.difficulty}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {question.category.replace('-', ' ')}
                </span>
              </div>
              <h1 className="font-semibold text-sm line-clamp-1">{question.question}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg",
              timeElapsed > question.timeLimit * 60 ? "bg-red-500/10 text-red-500" : "bg-muted"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm">{formatTime(timeElapsed)}</span>
              <span className="text-xs text-muted-foreground">/ {question.timeLimit}:00</span>
            </div>

            {/* XP Reward */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">+{question.xpReward} XP</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">{question.question}</h2>
              
              {/* Tips Toggle */}
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                Tips for answering ({question.tips.length})
                {showTips ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showTips && (
                <div className="mt-4 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                  <ul className="space-y-2">
                    {question.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-500 font-medium">{idx + 1}.</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Your Answer</h3>
                <span className="text-xs text-muted-foreground">
                  {answer.length} characters
                </span>
              </div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here. Speak as if you were in an actual interview..."
                className="w-full h-64 p-4 rounded-xl bg-muted border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isSubmitted}
              />
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={answer.length === 0 && !isSubmitted}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={answer.length < 50 || isSubmitted}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Answer
                </Button>
              </div>
            </div>

            {/* Feedback Section */}
            {feedback && (
              <div className="glass rounded-2xl p-6 border border-primary/30 animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    AI Feedback
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "text-3xl font-bold",
                      feedback.score >= 80 ? "text-green-500" :
                      feedback.score >= 60 ? "text-yellow-500" : "text-red-500"
                    )}>
                      {feedback.score}%
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-4 h-4",
                            star <= Math.round(feedback.score / 20)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted-foreground"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Strengths */}
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                    <h4 className="font-medium text-green-500 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {feedback.strengths.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                    <h4 className="font-medium text-yellow-500 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-1 text-sm">
                      {feedback.improvements.map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Key Points */}
                <div>
                  <h4 className="font-medium mb-2">Key Points Coverage</h4>
                  <div className="flex flex-wrap gap-2">
                    {question.keyPoints.map((point, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "text-xs px-3 py-1 rounded-full border",
                          feedback.keyPointsCovered.includes(point)
                            ? "bg-green-500/10 border-green-500/30 text-green-500"
                            : "bg-muted border-border text-muted-foreground"
                        )}
                      >
                        {feedback.keyPointsCovered.includes(point) && (
                          <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        )}
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sample Answer */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Sample Answer</h3>
                <button
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  {showSampleAnswer ? (
                    <>
                      <EyeOff className="w-3 h-3" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3" />
                      Show
                    </>
                  )}
                </button>
              </div>
              <div className={cn(
                "text-sm text-muted-foreground transition-all",
                showSampleAnswer ? "blur-0" : "blur-md select-none"
              )}>
                {question.sampleAnswer}
              </div>
              {!showSampleAnswer && (
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Try answering first before viewing the sample
                </p>
              )}
            </div>

            {/* Key Points */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Key Points to Cover</h3>
              <ul className="space-y-2">
                {question.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation */}
            <div className="glass rounded-2xl p-4">
              <Link href="/interviews">
                <Button variant="outline" className="w-full">
                  Back to All Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InterviewDetailPage() {
  return (
    <GameProvider>
      <InterviewDetailContent />
    </GameProvider>
  )
}
