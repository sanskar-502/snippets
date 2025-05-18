'use client';
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { Logo } from "@/components/Logo";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (error) {
      toast.error(
        error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : "An error occurred during login"
      );
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return toast.error("Email and password are required");
    }

    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false
        });

        if (result?.error) {
          toast.error(
            result.error === "CredentialsSignin" 
              ? "Invalid email or password" 
              : "An error occurred during login"
          );
          return;
        }

        toast.success("Successfully logged in!");
        
        
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch {
        toast.error("An unexpected error occurred");
      }
    });
  };

  return (
    <div className="px-4 mx-auto space-y-6">
      <div className="flex items-center">
        <Logo />
      </div>
      
      <div className="max-w-md mx-auto space-y-6 bg-white/20 backdrop-blur-sm p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                <Mail size={18} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full pl-10 pr-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                <Lock size={18} />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full pl-10 pr-3 py-2 border border-white/30 rounded-md bg-white/10 text-white"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
        
        <div className="text-center text-white">
          <p>
          Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-300 hover:underline items-center justify-center gap-1 inline-flex">
              <UserPlus size={16} />
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 