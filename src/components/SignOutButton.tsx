"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function SignOutButton() {
  const handleSignOut = async () => {
    toast.success("Successfully signed out");
    await signOut({ 
      callbackUrl: window.location.origin,
      redirect: true
    });
  };

  return (
    <Button 
      onClick={handleSignOut}
      className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none"
    >
      Sign Out
    </Button>
  );
} 