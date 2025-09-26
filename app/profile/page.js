'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEdit, FaSave, FaTimes, FaTrophy, FaFire, FaStar, FaCalendar, FaCode, FaClock, FaChartLine } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  )
}

function ProfilePageContent() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    learningGoal: '',
    experience: 'beginner'
  })
  const [stats, setStats] = useState({
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    lessonsCompleted: 0,
    quizzesCompleted: 0,
    totalTimeSpent: 0,
    achievements: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      loadUserProfile()
    }
  }, [user])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      
      // Load user profile data
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        setProfile({
          displayName: userData.displayName || user.displayName || '',
          bio: userData.bio || '',
          learningGoal: userData.learningGoal || '',
          experience: userData.experience || 'beginner'
        })
        
        setStats({
          totalXP: userData.totalXP || 0,
          currentStreak: userData.currentStreak || 0,
          longestStreak: userData.longestStreak || 0,
          lessonsCompleted: userData.lessonsCompleted || 0,
          quizzesCompleted: userData.quizzesCompleted || 0,
          totalTimeSpent: userData.totalTimeSpent || 0,
          achievements: userData.achievements || []
        })
      } else {
        // Initialize with user data from auth
        setProfile(prev => ({
          ...prev,
          displayName: user.displayName || ''
        }))
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: profile.displayName
      })

      // Update Firestore user document
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: profile.displayName,
        bio: profile.bio,
        learningGoal: profile.learningGoal,
        experience: profile.experience,
        updatedAt: new Date().toISOString()
      })

      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const getExperienceColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-600 dark:text-green-400'
      case 'intermediate': return 'text-yellow-600 dark:text-yellow-400'
      case 'advanced': return 'text-red-600 dark:text-red-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const achievements = [
    { id: 'first_lesson', title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', unlocked: stats.lessonsCompleted > 0 },
    { id: 'streak_7', title: 'Week Warrior', description: '7-day learning streak', icon: '🔥', unlocked: stats.longestStreak >= 7 },
    { id: 'quiz_master', title: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🧠', unlocked: stats.quizzesCompleted >= 10 },
    { id: 'xp_1000', title: 'XP Champion', description: 'Earn 1000 XP', icon: '⭐', unlocked: stats.totalXP >= 1000 },
    { id: 'python_basics', title: 'Python Basics', description: 'Complete Python Fundamentals course', icon: '🐍', unlocked: false },
    { id: 'speed_demon', title: 'Speed Demon', description: 'Complete a lesson in under 5 minutes', icon: '⚡', unlocked: false }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <FaUser className="w-10 h-10" />
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {!isEditing ? (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {profile.displayName || 'Anonymous Learner'}
                    </h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{user?.email}</p>
                  <p className={`text-sm font-medium capitalize mb-3 ${getExperienceColor(profile.experience)}`}>
                    {profile.experience} Level
                  </p>
                  {profile.bio && (
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{profile.bio}</p>
                  )}
                  {profile.learningGoal && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>Learning Goal:</strong> {profile.learningGoal}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={profile.displayName}
                      onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Learning Goal
                    </label>
                    <input
                      type="text"
                      value={profile.learningGoal}
                      onChange={(e) => setProfile({ ...profile, learningGoal: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="What do you want to achieve?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Experience Level
                    </label>
                    <select
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <FaSave className="w-4 h-4 mr-2" />
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaTimes className="w-4 h-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <FaStar className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalXP}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total XP</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <FaFire className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <FaCode className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.lessonsCompleted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lessons</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <FaClock className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatTime(stats.totalTimeSpent)}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time Spent</div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaTrophy className="w-6 h-6 text-yellow-500 mr-3" />
            Achievements
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 opacity-60'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h3 className={`font-semibold ${
                      achievement.unlocked 
                        ? 'text-yellow-800 dark:text-yellow-200' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.unlocked 
                        ? 'text-yellow-600 dark:text-yellow-300' 
                        : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaChartLine className="w-6 h-6 text-blue-500 mr-3" />
            Learning Progress
          </h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Python Fundamentals</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">3/12 lessons</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Control Structures</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">0/18 lessons</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Progress</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">3/30 total</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}