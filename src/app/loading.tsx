import React from 'react'

const Loading = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-10 w-40 bg-white/20 backdrop-blur-sm rounded-md animate-pulse"></div>
        <div className="h-9 w-32 bg-white/20 backdrop-blur-sm rounded-md animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index}
            className="flex items-center justify-between backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-4"
          >
            <div className="h-6 w-48 bg-white/30 rounded-md animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-9 w-16 bg-white/30 rounded-md animate-pulse"></div>
              <div className="h-8 w-16 bg-white/30 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading 