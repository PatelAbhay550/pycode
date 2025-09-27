"use client"

import { useState, useEffect, useRef } from "react"

export default function ShellOutput({ stdout, stderr, onSendInput, requestInput }) {
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [showInput, setShowInput] = useState(false)
  const outputRef = useRef(null)

  // Auto-scroll when stdout/stderr changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }

    // Show input if requested
    if (requestInput) {
      setShowInput(true)
    }
  }, [stdout, stderr, requestInput])

  // Handle ↑ and ↓ for command history
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCommand(history[newIndex])
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1 || historyIndex === history.length - 1
            ? -1
            : historyIndex + 1
        setHistoryIndex(newIndex)
        setCommand(newIndex === -1 ? "" : history[newIndex])
      }
    }
  }

  // Handle input submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (command.trim()) {
      onSendInput(command + "\n") // Send to Python runtime
      setHistory([...history, command])
      setHistoryIndex(-1)
      setCommand("")
      setShowInput(false) // Hide input after submission
    }
  }

  return (
    <div className="w-full h-[500px] bg-gray-900 text-white rounded-lg shadow-md flex flex-col font-mono text-sm">
      {/* Output window */}
      <div
        ref={outputRef}
        className="p-4 space-y-4 flex-1 overflow-y-auto"
      >
        {/* Stdout */}
        {stdout && (
          <pre className="whitespace-pre-wrap text-green-400">{stdout}</pre>
        )}

        {/* Stderr */}
        {stderr && (
          <pre className="whitespace-pre-wrap text-red-400 border-l-2 border-red-500 pl-2">
            {stderr}
          </pre>
        )}

        {/* Inline input */}
        {showInput && (
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-green-400 mr-2">>>> </span>
            <input
              autoFocus
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent text-gray-200 flex-1 focus:outline-none"
              placeholder="Type input..."
            />
          </form>
        )}
      </div>
    </div>
  )
}
