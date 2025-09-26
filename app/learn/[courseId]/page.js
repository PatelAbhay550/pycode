'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaPlay, FaCheckCircle, FaLock, FaClock, FaBook } from 'react-icons/fa'
import { getCourse, getCourseProgress } from '@/lib/courseData'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function CourseDetailPage() {
  return (
    <ProtectedRoute>
      <CourseDetailPageContent />
    </ProtectedRoute>
  )
}

function CourseDetailPageContent() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    if (params.courseId) {
      const courseData = getCourse(params.courseId)
      setCourse(courseData)
      
      if (user) {
        const progressData = getCourseProgress(user.uid, params.courseId)
        setProgress(progressData)
      }
    }
  }, [params.courseId, user])

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const totalLessons = course.units.reduce((total, unit) => total + unit.lessons.length, 0)
  const completedLessons = progress?.completedLessons || 0
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors mb-4"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </button>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className={`h-3 bg-gradient-to-r ${course.color}`}></div>
            <div className="p-8">
              <div className="flex items-start space-x-6">
                <div className="text-6xl">{course.icon}</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span className="flex items-center">
                      <FaClock className="w-4 h-4 mr-2" />
                      {course.estimatedTime}
                    </span>
                    <span className="flex items-center">
                      <FaBook className="w-4 h-4 mr-2" />
                      {totalLessons} lessons
                    </span>
                    <span className="capitalize px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Course Progress</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        className={`h-3 rounded-full bg-gradient-to-r ${course.color} transition-all duration-1000`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Units */}
        <div className="space-y-8">
          {course.units.map((unit, unitIndex) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * unitIndex }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Unit {unitIndex + 1}: {unit.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {unit.description}
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <Link 
                      key={lesson.id}
                      href={lesson.locked ? '#' : `/lesson/${course.id}/${unit.id}/${lesson.id}`}
                      className={lesson.locked ? 'cursor-not-allowed' : 'block'}
                    >
                      <motion.div
                        whileHover={lesson.locked ? {} : { scale: 1.02 }}
                        whileTap={lesson.locked ? {} : { scale: 0.98 }}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          lesson.completed
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                            : lesson.locked
                            ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 opacity-60 cursor-not-allowed'
                            : 'border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-semibold">
                              {lessonIndex + 1}
                            </div>
                            <h4 className={`font-semibold ${
                              lesson.completed
                                ? 'text-green-800 dark:text-green-200'
                                : lesson.locked
                                ? 'text-gray-500 dark:text-gray-400'
                                : 'text-blue-800 dark:text-blue-200'
                            }`}>
                              {lesson.title}
                            </h4>
                          </div>
                          <div className="flex items-center space-x-3">
                            {lesson.completed && (
                              <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            )}
                            {lesson.locked && (
                              <FaLock className="w-4 h-4 text-gray-400" />
                            )}
                            <span className={`text-sm flex items-center ${
                              lesson.completed
                                ? 'text-green-600 dark:text-green-400'
                                : lesson.locked
                                ? 'text-gray-400'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              <FaClock className="w-3 h-3 mr-1" />
                              {lesson.duration} min
                            </span>
                          </div>
                        </div>
                        <p className={`text-sm ml-11 ${
                          lesson.completed
                            ? 'text-green-600 dark:text-green-300'
                            : lesson.locked
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-blue-600 dark:text-blue-300'
                        }`}>
                          {lesson.description}
                        </p>
                        <div className="mt-3 ml-11 flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            lesson.type === 'quiz'
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                          }`}>
                            {lesson.type === 'quiz' ? '🧠 Quiz' : '📝 Lesson'}
                          </span>
                          <span className={`text-xs ${
                            lesson.difficulty === 'beginner'
                              ? 'text-green-600 dark:text-green-400'
                              : lesson.difficulty === 'intermediate'
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Learning Button */}
        <div className="mt-8 text-center">
          <Link
            href={`/lesson/${course.id}/${course.units[0].id}/${course.units[0].lessons[0].id}`}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <FaPlay className="w-4 h-4 mr-2" />
            {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
          </Link>
        </div>
      </div>
    </div>
  )
}