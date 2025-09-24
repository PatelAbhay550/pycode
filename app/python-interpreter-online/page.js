import CodeEditor from '@/components/react-py'
import ThemeToggle from '@/components/ThemeToggle'
import MadeInIndiaBadge from '@/components/MadeInIndiaBadge'
import Link from 'next/link'

export default function PythonInterpreterOnline() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">PyCode</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Online Python Interpreter</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <a 
                  href="#" 
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Examples
                </a>
                <a 
                  href="#" 
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Documentation
                </a>
                <a 
                  href="#" 
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About
                </a>
              </nav>
              
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 hidden md:block"></div>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Python Interpreter Online
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Write, run, and test Python code instantly in your browser
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>No installation required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>Instant execution</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Modern interface</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editor Section */}
      <main className="py-8">
        <CodeEditor />
      </main>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Why Choose Our Python Interpreter?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fast Execution</h4>
              <p className="text-gray-600 dark:text-gray-400">Run your Python code instantly without any setup or installation.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h4>
              <p className="text-gray-600 dark:text-gray-400">Simple, clean interface that gets out of your way so you can focus on coding.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dark Mode</h4>
              <p className="text-gray-600 dark:text-gray-400">Beautiful dark and light themes to match your preference and reduce eye strain.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Built with</span>
                <span className="text-red-500">❤️</span>
                <span>using React and Next.js by <Link href="https://github.com/PatelAbhay550" className="text-blue-500 hover:underline">Abhay</Link></span>
              </div>
              <MadeInIndiaBadge />
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </a>
              <div className="flex items-center space-x-1">
                <span>Powered by</span>
                <span className="font-semibold text-gray-900 dark:text-white">react-py</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}