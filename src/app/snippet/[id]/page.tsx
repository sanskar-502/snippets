import { prisma } from "@/lib/prisma";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteSnippet } from "@/actions";
import { notFound } from "next/navigation";

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    notFound();
  }

  const deleteSnippetAction= deleteSnippet.bind(null,snippet.id);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 truncate">{snippet.title}</h1>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="default" size="sm">
              Home
            </Button>
          </Link>
          <Link href={`/snippet/${id}/edit`}>
            <Button size="sm">Edit</Button>
          </Link>

          <form action={deleteSnippetAction}>
            <Button variant="destructive" size="sm">
            Delete
          </Button> 
          </form>
          
        </div>
      </div>

      <pre className="overflow-x-auto p-4 bg-gray-100 rounded-lg border border-gray-300 text-sm font-mono whitespace-pre-wrap">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
