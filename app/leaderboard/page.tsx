"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown,
  Minus,
  Flame,
  Target,
  Code,
  Users,
  Globe,
  Building2,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface LeaderboardUser {
  rank: number
  previousRank: number
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  streak: number
  problemsSolved: number
  badges: number
  college?: string
  isCurrentUser?: boolean
}

const globalLeaderboard: LeaderboardUser[] = [
  { rank: 1, previousRank: 1, id: "1", name: "Arjun Sharma", avatar: "", level: 42, xp: 84500, streak: 156, problemsSolved: 523, badges: 47, college: "IIT Delhi" },
  { rank: 2, previousRank: 3, id: "2", name: "Priya Patel", avatar: "", level: 40, xp: 79200, streak: 98, problemsSolved: 489, badges: 42, college: "IIT Bombay" },
  { rank: 3, previousRank: 2, id: "3", name: "Rahul Verma", avatar: "", level: 39, xp: 76800, streak: 134, problemsSolved: 467, badges: 39, college: "BITS Pilani" },
  { rank: 4, previousRank: 5, id: "4", name: "Sneha Reddy", avatar: "", level: 38, xp: 72100, streak: 87, problemsSolved: 445, badges: 36, college: "NIT Trichy" },
  { rank: 5, previousRank: 4, id: "5", name: "Vikram Singh", avatar: "", level: 37, xp: 69500, streak: 112, problemsSolved: 432, badges: 34, college: "IIT Madras" },
  { rank: 6, previousRank: 8, id: "6", name: "Ananya Gupta", avatar: "", level: 36, xp: 65200, streak: 76, problemsSolved: 398, badges: 31, college: "IIIT Hyderabad" },
  { rank: 7, previousRank: 6, id: "7", name: "Karthik Nair", avatar: "", level: 35, xp: 62800, streak: 89, problemsSolved: 387, badges: 29, college: "NIT Surathkal" },
  { rank: 8, previousRank: 7, id: "8", name: "Meera Krishnan", avatar: "", level: 34, xp: 59400, streak: 65, problemsSolved: 356, badges: 27, college: "IIT Kharagpur" },
  { rank: 9, previousRank: 12, id: "9", name: "Aditya Joshi", avatar: "", level: 33, xp: 56100, streak: 45, problemsSolved: 334, badges: 25, college: "VIT Vellore" },
  { rank: 10, previousRank: 9, id: "10", name: "Divya Menon", avatar: "", level: 32, xp: 53700, streak: 78, problemsSolved: 312, badges: 23, college: "IIIT Bangalore" },
  { rank: 42, previousRank: 45, id: "current", name: "You", avatar: "", level: 15, xp: 15750, streak: 7, problemsSolved: 89, badges: 12, college: "Your College", isCurrentUser: true },
]

const friendsLeaderboard: LeaderboardUser[] = [
  { rank: 1, previousRank: 2, id: "f1", name: "Amit Kumar", avatar: "", level: 28, xp: 42500, streak: 45, problemsSolved: 234, badges: 21, college: "Your College" },
  { rank: 2, previousRank: 1, id: "f2", name: "Neha Sharma", avatar: "", level: 26, xp: 38200, streak: 32, problemsSolved: 198, badges: 18, college: "Your College" },
  { rank: 3, previousRank: 3, id: "current", name: "You", avatar: "", level: 15, xp: 15750, streak: 7, problemsSolved: 89, badges: 12, college: "Your College", isCurrentUser: true },
  { rank: 4, previousRank: 5, id: "f3", name: "Rohan Desai", avatar: "", level: 14, xp: 13400, streak: 12, problemsSolved: 76, badges: 10, college: "Your College" },
  { rank: 5, previousRank: 4, id: "f4", name: "Pooja Iyer", avatar: "", level: 12, xp: 11200, streak: 5, problemsSolved: 54, badges: 8, college: "Your College" },
]

