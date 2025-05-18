"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { resetUserCode } from "@/actions";
import { toast } from "sonner";

export default function ResetUserCode() {
  const [loading, setLoading] = useState(false);
  const [newCode, setNewCode] = useState<string | null>(null);

  const handleResetCode = async () => {
    if (loading) return;
    
    if (!confirm("Are you sure you want to reset your user code? Anyone using your old code will no longer have access.")) {
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await resetUserCode();
      
      if (result.success && result.newCode) {
        setNewCode(result.newCode);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while resetting your code");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <Button 
        onClick={handleResetCode} 
        disabled={loading}
        variant="outline" 
        size="sm"
        className="text-xs bg-white/20 hover:bg-white/30 text-white"
      >
        {loading ? "Resetting..." : "Reset User Code"}
      </Button>
      
      {newCode && (
        <div className="mt-2 p-2 bg-green-900/30 rounded-lg animate-fade-in">
          <p className="text-sm text-green-300">Your new code: <span className="font-mono font-bold">{newCode}</span></p>
        </div>
      )}
    </div>
  );
} 