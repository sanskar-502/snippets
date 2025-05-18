'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateAccessCode } from '@/actions';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const AccessCodePage = () => {
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateCode = async () => {
    try {
      setLoading(true);
      const result = await generateAccessCode();
      setAccessCode(result.code);
      toast.success('Access code generated successfully');
    } catch (error) {
      toast.error('Failed to generate access code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (accessCode) {
      navigator.clipboard.writeText(accessCode);
      toast.success('Access code copied to clipboard');
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Generate Access Code</h1>
      
      <Card className="backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
        <div className="space-y-6">
          <p className="text-white/90">
            Generate a random access code that allows anyone to view public snippets without logging in.
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleGenerateCode} 
              disabled={loading}
              className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg"
            >
              {loading ? 'Generating...' : 'Generate New Access Code'}
            </Button>
          </div>
          
          {accessCode && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg text-center">
              <p className="text-sm text-white/70 mb-2">Access Code:</p>
              <p className="text-2xl font-mono font-bold text-white mb-4 tracking-wider">{accessCode}</p>
              <Button 
                onClick={copyToClipboard}
                variant="outline" 
                size="sm"
                className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none"
              >
                Copy to Clipboard
              </Button>
              <p className="mt-4 text-xs text-white/60">
                This code will be valid for 7 days. Share it with users who need access to public snippets.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AccessCodePage; 