const collegeLeaderboard: LeaderboardUser[] = [
  { rank: 1, previousRank: 1, id: "c1", name: "Rajesh Menon", avatar: "", level: 35, xp: 62800, streak: 89, problemsSolved: 387, badges: 29, college: "Your College" },
  { rank: 2, previousRank: 3, id: "c2", name: "Priyanka Das", avatar: "", level: 32, xp: 53700, streak: 67, problemsSolved: 312, badges: 23, college: "Your College" },
  { rank: 3, previousRank: 2, id: "c3", name: "Suresh Rajan", avatar: "", level: 30, xp: 48500, streak: 54, problemsSolved: 278, badges: 20, college: "Your College" },
  { rank: 4, previousRank: 4, id: "c4", name: "Kavitha Nair", avatar: "", level: 28, xp: 42500, streak: 45, problemsSolved: 234, badges: 18, college: "Your College" },
  { rank: 5, previousRank: 6, id: "c5", name: "Amit Kumar", avatar: "", level: 26, xp: 38200, streak: 32, problemsSolved: 198, badges: 16, college: "Your College" },
  { rank: 12, previousRank: 15, id: "current", name: "You", avatar: "", level: 15, xp: 15750, streak: 7, problemsSolved: 89, badges: 12, college: "Your College", isCurrentUser: true },
]

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/30">
        <Crown className="w-5 h-5 text-yellow-900" />
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg shadow-gray-400/30">
        <Medal className="w-5 h-5 text-gray-700" />
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg shadow-amber-600/30">
        <Medal className="w-5 h-5 text-amber-200" />
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground font-bold">
      {rank}
    </div>
  )
}

