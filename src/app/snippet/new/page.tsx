import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const page = () => {
  async function createSnippet(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const code  = formData.get("code")  as string;

    await prisma.snippet.create({ data: { title, code } });
    redirect("/");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">New Snippet</h1>

      <form action={createSnippet} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="font-medium text-gray-700">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g. Quick Sort in C++"
            required
          />
        </div>

        {/* Code */}
        <div className="space-y-2">
          <Label htmlFor="code" className="font-medium text-gray-700">
            Code
          </Label>
          <Textarea
            id="code"
            name="code"
            rows={12}
            placeholder="// Paste or write your code here"
            className="font-mono"
            required
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-32">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default page;
