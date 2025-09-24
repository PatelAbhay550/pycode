'use client'

export default function ShellOutput({ 
  stdout, 
  stderr, 
  isLoading, 
  hasOutput,
  onClear 
}) {
  const hasError = stderr && stderr.trim()

  return (
    <div className="flex flex-col">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden h-full">
        {/* Shell Header */}
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Shell Output</span>
          </div>
          {hasOutput && (
            <button
              onClick={onClear}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Shell Content */}
        <div className="h-80 lg:h-96 overflow-auto">
          {hasOutput ? (
            <div className="p-4 space-y-4">
              {/* Success Output */}
              {stdout && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">Output</span>
                  </div>
                  <pre className="font-mono text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap leading-relaxed p-3 rounded">
                    {stdout}
                  </pre>
                </div>
              )}

              {/* Error Output */}
              {hasError && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">Error</span>
                  </div>
                  <pre className="font-mono text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap leading-relaxed bg-red-50 dark:bg-red-900/20 p-3 rounded border-l-4 border-red-500">
                    {stderr}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 9l3 3-3 3m5 0h3"/>
                </svg>
                <p className="text-sm">
                  {isLoading ? 'Initializing Python environment...' : 'Run your code to see output here'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}