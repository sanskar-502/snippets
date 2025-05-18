import React from 'react'

const Loading = () => {
  return (
    <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-10 w-48 bg-white/30 rounded-md animate-pulse"></div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-20 bg-white/30 rounded-md animate-pulse"></div>
          <div className="h-9 w-20 bg-white/30 rounded-md animate-pulse"></div>
          <div className="h-9 w-20 bg-white/30 rounded-md animate-pulse"></div>
        </div>
      </div>
      
      <div className="h-64 w-full bg-white/10 rounded-lg backdrop-blur-sm shadow-inner">
        <div className="p-4 space-y-2">
          <div className="h-4 bg-white/30 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-white/30 rounded w-1/2 animate-pulse"></div>
          <div className="h-4 bg-white/30 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-white/30 rounded w-2/3 animate-pulse"></div>
          <div className="h-4 bg-white/30 rounded w-4/5 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
