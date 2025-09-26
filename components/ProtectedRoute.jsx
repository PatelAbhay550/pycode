'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { FaLock, FaUserPlus, FaSignInAlt } from 'react-icons/fa'
import Link from 'next/link'

export default function ProtectedRoute({ children, requireAuth = true, fallback = null }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && requireAuth && !user) {
      // Don't redirect, just show the auth required page
    }
  }, [user, loading, requireAuth, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (requireAuth && !user) {
    if (fallback) {
      return fallback
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaLock className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Authentication Required
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              You need to sign in to access this feature. Join thousands of learners mastering Python programming!
            </p>
            
            <div className="space-y-3">
              <Link
                href="/auth/signup"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                <FaUserPlus className="w-4 h-4 mr-2" />
                Create Free Account
              </Link>
              
              <Link
                href="/auth/signin"
                className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-xl transition-all duration-200"
              >
                <FaSignInAlt className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Want to try coding first?{' '}
                <Link href="/python-interpreter-online" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  Use our free code editor
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}