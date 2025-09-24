'use client'

export default function MadeInIndiaBadge() {
  return (
    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-green-100 dark:from-orange-900/20 dark:to-green-900/20 px-3 py-2 rounded-lg border border-orange-200 dark:border-orange-700/50 hover:shadow-md transition-all duration-200">
      {/* Indian Flag */}
      <div className="relative w-6 h-4 rounded-sm overflow-hidden shadow-sm">
        {/* Saffron stripe */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-orange-500"></div>
        
        {/* White stripe with Chakra */}
        <div className="absolute top-1/3 left-0 w-full h-1/3 bg-white flex items-center justify-center">
          {/* Ashoka Chakra */}
          <div className="w-2 h-2 relative">
            <svg viewBox="0 0 24 24" className="w-full h-full text-blue-600" fill="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
              {/* Spokes of the wheel */}
              {Array.from({ length: 24 }, (_, i) => (
                <line
                  key={i}
                  x1="12"
                  y1="12"
                  x2={12 + 9 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={12 + 9 * Math.sin((i * 15 * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              ))}
            </svg>
          </div>
        </div>
        
        {/* Green stripe */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-green-600"></div>
      </div>
      
      {/* Badge Text */}
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 leading-tight">
          Made in
        </span>
        <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent leading-tight">
          India
        </span>
      </div>
    </div>
  )
}