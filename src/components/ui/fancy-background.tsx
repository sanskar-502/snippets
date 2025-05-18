import React from 'react';

interface FancyBackgroundProps {
  children: React.ReactNode;
}

export function FancyBackground({ children }: FancyBackgroundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-fixed overflow-hidden relative">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white bg-[length:20px_20px]" />
      
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-[10%] w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-[15%] w-40 h-40 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-[20%] w-36 h-36 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-[10%] w-28 h-28 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 