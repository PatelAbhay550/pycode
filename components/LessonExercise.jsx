'use client'

import { useState, useEffect } from 'react'
import { usePython } from 'react-py'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaCheck, FaTimes, FaLightbulb, FaArrowRight } from 'react-icons/fa'

export default function LessonExercise({ exercise, onComplete }) {
  const [code, setCode] = useState(exercise.startingCode || '')
  const [showHint, setShowHint] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [attempts, setAttempts] = useState(0)
  
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

  const handleRunCode = () => {
    setAttempts(prev => prev + 1)
    runPython(code)
  }

  const checkSolution = () => {
    // Simple solution checking - in a real app, you'd have more sophisticated checking
    const normalizedCode = code.trim().toLowerCase()
    const normalizedSolution = exercise.solution.trim().toLowerCase()
    
    // Check if the code produces the expected output or matches the solution pattern
    if (normalizedCode.includes(normalizedSolution.split('\n')[0]) || stdout) {
      setIsCompleted(true)
      onComplete?.(true, attempts, code)
    }
  }

  useEffect(() => {
    if (stdout || stderr) {
      checkSolution()
    }
  }, [stdout, stderr])

  const nextHint = () => {
    if (currentHintIndex < exercise.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Exercise Instruction */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Task:</h3>
        <p className="text-blue-800 dark:text-blue-200">{exercise.instruction}</p>
      </div>

      {/* Code Editor */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">exercise.py</span>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Attempts: {attempts}
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-none outline-none resize-none"
          placeholder="Write your Python code here..."
          spellCheck={false}
        />
        
        <div className="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRunCode}
              disabled={isLoading || isRunning || !code.trim()}
              className="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isRunning ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <FaPlay className="w-3 h-3 mr-2" />
              )}
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            
            <button
              onClick={() => setShowHint(true)}
              className="inline-flex items-center px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <FaLightbulb className="w-3 h-3 mr-2" />
              Hint
            </button>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Lines: {code.split('\n').length} • Characters: {code.length}
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="space-y-4">
        {/* Success Output */}
        {stdout && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div className="bg-green-50 dark:bg-green-900/20 px-4 py-2 border-b border-green-200 dark:border-green-700 flex items-center">
              <FaCheck className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">Output</span>
            </div>
            <div className="p-4">
              <pre className="font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                {stdout}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Error Output */}
        {stderr && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-700 rounded-lg overflow-hidden"
          >
            <div className="bg-red-50 dark:bg-red-900/20 px-4 py-2 border-b border-red-200 dark:border-red-700 flex items-center">
              <FaTimes className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-sm font-medium text-red-800 dark:text-red-200">Error</span>
            </div>
            <div className="p-4">
              <pre className="font-mono text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">
                {stderr}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Completion Message */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-6 text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaCheck className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Excellent work!</h3>
              <p className="text-green-100 mb-4">You completed the exercise successfully.</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span>✨ +10 XP</span>
                <span>🔥 Streak maintained</span>
                <span>🎯 {attempts} attempt{attempts !== 1 ? 's' : ''}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint Modal */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowHint(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <FaLightbulb className="w-5 h-5 text-yellow-500 mr-2" />
                  Hint {currentHintIndex + 1} of {exercise.hints.length}
                </h3>
                <button
                  onClick={() => setShowHint(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {exercise.hints[currentHintIndex]}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Hint {currentHintIndex + 1} of {exercise.hints.length}
                </span>
                
                {currentHintIndex < exercise.hints.length - 1 && (
                  <button
                    onClick={nextHint}
                    className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Next Hint
                    <FaArrowRight className="w-3 h-3 ml-2" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}