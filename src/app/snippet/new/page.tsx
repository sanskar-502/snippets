"use client"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import * as actions from "@/actions"
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewSnippetPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateSnippet = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await actions.createSnippet({message: ""}, formData);
        
        if (result?.success) {
          toast.success(result.message);
          
          setTimeout(() => {
            router.push("/");
          }, 1000);
        } else if (result?.message) {
          toast.error(result.message);
        }
      } catch (error: unknown) {
        console.error('Error creating snippet:', error);
        toast.error("Failed to create snippet");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">New Snippet</h1>

      <form action={handleCreateSnippet} className="space-y-6 backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
       
        <div className="space-y-2">
          <Label htmlFor="title" className="font-medium text-white">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Quick Sort in C++"
            required
            className="bg-white/30 border-0 text-white placeholder:text-white/70 focus-visible:ring-white/30"
          />
        </div>

       
        <div className="space-y-2">
          <Label htmlFor="code" className="font-medium text-white">
            Code
          </Label>
          <Textarea
            id="code"
            name="code"
            rows={12}
            placeholder="// Paste or write your code here"
            className="font-mono bg-white/20 border-0 text-white placeholder:text-white/70 focus-visible:ring-white/30"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="isPublic" name="isPublic" />
          <Label htmlFor="isPublic" className="text-white">
            Make this snippet public
          </Label>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="w-32 bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewSnippetPage;
