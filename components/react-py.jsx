'use client'

import { useState } from 'react'
import { usePython } from 'react-py'
import PythonCodeEditor from './PythonCodeEditor'
import ShellOutput from './ShellOutput'

export default function CodeEditor() {
  const [input, setInput] = useState('# Welcome to PyCode!\n# Write your Python code here and click Run\n\nprint("Hello, World!")\nprint("🐍 Happy coding!")')

  // Use the usePython hook to run code and access both stdout and stderr
  const { runPython, stdout, stderr, isLoading, isRunning } = usePython()

  const hasOutput = stdout || stderr

  const handleRun = () => {
    runPython(input)
  }

  const handleClear = () => {
    // Clear output by running empty code (this will reset the Python environment)
    runPython('')
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6">
      {/* Status Bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            isLoading ? 'bg-yellow-400 animate-pulse' : 
            isRunning ? 'bg-blue-400 animate-pulse' : 
            'bg-green-400'
          }`}></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {isLoading ? 'Initializing Python...' : 
             isRunning ? 'Running code...' : 
             'Ready to run'}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
            <polyline points="14,2 14,8 20,8"/>
          </svg>
          <span>main.py</span>
        </div>
      </div>

      {/* Main Layout - Side by side on large screens, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Python Code Editor */}
        <PythonCodeEditor
          input={input}
          setInput={setInput}
          onRun={handleRun}
          isLoading={isLoading}
          isRunning={isRunning}
        />

        {/* Shell Output */}
        <ShellOutput
          stdout={stdout}
          stderr={stderr}
          isLoading={isLoading}
          hasOutput={hasOutput}
          onClear={handleClear}
        />
      </div>
    </div>
  )
}