function RankChange({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current
  
  if (diff > 0) {
    return (
      <div className="flex items-center gap-1 text-neon-green">
        <TrendingUp className="w-4 h-4" />
        <span className="text-xs font-medium">+{diff}</span>
      </div>
    )
  }
  if (diff < 0) {
    return (
      <div className="flex items-center gap-1 text-destructive">
        <TrendingDown className="w-4 h-4" />
        <span className="text-xs font-medium">{diff}</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Minus className="w-4 h-4" />
      <span className="text-xs font-medium">0</span>
    </div>
  )
}

function LeaderboardRow({ user, showCollege = true }: { user: LeaderboardUser; showCollege?: boolean }) {
  return (
    <div 
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        user.isCurrentUser 
          ? "bg-primary/10 border border-primary/30 neon-border-cyan" 
          : "bg-card/50 hover:bg-card/80 border border-border/50"
      }`}
    >
      <RankBadge rank={user.rank} />
      <RankChange current={user.rank} previous={user.previousRank} />
      
      <Avatar className="w-12 h-12 border-2 border-border">
        <AvatarImage src={user.avatar} />
        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold">
          {user.name.split(" ").map(n => n[0]).join("")}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className={`font-semibold truncate ${user.isCurrentUser ? "text-primary" : "text-foreground"}`}>
            {user.name}
          </span>
          {user.isCurrentUser && (
            <Badge className="bg-primary/20 text-primary text-xs">You</Badge>
          )}
        </div>
        {showCollege && user.college && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="w-3 h-3" />
            <span className="truncate">{user.college}</span>
          </div>
        )}
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Level</div>
          <div className="font-bold text-secondary">{user.level}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">XP</div>
          <div className="font-bold text-primary">{user.xp.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
            <Flame className="w-3 h-3 text-orange-500" />
            Streak
          </div>
          <div className="font-bold text-orange-500">{user.streak}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
            <Code className="w-3 h-3" />
            Solved
          </div>
          <div className="font-bold">{user.problemsSolved}</div>
        </div>
      </div>
      
      <div className="md:hidden text-right">
        <div className="font-bold text-primary">{user.xp.toLocaleString()} XP</div>
        <div className="text-xs text-muted-foreground">Lvl {user.level}</div>
      </div>
    </div>
  )
}

function TopThreePodium({ users }: { users: LeaderboardUser[] }) {
  const [first, second, third] = users.slice(0, 3)
  
  return (
    <div className="flex items-end justify-center gap-4 mb-8 pt-8">
      {/* Second Place */}
      <div className="flex flex-col items-center">
        <Avatar className="w-16 h-16 border-4 border-gray-400 shadow-lg mb-2">
          <AvatarImage src={second.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-gray-300 to-gray-500 text-gray-700 font-bold text-lg">
            {second.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm text-center max-w-[100px] truncate">{second.name}</span>
        <span className="text-xs text-muted-foreground">{second.xp.toLocaleString()} XP</span>
        <div className="w-20 h-24 bg-gradient-to-t from-gray-500 to-gray-400 rounded-t-lg mt-2 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">2</span>
        </div>
      </div>
      
      {/* First Place */}
      <div className="flex flex-col items-center -mt-8">
        <div className="relative">
          <Crown className="w-8 h-8 text-yellow-500 absolute -top-6 left-1/2 -translate-x-1/2 animate-float" />
          <Avatar className="w-20 h-20 border-4 border-yellow-500 shadow-lg shadow-yellow-500/30 mb-2">
            <AvatarImage src={first.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 font-bold text-xl">
              {first.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <span className="font-bold text-center max-w-[120px] truncate">{first.name}</span>
        <span className="text-sm text-primary font-semibold">{first.xp.toLocaleString()} XP</span>
        <div className="w-24 h-32 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg mt-2 flex items-center justify-center shadow-lg shadow-yellow-500/20">
          <span className="text-3xl font-bold text-yellow-900">1</span>
        </div>
      </div>
      
      {/* Third Place */}
      <div className="flex flex-col items-center">
        <Avatar className="w-14 h-14 border-4 border-amber-600 shadow-lg mb-2">
          <AvatarImage src={third.avatar} />
          <AvatarFallback className="bg-gradient-to-br from-amber-600 to-amber-800 text-amber-200 font-bold">
            {third.name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm text-center max-w-[100px] truncate">{third.name}</span>
        <span className="text-xs text-muted-foreground">{third.xp.toLocaleString()} XP</span>
        <div className="w-20 h-20 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-lg mt-2 flex items-center justify-center">
          <span className="text-2xl font-bold text-amber-200">3</span>
        </div>
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">Compete with the best and climb the ranks</p>
          </div>
          
          {/* Your Position Card */}
          <Card className="bg-card/50 border-primary/30">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Your Global Rank</div>
                <div className="text-2xl font-bold text-primary">#42</div>
              </div>
              <div className="flex items-center gap-1 text-neon-green ml-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+3 this week</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Leaderboard Tabs */}
        <Tabs defaultValue="global" className="space-y-6">
          <TabsList className="bg-card/50 border border-border p-1">
            <TabsTrigger value="global" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="w-4 h-4" />
              Global
            </TabsTrigger>
            <TabsTrigger value="college" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building2 className="w-4 h-4" />
              College
            </TabsTrigger>
            <TabsTrigger value="friends" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" />
              Friends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="space-y-6">
            <Card className="bg-card/30 border-border/50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <TopThreePodium users={globalLeaderboard} />
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 border-border/50">
              <CardHeader>
                <CardTitle>Rankings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {globalLeaderboard.slice(3).map((user) => (
                  <LeaderboardRow key={user.id} user={user} />
                ))}
              </CardContent>
            </Card>
            
            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-4">
                Page {currentPage} of 10
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentPage(p => p + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="college" className="space-y-6">
            <Card className="bg-card/30 border-border/50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-secondary" />
                  Your College Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <TopThreePodium users={collegeLeaderboard} />
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 border-border/50">
              <CardHeader>
                <CardTitle>College Rankings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {collegeLeaderboard.slice(3).map((user) => (
                  <LeaderboardRow key={user.id} user={user} showCollege={false} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="friends" className="space-y-6">
            <Card className="bg-card/30 border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Friends Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {friendsLeaderboard.map((user) => (
                  <LeaderboardRow key={user.id} user={user} />
                ))}
              </CardContent>
            </Card>
            
            <Card className="bg-card/30 border-border/50">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Invite More Friends</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Compete with your friends and motivate each other to succeed!
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Invite Friends
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
