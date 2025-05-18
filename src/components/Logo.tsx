import React from 'react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg shadow-lg relative overflow-hidden">
        {/* Shine overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-white relative z-10 drop-shadow-md"
        >
       
          <path d="M7.5 6H6.5a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5h1" />
          <path d="M16.5 6h1a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-1" />
          
          
          <path d="M12 11l1.5-1v4L12 13" />
          <path d="M10.5 10l-1.5 1.5 1.5 1.5" />
          
         
          <path 
            d="M12 7a2 2 0 1 0 2.5 2.5 2 2 0 1 0 2.5-2.5 2.5 2.5 0 0 0-2.5-1 2.5 2.5 0 0 0-2.5 1z" 
            fill="#FF3E88" 
            stroke="white" 
            strokeWidth="1.5" 
          />
        </svg>
        
      
        <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-70" />
        <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-white rounded-full opacity-60" />
      </div>
      <span className="font-bold text-xl">LovelySnips</span>
    </Link>
  );
} 