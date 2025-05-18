'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

const UserCodePage = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    
    if (!/^\d{4}$/.test(code)) {
      toast.error('Please enter a valid 4-digit code');
      return;
    }
    
    setLoading(true);
    
    try {
    
      const response = await fetch(`/api/validate-user-code?code=${code}`);
      const data = await response.json();
      
      if (!data.exists) {
        toast.error('Invalid user code. Please try again.');
        setLoading(false);
        return;
      }
      
      
      document.cookie = `user_code=${code}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
      
      toast.success('User code accepted');
      router.push(`/user-snippets/${code}`);
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="flex items-center justify-between mb-6">
        <Logo />
        <Link href="/">
          <Button variant="outline" size="sm" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none">
            Home
          </Button>
        </Link>
      </div>
      
      <Card className="backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-white">
              User Code
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              placeholder="Enter 4-digit user code"
              className="bg-white/30 border-0 text-white placeholder:text-white/70 focus-visible:ring-white/30 text-center text-2xl font-mono tracking-widest"
              maxLength={4}
              inputMode="numeric"
              required
            />
            <p className="text-xs text-white/60 text-center">
              Enter the 4-digit code shared with you
            </p>
          </div>
          
          <Button 
            type="submit" 
            disabled={loading || code.length !== 4}
            className="w-full bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg"
          >
            {loading ? 'Processing...' : 'View Public Snippets'}
          </Button>
          
          <div className="text-sm text-white/70 text-center space-y-2">
            <p>
              Each user on LovelySnips has a unique 4-digit code that allows others to view their public snippets.
            </p>
            <p>
              <Link href="/login" className="text-white hover:underline">
                Login
              </Link> to create and manage your own snippets.
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default UserCodePage; 