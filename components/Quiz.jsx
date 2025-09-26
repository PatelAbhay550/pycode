'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaCode, FaBug, FaListUl, FaClock } from 'react-icons/fa'
import { usePython } from 'react-py'

const QuizQuestion = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [code, setCode] = useState(question.code || '')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(question.timeLimit || 60)
  const [timerActive, setTimerActive] = useState(true)
  
  const { runPython, stdout, stderr, isLoading } = usePython()

  // Timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleTimeUp()
    }
  }, [timeLeft, timerActive])

  const handleTimeUp = () => {
    setTimerActive(false)
    handleSubmit(true) // Auto-submit when time is up
  }

  const handleSubmit = (timeUp = false) => {
    setTimerActive(false)
    let correct = false
    let userAnswer = selectedAnswer

    switch (question.type) {
      case 'multiple-choice':
        correct = selectedAnswer === question.correctAnswer
        break
      case 'code-completion':
        const normalizedCode = code.trim().toLowerCase()
        const normalizedSolution = question.solution.trim().toLowerCase()
        correct = normalizedCode.includes(normalizedSolution) || stdout
        userAnswer = code
        break
      case 'debugging':
        // Check if the bugs are fixed
        correct = code.includes(question.fixedCode) || stdout
        userAnswer = code
        break
      case 'true-false':
        correct = selectedAnswer === question.correctAnswer
        break
    }

    setIsCorrect(correct)
    setShowFeedback(true)
    
    setTimeout(() => {
      onAnswer({
        questionId: question.id,
        userAnswer,
        isCorrect: correct,
        timeSpent: (question.timeLimit || 60) - timeLeft,
        wasTimeUp: timeUp
      })
    }, 2000)
  }

  const runCodeForDebugging = () => {
    runPython(code)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getQuestionIcon = () => {
    switch (question.type) {
      case 'multiple-choice':
        return <FaListUl className="w-5 h-5" />
      case 'code-completion':
        return <FaCode className="w-5 h-5" />
      case 'debugging':
        return <FaBug className="w-5 h-5" />
      default:
        return <FaListUl className="w-5 h-5" />
    }
  }

  if (showFeedback) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-8 text-center rounded-lg ${
          isCorrect 
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
        }`}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            {isCorrect ? (
              <FaCheck className="w-8 h-8" />
            ) : (
              <FaTimes className="w-8 h-8" />
            )}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          {isCorrect ? 'Correct!' : 'Not quite right'}
        </h3>
        
        <p className="text-lg opacity-90 mb-4">
          {isCorrect ? question.successMessage : question.errorMessage}
        </p>
        
        {!isCorrect && (
          <div className="bg-white/10 rounded-lg p-4 text-left">
            <h4 className="font-semibold mb-2">Explanation:</h4>
            <p className="text-sm opacity-90">{question.explanation}</p>
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
          {isCorrect && <span>✨ +5 XP</span>}
          <span>⏱️ {formatTime((question.timeLimit || 60) - timeLeft)}</span>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
            {getQuestionIcon()}
          </div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Question {questionNumber} of {totalQuestions}
            </div>
            <div className="font-medium text-gray-900 dark:text-white capitalize">
              {question.type.replace('-', ' ')}
            </div>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
          timeLeft <= 10 
            ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
        }`}>
          <FaClock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {question.question}
        </h3>

        {question.type === 'multiple-choice' && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-gray-100">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {question.type === 'true-false' && (
          <div className="space-y-3">
            {[true, false].map((value) => (
              <motion.button
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAnswer(value)}
                className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                  selectedAnswer === value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedAnswer === value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900 dark:text-gray-100">
                    {value ? 'True' : 'False'}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {(question.type === 'code-completion' || question.type === 'debugging') && (
          <div className="space-y-4">
            {question.buggyCode && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                  {question.type === 'debugging' ? 'Buggy Code:' : 'Starting Code:'}
                </h4>
                <pre className="font-mono text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap">
                  {question.buggyCode}
                </pre>
              </div>
            )}
            
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Your solution:</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-40 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-none outline-none resize-none"
                placeholder={question.placeholder || "Write your Python code here..."}
                spellCheck={false}
              />
            </div>
            
            {question.type === 'debugging' && (
              <button
                onClick={runCodeForDebugging}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Testing...' : 'Test Code'}
              </button>
            )}
            
            {(stdout || stderr) && (
              <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm">
                {stdout && <div className="text-green-400">Output: {stdout}</div>}
                {stderr && <div className="text-red-400">Error: {stderr}</div>}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSubmit()}
          disabled={
            (question.type === 'multiple-choice' && selectedAnswer === null) ||
            (question.type === 'true-false' && selectedAnswer === null) ||
            ((question.type === 'code-completion' || question.type === 'debugging') && !code.trim())
          }
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          Submit Answer
        </motion.button>
      </div>
    </div>
  )
}

export default function Quiz({ quiz, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [quizStartTime] = useState(Date.now())

  const handleAnswer = (answerData) => {
    const newAnswers = [...answers, answerData]
    setAnswers(newAnswers)

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // Quiz completed
      const totalTime = Date.now() - quizStartTime
      const correctAnswers = newAnswers.filter(a => a.isCorrect).length
      const score = Math.round((correctAnswers / quiz.questions.length) * 100)
      
      onComplete?.({
        quizId: quiz.id,
        answers: newAnswers,
        score,
        totalTime,
        correctAnswers,
        totalQuestions: quiz.questions.length
      })
    }
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.title}</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={quiz.questions.length}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}