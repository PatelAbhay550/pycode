"use client"
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { courses, getCourseProgress } from '../../lib/courseData'
import { FaPlay, FaClock, FaBook, FaTrophy } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Helper function to calculate progress
const calculateProgress = (completedLessons, totalLessons) => {
  if (totalLessons === 0) return 0
  return Math.round((completedLessons.length / totalLessons) * 100)
}

export default function LearnPage() {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading || !mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {userProfile?.displayName || 'Learner'}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Continue your Python learning journey
              </p>
            </div>
            
            {userProfile && (
              <div className="flex items-center space-x-4 lg:space-x-6">
                <div className="text-center">
                  <div className="text-lg lg:text-xl font-bold text-blue-600 dark:text-blue-400">
                    {userProfile.currentStreak}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-xl font-bold text-green-600 dark:text-green-400">
                    {userProfile.totalXP}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg lg:text-xl font-bold text-purple-600 dark:text-purple-400">
                    {userProfile.level}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Level</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FaBook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lessons Completed</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {userProfile?.completedLessons?.length || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <FaTrophy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Badges Earned</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {userProfile?.badges?.length || 0}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <FaClock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {userProfile?.currentStreak || 0} days
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Courses */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Courses</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course, index) => {
              const completedLessons = userProfile?.completedLessons?.filter(lessonId => 
                lessonId.startsWith(course.id)
              ) || []
              
              const totalLessons = course.units.reduce((total, unit) => total + unit.lessons.length, 0)
              const progress = calculateProgress(completedLessons, totalLessons)
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl">{course.icon}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {course.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {course.description}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <FaClock className="w-3 h-3 mr-1" />
                              {course.estimatedTime}
                            </span>
                            <span className="flex items-center">
                              <FaBook className="w-3 h-3 mr-1" />
                              {totalLessons} lessons
                            </span>
                            <span className="capitalize px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                              {course.level}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${course.color} transition-all duration-300`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div className="mt-6">
                      <Link
                        href={`/learn/${course.id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <FaPlay className="w-3 h-3 mr-2" />
                        {progress > 0 ? 'Continue Learning' : 'Start Course'}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Continue Learning Section */}
        {userProfile?.completedLessons?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Continue Learning</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Pick up where you left off</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Continue with your last lesson</p>
                </div>
                <Link
                  href="/learn/python-basics"
                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <FaPlay className="w-3 h-3 mr-2" />
                  Continue
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
