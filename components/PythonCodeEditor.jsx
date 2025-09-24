'use client'

export default function PythonCodeEditor({ 
  input, 
  setInput, 
  onRun, 
  isLoading, 
  isRunning 
}) {
  return (
    <div className="flex flex-col">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        {/* Editor Header */}
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Python Code</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Python 3.11</span>
          </div>
        </div>

        {/* Editor Content */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Write your Python code here..."
            className="
              w-full h-80 lg:h-96 p-4 resize-none
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              font-mono text-sm leading-relaxed
              border-none outline-none
              placeholder:text-gray-400 dark:placeholder:text-gray-500
            "
            spellCheck={false}
          />
        </div>

        {/* Editor Footer with Run Button */}
        <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Lines: {input.split('\n').length}</span>
            <span>•</span>
            <span>Characters: {input.length}</span>
          </div>
          
          <button
            type="button"
            onClick={onRun}
            disabled={isLoading || isRunning || !input.trim()}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isLoading || isRunning || !input.trim()
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }
            `}
          >
            {isRunning ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Running...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Run Code</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}