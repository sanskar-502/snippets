import { prisma } from "@/lib/prisma";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import CopyButton from "@/components/CopyButton";
import DeleteSnippetButton from "@/components/DeleteSnippetButton";
import { auth } from "@/lib/auth";
import BackButton from "@/components/BackButton";
import { getUserCodeFromCookies } from "@/lib/cookies";

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {

  const resolvedParams = await Promise.resolve(params);
  
  if (!resolvedParams.id) {
    notFound();
  }
  
  const id = Number(resolvedParams.id);
  
  if (isNaN(id)) {
    notFound();
  }

  await new Promise((r)=> setTimeout(r,700));

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    notFound();
  }

  const session = await auth();
  const isLoggedIn = !!session?.user;
  
  
  const userCode = await getUserCodeFromCookies();
  const isUserCodeAccess = !isLoggedIn && userCode;

  return (
    <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white drop-shadow-md truncate">{snippet.title}</h1>
          {snippet.isPublic ? (
            <span className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded-full">Public</span>
          ) : (
            <span className="text-xs text-yellow-300 bg-yellow-900/30 px-2 py-1 rounded-full">Private</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isUserCodeAccess && (
            <BackButton />
          )}
          
          <Link href="/">
            <Button variant="default" size="sm" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg">
              Home
            </Button>
          </Link>
          
          {isLoggedIn && (
            <Link href={`/snippet/${id}/edit`}>
              <Button size="sm" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg">Edit</Button>
            </Link>
          )}

          <CopyButton textToCopy={snippet.code} />
          
          {isLoggedIn && (
            <DeleteSnippetButton snippetId={snippet.id} />
          )}
        </div>
      </div>

      <pre className="overflow-x-auto p-6 bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-inner text-sm font-mono whitespace-pre-wrap text-white border border-slate-700/50">
        <code className="block leading-relaxed">{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
