import React from 'react'
import { FancyBackground } from '@/components/ui/fancy-background'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <FancyBackground>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-6">Snippet Not Found</h2>
          <p className="text-white/80 mb-8">
            The snippet you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/">
            <Button className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg">
              <Home className="mr-2" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </FancyBackground>
  )
} 