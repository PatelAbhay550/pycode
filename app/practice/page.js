'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaPlay, FaLightbulb, FaRandom, FaClock, FaStar, FaTrophy } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import CodeEditor from '@/components/react-py'

// Practice challenges data
const practiceCategories = [
  {
    id: 'basics',
    title: 'Python Basics',
    description: 'Variables, data types, and basic operations',
    color: 'from-blue-500 to-blue-600',
    challenges: [
      {
        id: 'hello_world',
        title: 'Hello World',
        difficulty: 'Easy',
        description: 'Write a program that prints "Hello, World!" to the console.',
        starterCode: '# Write your code here\n',
        solution: 'print("Hello, World!")',
        hint: 'Use the print() function to output text.'
      },
      {
        id: 'variables',
        title: 'Working with Variables',
        difficulty: 'Easy',
        description: 'Create variables to store your name and age, then print them.',
        starterCode: '# Create variables for name and age\n# Then print them\n',
        solution: 'name = "Your Name"\nage = 25\nprint(f"My name is {name} and I am {age} years old.")',
        hint: 'Use variables and f-strings for formatting.'
      },
      {
        id: 'calculator',
        title: 'Simple Calculator',
        difficulty: 'Medium',
        description: 'Create a calculator that adds, subtracts, multiplies, and divides two numbers.',
        starterCode: '# Create a simple calculator\na = 10\nb = 5\n\n# Perform operations and print results\n',
        solution: 'a = 10\nb = 5\n\nprint(f"Addition: {a + b}")\nprint(f"Subtraction: {a - b}")\nprint(f"Multiplication: {a * b}")\nprint(f"Division: {a / b}")',
        hint: 'Use basic arithmetic operators: +, -, *, /'
      }
    ]
  },
  {
    id: 'loops',
    title: 'Loops & Iteration',
    description: 'For loops, while loops, and iteration patterns',
    color: 'from-green-500 to-green-600',
    challenges: [
      {
        id: 'count_numbers',
        title: 'Count to 10',
        difficulty: 'Easy',
        description: 'Use a for loop to print numbers from 1 to 10.',
        starterCode: '# Use a for loop to count from 1 to 10\n',
        solution: 'for i in range(1, 11):\n    print(i)',
        hint: 'Use range(1, 11) to get numbers 1 through 10.'
      },
      {
        id: 'sum_numbers',
        title: 'Sum Numbers',
        difficulty: 'Medium',
        description: 'Calculate the sum of numbers from 1 to 100 using a loop.',
        starterCode: '# Calculate sum of numbers 1 to 100\ntotal = 0\n\n# Your loop here\n\nprint(f"Sum: {total}")',
        solution: 'total = 0\nfor i in range(1, 101):\n    total += i\nprint(f"Sum: {total}")',
        hint: 'Use += to add each number to the total.'
      }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Creating and using functions effectively',
    color: 'from-purple-500 to-purple-600',
    challenges: [
      {
        id: 'greeting_function',
        title: 'Greeting Function',
        difficulty: 'Easy',
        description: 'Create a function that takes a name and returns a greeting.',
        starterCode: '# Create a function called greet that takes a name parameter\n\n# Test your function\nprint(greet("Alice"))',
        solution: 'def greet(name):\n    return f"Hello, {name}! Nice to meet you!"\n\nprint(greet("Alice"))',
        hint: 'Use def to define a function and return to send back a value.'
      }
    ]
  }
]

export default function PracticePage() {
  return (
    <ProtectedRoute>
      <PracticePageContent />
    </ProtectedRoute>
  )
}

function PracticePageContent() {
  const { user, userProfile } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [code, setCode] = useState('')

  const handleChallengeSelect = (category, challenge) => {
    setSelectedCategory(category)
    setSelectedChallenge(challenge)
    setCode(challenge.starterCode)
    setShowHint(false)
    setShowSolution(false)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSelectedChallenge(null)
    setCode('')
    setShowHint(false)
    setShowSolution(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      case 'Hard': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  if (selectedChallenge) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToCategories}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Practice
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                  {selectedChallenge.difficulty}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedChallenge.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {selectedChallenge.description}
              </p>
            </div>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Instructions Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Instructions
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedChallenge.description}
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center w-full text-left px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <FaLightbulb className="text-blue-600 dark:text-blue-400 mr-3" />
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </span>
                  </button>

                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
                    >
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        💡 {selectedChallenge.hint}
                      </p>
                    </motion.div>
                  )}

                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="flex items-center w-full text-left px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
                  >
                    <FaCode className="text-amber-600 dark:text-amber-400 mr-3" />
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </span>
                  </button>

                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
                    >
                      <pre className="text-amber-800 dark:text-amber-200 text-sm font-mono whitespace-pre-wrap">
                        {selectedChallenge.solution}
                      </pre>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Editor Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Code Editor
                  </h3>
                </div>
                <div className="p-0">
                  <CodeEditor />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-4"
            >
              <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl">
                <FaCode className="text-3xl text-white" />
              </div>
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Practice Python
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              Sharpen your Python skills with hands-on coding challenges. Start with basics and work your way up!
            </p>
          </div>
        </div>
      </div>

      {/* Practice Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all hover:-translate-y-1"
            >
              {/* Category Header */}
              <div className={`h-32 bg-gradient-to-br ${category.color} p-6 flex items-center justify-center`}>
                <FaCode className="text-4xl text-white" />
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {category.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category.challenges.length} challenges
                  </span>
                  <div className="flex items-center space-x-1">
                    {category.challenges.map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Challenge List */}
                <div className="space-y-2">
                  {category.challenges.map((challenge) => (
                    <button
                      key={challenge.id}
                      onClick={() => handleChallengeSelect(category, challenge)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-left"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {challenge.title}
                        </h4>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      <FaPlay className="text-gray-400 dark:text-gray-500 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}