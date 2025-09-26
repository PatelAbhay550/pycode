'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTrophy, FaStar, FaFire, FaCrown, FaChartLine, FaCalendar } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import { getLeaderboard, getUserAnalytics } from '@/lib/progressTracking'

const achievements = [
  { id: 'first_lesson', title: 'First Steps', icon: '🎯', color: 'bg-green-500' },
  { id: 'streak_7', title: 'Week Warrior', icon: '🔥', color: 'bg-orange-500' },
  { id: 'quiz_master', title: 'Quiz Master', icon: '🧠', color: 'bg-purple-500' },
  { id: 'xp_1000', title: 'XP Champion', icon: '⭐', color: 'bg-yellow-500' },
  { id: 'lesson_streak_5', title: 'Learning Machine', icon: '⚡', color: 'bg-blue-500' }
]

export default function GamificationDashboard() {
  const { user } = useAuth()
  const [userStats, setUserStats] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadGameData()
    }
  }, [user])

  const loadGameData = async () => {
    try {
      setLoading(true)
      const [analytics, leaders] = await Promise.all([
        getUserAnalytics(user.uid),
        getLeaderboard(10)
      ])
      
      setUserStats(analytics)
      setLeaderboard(leaders)
    } catch (error) {
      console.error('Error loading game data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getXPLevel = (xp) => {
    return Math.floor(xp / 100) + 1
  }

  const getXPProgress = (xp) => {
    return (xp % 100) / 100 * 100
  }

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🏆'
    if (streak >= 14) return '🔥'
    if (streak >= 7) return '⚡'
    if (streak >= 3) return '💪'
    return '🌱'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userStats) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600 dark:text-gray-400">Unable to load stats. Please try again.</p>
      </div>
    )
  }

  const userLevel = getXPLevel(userStats.totalXP)
  const xpProgress = getXPProgress(userStats.totalXP)
  const userRank = leaderboard.findIndex(u => u.id === user.uid) + 1

  return (
    <div className="space-y-8">
      {/* Level and XP Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Level {userLevel}</h2>
            <p className="text-blue-100">
              {userStats.totalXP} XP • {100 - (userStats.totalXP % 100)} XP to next level
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl mb-2">{getStreakEmoji(userStats.currentStreak)}</div>
            <div className="text-sm text-blue-100">
              {userStats.currentStreak} day streak
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Progress to Level {userLevel + 1}</span>
            <span>{Math.round(xpProgress)}%</span>
          </div>
          <div className="w-full bg-blue-400/30 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="bg-white h-3 rounded-full transition-all duration-1000"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Achievement Showcase */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaTrophy className="w-5 h-5 text-yellow-500 mr-2" />
            Recent Achievements
          </h3>
          
          <div className="space-y-4">
            {achievements
              .filter(achievement => userStats.achievements.includes(achievement.id))
              .slice(0, 3)
              .map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
                >
                  <div className={`w-10 h-10 ${achievement.color} rounded-full flex items-center justify-center text-white text-sm`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                      {achievement.title}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-300">
                      Recently unlocked
                    </div>
                  </div>
                </motion.div>
              ))}
            
            {userStats.achievements.length === 0 && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete your first lesson to unlock achievements!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Learning Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaChartLine className="w-5 h-5 text-blue-500 mr-2" />
            Learning Stats
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Lessons per Week</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {userStats.lessonsPerWeek}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Avg. Time per Lesson</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {userStats.averageTimePerLesson}m
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Longest Streak</span>
              <span className="font-semibold text-gray-900 dark:text-white flex items-center">
                <FaFire className="w-4 h-4 text-orange-500 mr-1" />
                {userStats.longestStreak} days
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Total Study Time</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.floor(userStats.totalTimeSpent / 60)}h {userStats.totalTimeSpent % 60}m
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Learning Since</span>
              <span className="font-semibold text-gray-900 dark:text-white flex items-center">
                <FaCalendar className="w-4 h-4 text-gray-500 mr-1" />
                {new Date(userStats.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaCrown className="w-5 h-5 text-yellow-500 mr-2" />
          Leaderboard
          {userRank > 0 && (
            <span className="ml-auto text-sm text-blue-600 dark:text-blue-400">
              You're #{userRank}
            </span>
          )}
        </h3>
        
        <div className="space-y-3">
          {leaderboard.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                leader.id === user.uid
                  ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-orange-600' :
                  'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {index < 3 ? (
                    index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <div className={`font-semibold ${
                    leader.id === user.uid 
                      ? 'text-blue-900 dark:text-blue-100' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {leader.displayName || 'Anonymous'}
                    {leader.id === user.uid && <span className="text-sm ml-1">(You)</span>}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <FaFire className="w-3 h-3 text-orange-500 mr-1" />
                    {leader.streak} day streak
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${
                  leader.id === user.uid 
                    ? 'text-blue-900 dark:text-blue-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {leader.totalXP.toLocaleString()} XP
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Level {getXPLevel(leader.totalXP)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {leaderboard.length === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-gray-600 dark:text-gray-400">
              Be the first to join the leaderboard!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}