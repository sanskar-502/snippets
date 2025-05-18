import EditSnippetForm from '@/components/EditSnippetForm'
import { prisma } from '@/lib/prisma';
import React from 'react'

const EditPageSnippet = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id);

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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Edit Snippet</h1>
      <div className="backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
        <EditSnippetForm snippet={snippet} />
      </div>
    </div>
  );
};

export default EditPageSnippet;
