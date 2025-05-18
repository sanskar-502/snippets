import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";
import ResetUserCode from "@/components/ResetUserCode";
import CopyUserCode from "@/components/CopyUserCode";
import { Logo } from "@/components/Logo";
import { Role } from "@prisma/client";
import DeleteSnippetButton from "@/components/DeleteSnippetButton";


type UserWithCode = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  userCode: string | null;
  role: Role;
};

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  const isAdmin = session?.user?.role === "ADMIN";
  

  let user: UserWithCode | null = null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: { id: userId }
    }) as UserWithCode | null;
  }
  
 
  const snippets = await prisma.snippet.findMany({
    where: userId ? { userId } : { id: { equals: -1 } }, 
    orderBy: {
      id: 'desc',
    },
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex gap-2">
          {session ? (
            <>
              <Link href="/snippet/new">
                <Button className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none">+ New Snippet</Button>
              </Link>
              {isAdmin && (
                <Link href="/admin/access-code">
                  <Button className="text-sm bg-purple-500/50 backdrop-blur-sm hover:bg-purple-500/70 text-white shadow-lg border-0 !border-none">Generate Access Code</Button>
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none">Login</Button>
              </Link>
              <Link href="/user-code">
                <Button className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none">Enter User Code</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {session?.user && (
        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg">
          <p className="text-white">Welcome, {session.user.name || session.user.email}</p>
          {user?.userCode && (
            <div className="mt-2 p-2 bg-white/10 rounded-lg">
              <div className="flex items-center">
                <p className="text-sm text-white/80">Your user code: <span className="font-mono font-bold">{user.userCode}</span></p>
                <CopyUserCode code={user.userCode} />
              </div>
              <p className="text-xs text-white/60 mt-1">Share this code with others to let them view your public snippets</p>
              <ResetUserCode />
            </div>
          )}
        </div>
      )}

      {snippets.length === 0 ? (
        <div className="space-y-6">
          <p className="text-white/80 text-center mt-10 backdrop-blur-sm p-6 rounded-lg bg-white/10 shadow-lg">
            {userId ? "No snippets available." : "Please log in or enter a user code to view snippets."}
          </p>
          
          {!userId && (
            <div className="backdrop-blur-sm bg-white/10 shadow-lg rounded-lg p-6 text-white space-y-4">
              <h2 className="text-2xl font-semibold text-center">Welcome to LovelySnips</h2>
              <div className="space-y-3">
                <p>LovelySnips is a secure platform for sharing code and text snippets with controlled access:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium">Private Sharing</span> - Share snippets securely with specific people</li>
                  <li><span className="font-medium">User Codes</span> - Each user gets a unique 4-digit code to share public snippets</li>
                  <li><span className="font-medium">Syntax Highlighting</span> - Support for multiple programming languages</li>
                  <li><span className="font-medium">User Accounts</span> - Create an account to manage all your snippets in one place</li>
                </ul>
                <div className="pt-2">
                  <p className="font-medium">Get started by logging in or entering a user code!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => {
            const canEdit = userId === snippet.userId;

            return (
              <div
                key={snippet.id}
                className="flex items-center justify-between backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-4 hover:bg-white/30 transition"
              >
                <div>
                  <h2 className="text-lg font-medium text-white">{snippet.title}</h2>
                  {snippet.isPublic ? (
                    <span className="text-xs text-green-300 bg-green-900/30 px-2 py-1 rounded-full">Public</span>
                  ) : (
                    <span className="text-xs text-yellow-300 bg-yellow-900/30 px-2 py-1 rounded-full">Private</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button variant="outline" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none">View</Button>
                  </Link>

                  {canEdit && <DeleteSnippetButton snippetId={snippet.id} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;
