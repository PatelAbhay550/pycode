'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import { 
  FaHome, 
  FaBook, 
  FaTrophy, 
  FaUser, 
  FaCode,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt
} from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'

const navigationItems = [
  { name: 'Learn', href: '/learn', icon: FaBook, description: 'Interactive Python lessons' },
  { name: 'Practice', href: '/practice', icon: FaCode, description: 'Code challenges and exercises' },
  { name: 'Leaderboard', href: '/leaderboard', icon: FaTrophy, description: 'Compete with other learners' },
  { name: 'Profile', href: '/profile', icon: FaUser, description: 'Your learning progress' }
]

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, userProfile, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 lg:bg-white lg:dark:bg-gray-900 lg:border-r lg:border-gray-200 lg:dark:border-gray-700">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200 dark:border-gray-700">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                🐍
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">PyCode</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Master Python</p>
              </div>
            </Link>
          </div>

          {/* User Info or Auth Buttons */}
          {user ? (
            <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.displayName || user.email}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Level {Math.floor((userProfile?.totalXP || 0) / 100) + 1}</span>
                    <span>•</span>
                    <span>{userProfile?.totalXP || 0} XP</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <FaSignOutAlt className="mr-2 w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 space-y-2">
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
              >
                <FaSignInAlt className="mr-2 w-4 h-4" />
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-colors"
              >
                <FaUserPlus className="mr-2 w-4 h-4" />
                Sign Up Free
              </Link>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {/* Always available */}
            <Link
              href="/python-interpreter-online"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                pathname === '/python-interpreter-online'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FaCode className="mr-3 flex-shrink-0 h-5 w-5" />
              <div className="flex-1">
                <div>Code Editor</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  Free Python interpreter
                </div>
              </div>
            </Link>

            {/* Auth required items */}
            {user ? (
              <>
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
                      <div className="flex-1">
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </>
            ) : (
              <>
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  
                  return (
                    <Link
                      key={item.name}
                      href="/auth/signup"
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                      title="Sign up to access this feature"
                    >
                      <Icon className="mr-3 flex-shrink-0 h-5 w-5" />
                      <div className="flex-1">
                        <div className="flex items-center">
                          {item.name}
                          <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                            Login Required
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </>
            )}
          </nav>

          {/* Theme Toggle */}
          <div className="px-4 pb-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden">
        <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Mobile Logo and User */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  🐍
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">PyLearn</h1>
                </div>
              </Link>

              {/* User info or auth buttons */}
              <div className="flex items-center space-x-2">
                {user ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <button
                      type="button"
                      className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      {isMobileMenuOpen ? (
                        <FaTimes className="h-6 w-6" />
                      ) : (
                        <FaBars className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link
                      href="/auth/signin"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
                    >
                      Sign Up
                    </Link>
                    <button
                      type="button"
                      className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      {isMobileMenuOpen ? (
                        <FaTimes className="h-6 w-6" />
                      ) : (
                        <FaBars className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
                {user && (
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.displayName || user.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Level {Math.floor((userProfile?.totalXP || 0) / 100) + 1} • {userProfile?.totalXP || 0} XP
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Code Editor - Always available */}
                <Link
                  href="/python-interpreter-online"
                  className={`flex items-center px-4 py-2 text-base font-medium transition-colors ${
                    pathname === '/python-interpreter-online'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-500'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaCode className="mr-3 h-5 w-5" />
                  Code Editor
                </Link>

                {/* Auth-required items */}
                {user ? (
                  navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center px-4 py-2 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-r-4 border-blue-500'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    )
                  })
                ) : (
                  navigationItems.map((item) => {
                    const Icon = item.icon
                    
                    return (
                      <Link
                        key={item.name}
                        href="/auth/signup"
                        className="flex items-center px-4 py-2 text-base font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        <div className="flex items-center">
                          {item.name}
                          <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                            Login
                          </span>
                        </div>
                      </Link>
                    )
                  })
                )}

                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only for authenticated users */}
      {user && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50">
          <div className="grid grid-cols-4 gap-0">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}