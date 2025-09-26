'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCrown, FaTrophy, FaFire, FaMedal, FaStar, FaChartLine } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import { getLeaderboard } from '@/lib/progressTracking'
import GamificationDashboard from '@/components/GamificationDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function LeaderboardPage() {
  return (
    <ProtectedRoute>
      <LeaderboardPageContent />
    </ProtectedRoute>
  )
}

function LeaderboardPageContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('leaderboard')
  const [timeframe, setTimeframe] = useState('all-time')
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [timeframe])

  const loadLeaderboard = async () => {
    try {
      setLoading(true)
      const data = await getLeaderboard(50) // Get top 50
      setLeaderboard(data)
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const getXPLevel = (xp) => {
    return Math.floor(xp / 100) + 1
  }

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return '👑'
      case 1: return '🥈'
      case 2: return '🥉'
      default: return index + 1
    }
  }

  const getRankColor = (index) => {
    switch (index) {
      case 0: return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 1: return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 2: return 'bg-gradient-to-r from-orange-400 to-orange-600'
      default: return 'bg-gray-200 dark:bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <FaTrophy className="w-8 h-8 text-yellow-500 mr-3" />
            Leaderboard & Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            See how you rank against other Python learners and track your achievements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FaCrown className="w-4 h-4 inline mr-2" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'achievements'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FaTrophy className="w-4 h-4 inline mr-2" />
              My Progress
            </button>
          </div>
        </div>

        {activeTab === 'leaderboard' && (
          <div>
            {/* Timeframe Filter */}
            <div className="flex justify-center mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
                {['all-time', 'this-month', 'this-week'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeframe(period)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      timeframe === period
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {period.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>

            {/* Podium for Top 3 */}
            {!loading && leaderboard.length >= 3 && (
              <div className="mb-12">
                <div className="flex items-end justify-center space-x-4 mb-8">
                  {/* Second Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-gray-300 to-gray-500 w-20 h-16 rounded-t-lg flex items-center justify-center text-white text-2xl font-bold mb-2">
                      🥈
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[140px]">
                      <div className="font-bold text-gray-900 dark:text-white text-sm truncate">
                        {leaderboard[1]?.displayName || 'Anonymous'}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {leaderboard[1]?.totalXP.toLocaleString()} XP
                      </div>
                    </div>
                  </motion.div>

                  {/* First Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 w-24 h-20 rounded-t-lg flex items-center justify-center text-white text-3xl font-bold mb-2">
                      👑
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl border-2 border-yellow-300 dark:border-yellow-600 min-w-[160px]">
                      <div className="font-bold text-gray-900 dark:text-white truncate">
                        {leaderboard[0]?.displayName || 'Anonymous'}
                      </div>
                      <div className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold">
                        {leaderboard[0]?.totalXP.toLocaleString()} XP
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center mt-1">
                        <FaFire className="w-3 h-3 text-orange-500 mr-1" />
                        {leaderboard[0]?.streak} days
                      </div>
                    </div>
                  </motion.div>

                  {/* Third Place */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 w-20 h-12 rounded-t-lg flex items-center justify-center text-white text-xl font-bold mb-2">
                      🥉
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 min-w-[140px]">
                      <div className="font-bold text-gray-900 dark:text-white text-sm truncate">
                        {leaderboard[2]?.displayName || 'Anonymous'}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {leaderboard[2]?.totalXP.toLocaleString()} XP
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Full Leaderboard */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Rankings</h2>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {leaderboard.map((leader, index) => (
                    <motion.div
                      key={leader.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        leader.id === user?.uid ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(index)}`}>
                          {typeof getRankIcon(index) === 'string' ? (
                            <span className="text-lg">{getRankIcon(index)}</span>
                          ) : (
                            getRankIcon(index)
                          )}
                        </div>
                        
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                            {leader.displayName || 'Anonymous'}
                            {leader.id === user?.uid && (
                              <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-3">
                            <span>Level {getXPLevel(leader.totalXP)}</span>
                            <span className="flex items-center">
                              <FaFire className="w-3 h-3 text-orange-500 mr-1" />
                              {leader.streak} days
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                          {leader.totalXP.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">XP</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && leaderboard.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No rankings yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Be the first to appear on the leaderboard!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && <GamificationDashboard />}
      </div>
    </div>
  )
}