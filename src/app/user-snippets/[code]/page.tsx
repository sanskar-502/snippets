import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Logo } from "@/components/Logo";

const UserSnippetsPage = async ({ params }: { params: { code: string } }) => {
 
  const resolvedParams = await Promise.resolve(params);
  
  if (!resolvedParams.code) {
    notFound();
  }
  
  const userCode = resolvedParams.code;
  
  
  if (!/^\d{4}$/.test(userCode)) {
    notFound();
  }
  
  
  const user = await prisma.user.findFirst({
    where: {
      userCode: {
        equals: userCode
      }
    }
  });

  if (!user) {
    notFound();
  }

  
  const snippets = await prisma.snippet.findMany({
    where: { 
      userId: user.id,
      isPublic: true 
    },
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex gap-2">
          <Link href="/">
            <Button className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none">Home</Button>
          </Link>
          <Link href="/user-code">
            <Button className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none">Enter Different Code</Button>
          </Link>
        </div>
      </div>

      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
        <p className="text-white">
          <span className="font-medium">{user.name || "User"}</span>&apos;s public snippets
          <span className="text-xs bg-white/10 px-2 py-1 ml-2 rounded-full">Code: {userCode}</span>
        </p>
      </div>

      {snippets.length === 0 ? (
        <div className="space-y-6">
          <div className="text-white/80 text-center mt-10 backdrop-blur-sm p-6 rounded-lg bg-white/10 shadow-lg">
            <p className="mb-2">No public snippets available.</p>
            <p className="text-sm text-white/60">
              This user hasn&apos;t shared any public snippets yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="flex items-center justify-between backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-4 hover:bg-white/30 transition"
            >
              <div>
                <h2 className="text-lg font-medium text-white">{snippet.title}</h2>
                <span className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded-full">Public</span>
              </div>

              <div className="flex gap-2">
                <Link href={`/snippet/${snippet.id}`}>
                  <Button variant="outline" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none">View</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSnippetsPage; 