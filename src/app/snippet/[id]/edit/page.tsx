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
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-semibold text-red-600">Snippet Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Snippet</h1>
      <EditSnippetForm snippet={snippet} />
    </div>
  );
};

export default EditPageSnippet;
