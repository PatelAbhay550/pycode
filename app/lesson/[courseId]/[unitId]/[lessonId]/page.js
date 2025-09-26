'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaPlay, FaCheckCircle, FaTrophy, FaStar, FaBolt } from 'react-icons/fa'
import { getCourse, getUnit, getLesson } from '@/lib/courseData'
import { updateLessonProgress, getUserProgress } from '@/lib/progressTracking'
import { useAuth } from '@/contexts/AuthContext'
import LessonExercise from '@/components/LessonExercise'
import Quiz from '@/components/Quiz'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function LessonPage() {
  return (
    <ProtectedRoute>
      <LessonPageContent />
    </ProtectedRoute>
  )
}

function LessonPageContent() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [lesson, setLesson] = useState(null)
  const [unit, setUnit] = useState(null)
  const [course, setCourse] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [lessonProgress, setLessonProgress] = useState(null)
  const [showCompletion, setShowCompletion] = useState(false)
  const [totalXP, setTotalXP] = useState(0)

  useEffect(() => {
    if (params.courseId && params.unitId && params.lessonId) {
      const courseData = getCourse(params.courseId)
      const unitData = getUnit(params.courseId, params.unitId)
      const lessonData = getLesson(params.courseId, params.unitId, params.lessonId)
      
      setCourse(courseData)
      setUnit(unitData)
      setLesson(lessonData)

      // Load user progress if logged in
      if (user) {
        const progress = getUserProgress(user.uid, params.courseId, params.unitId, params.lessonId)
        setLessonProgress(progress)
        if (progress?.completedSteps) {
          setCompletedSteps(new Set(progress.completedSteps))
          setCurrentStep(progress.currentStep || 0)
        }
      }
    }
  }, [params, user])

  const handleStepComplete = async (stepIndex, data) => {
    const newCompletedSteps = new Set([...completedSteps, stepIndex])
    setCompletedSteps(newCompletedSteps)
    
    let xpGained = 0
    if (lesson.content[stepIndex].type === 'exercise') {
      xpGained = 10
    } else if (lesson.content[stepIndex].type === 'quiz') {
      xpGained = Math.round(data.score / 10) // 1 XP per 10% score
    }
    
    setTotalXP(prev => prev + xpGained)

    // Move to next step or complete lesson
    if (stepIndex < lesson.content.length - 1) {
      setCurrentStep(stepIndex + 1)
    } else {
      // Lesson completed
      setShowCompletion(true)
      
      if (user) {
        await updateLessonProgress(
          user.uid,
          params.courseId,
          params.unitId,
          params.lessonId,
          {
            completed: true,
            completedSteps: Array.from(newCompletedSteps),
            currentStep: lesson.content.length,
            completedAt: new Date().toISOString(),
            totalXP: totalXP + xpGained,
            data
          }
        )
      }
    }
  }

  const handleContinue = () => {
    router.push(`/learn`)
  }

  if (!lesson || !unit || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const currentContent = lesson.content[currentStep]
  const isLastStep = currentStep === lesson.content.length - 1
  const progressPercentage = ((completedSteps.size) / lesson.content.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{course.title}</span>
              <span>→</span>
              <span>{unit.title}</span>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
                  <FaStar className="w-4 h-4" />
                  <span className="font-semibold">{totalXP} XP</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {completedSteps.size} / {lesson.content.length} completed
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {lesson.description}
            </p>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Steps Navigation */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {lesson.content.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  index === currentStep
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : completedSteps.has(index)
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {completedSteps.has(index) ? (
                  <FaCheckCircle className="w-4 h-4" />
                ) : index === currentStep ? (
                  <FaPlay className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-current" />
                )}
                <span className="text-sm font-medium">
                  {step.type === 'exercise' ? 'Exercise' : 'Quiz'} {index + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            {currentContent.type === 'exercise' ? (
              <LessonExercise
                exercise={currentContent}
                onComplete={(success, attempts, code) => 
                  handleStepComplete(currentStep, { success, attempts, code })
                }
              />
            ) : (
              <Quiz
                quiz={currentContent}
                onComplete={(results) => 
                  handleStepComplete(currentStep, results)
                }
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Completion Modal */}
        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8 text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaTrophy className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Lesson Complete!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Congratulations! You've successfully completed "{lesson.title}".
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-yellow-600 dark:text-yellow-400 mb-1">
                        <FaStar className="w-4 h-4" />
                        <span className="font-bold">{totalXP}</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">XP Earned</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-green-600 dark:text-green-400 mb-1">
                        <FaCheckCircle className="w-4 h-4" />
                        <span className="font-bold">{lesson.content.length}</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Steps Done</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-orange-600 dark:text-orange-400 mb-1">
                        <FaBolt className="w-4 h-4" />
                        <span className="font-bold">+1</span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Streak</div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleContinue}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Continue Learning
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}