import EditSnippetForm from '@/components/EditSnippetForm'
import { prisma } from '@/lib/prisma';
import React from 'react'
import { auth } from "@/lib/auth";
import BackButton from "@/components/BackButton";
import { getUserCodeFromCookies } from "@/lib/cookies";

const EditPageSnippet = async ({ params }: { params: { id: string } }) => {
  
  const { id: paramId } = await params;
  const id = Number(paramId);

  const snippet = await prisma.snippet.findUnique({
    where: { id }
  });

  if (!snippet) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-semibold text-white drop-shadow-md">Snippet Not Found</h1>
      </div>
    );
  }
  
  const session = await auth();
  const isLoggedIn = !!session?.user;
  
  
  const userCode = await getUserCodeFromCookies();
  const isUserCodeAccess = !isLoggedIn && userCode;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-md">Edit Snippet</h1>
        {isUserCodeAccess && <BackButton />}
      </div>
      <div className="backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
        <EditSnippetForm snippet={snippet} />
      </div>
    </div>
  );
};

export default EditPageSnippet;
