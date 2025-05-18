"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  
  const handleSignOut = async () => {
    toast.success("Successfully signed out");
    
  
    await signOut({ redirect: false });
    
    
    router.push("/");
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