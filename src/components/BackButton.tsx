'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const BackButton = () => {
  return (
    <Button 
      variant="default" 
      size="sm" 
      className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg"
      onClick={() => window.history.back()}
    >
      Back
    </Button>
  );
};

export default BackButton; 