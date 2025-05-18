'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { validateAccessCode } from '@/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';

const AccessPage = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error('Please enter an access code');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('code', code);
      
      const result = await validateAccessCode(formData);
      
      if (result.valid) {
        
        document.cookie = `access_code=${code}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
        
        toast.success(result.message);
        router.push('/');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred while validating the access code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Enter Access Code</h1>
      
      <Card className="backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="code" className="text-white">
              Access Code
            </Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your 6-digit access code"
              className="bg-white/30 border-0 text-white placeholder:text-white/70 focus-visible:ring-white/30"
              maxLength={6}
              pattern="\d{6}"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg"
          >
            {loading ? 'Validating...' : 'Submit'}
          </Button>
          
          <p className="text-sm text-white/70 text-center">
            Enter the access code to view public snippets without logging in.
          </p>
        </form>
      </Card>
    </div>
  );
};

export default AccessPage; 