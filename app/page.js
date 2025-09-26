'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCode, FaPlay, FaRocket, FaUsers, FaCertificate, FaTrophy, FaArrowRight, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'
import StructuredData from '@/components/StructuredData'
import { useEffect, useState } from 'react'

const features = [
  {
    icon: FaCode,
    title: 'Interactive Coding',
    description: 'Write and run Python code directly in your browser with instant feedback and results.'
  },
  {
    icon: FaRocket,
    title: 'Structured Learning',
    description: 'Progress through carefully crafted lessons from basic syntax to advanced concepts.'
  },
  {
    icon: FaTrophy,
    title: 'Gamified Experience',
    description: 'Earn XP, maintain streaks, and unlock achievements as you master Python programming.'
  },
  {
    icon: FaCertificate,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics and completion tracking.'
  }
]

const stats = [
  { number: '10,000+', label: 'Students Learning' },
  { number: '500+', label: 'Interactive Exercises' },
  { number: '50+', label: 'Comprehensive Lessons' },
  { number: '95%', label: 'Success Rate' }
]

export default function HomePage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Master
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Python </span>
                Programming
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Learn Python through interactive exercises, real-world projects, and gamified challenges. 
                Perfect for beginners and experienced developers alike.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                href={user ? "/learn" : "/auth/signup"}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {user ? "Continue Learning" : "Start Learning Free"}
                <FaRocket className="ml-2 w-4 h-4" />
              </Link>
              
              <Link 
                href="/python-interpreter-online"
                className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-xl transition-all duration-200"
              >
                Try Free Editor
                <FaPlay className="ml-2 w-4 h-4" />
              </Link>
            </div>
            </motion.div>

            {/* Code Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                <div className="bg-gray-800 px-6 py-3 flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm">hello_world.py</span>
                </div>
                <div className="p-6">
                  <pre className="text-left text-sm">
                    <code className="text-gray-300">
                      <span className="text-purple-400">def</span> <span className="text-blue-400">greet</span>(<span className="text-orange-400">name</span>):{'\n'}
                      {'    '}<span className="text-purple-400">return</span> <span className="text-green-400">f"Hello, {'{name}'}!"</span>{'\n'}
                      {'\n'}
                      <span className="text-gray-500"># Let's try it!</span>{'\n'}
                      <span className="text-blue-400">print</span>(<span className="text-blue-400">greet</span>(<span className="text-green-400">"World"</span>))
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <FaChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the most effective way to learn Python with our interactive, 
              gamified approach that keeps you engaged and motivated.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join Thousands of Successful Learners
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Our proven method has helped students worldwide achieve their Python programming goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Your Python Journey?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join our community of learners and start building amazing things with Python today. 
              It's completely free to get started!
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/auth/signup"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Create Free Account
                  <FaUsers className="ml-2 w-4 h-4" />
                </Link>
                
                <Link 
                  href="/python-interpreter-online"
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-xl transition-all duration-200"
                >
                  Try Free Editor
                  <FaPlay className="ml-2 w-4 h-4" />
                </Link>
              </div>
            )}
            
            {user && (
              <Link 
                href="/learn"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Continue Your Learning Journey
                <FaArrowRight className="ml-2 w-4 h-4" />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Made in India Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-2">
          <span className="text-2xl">🇮🇳</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Made in India</span>
        </div>
      </div>
          </div>
        </>
      )
    }
  