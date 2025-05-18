"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { registerUser } from "@/actions";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { UserPlus, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      try {
        const result = await registerUser(formData);
        
        if (result.success) {
          toast.success(result.message);
          
          
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An unexpected error occurred during registration");
      }
    });
  };

  return (
    <div className="px-4 mx-auto space-y-6">
      <div className="flex items-center">
        <Logo />
      </div>
      
      <div className="max-w-md mx-auto space-y-6 bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Register</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            {isPending ? "Registering..." : "Register"}
          </Button>
        </form>
        
        <div className="text-center text-white">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-300 hover:underline items-center justify-center gap-1 inline-flex">
              <LogIn size={16} />
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;