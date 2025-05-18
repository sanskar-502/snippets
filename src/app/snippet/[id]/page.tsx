import { prisma } from "@/lib/prisma";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteSnippet } from "@/actions";
import { notFound } from "next/navigation";

const SnippetDetailPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  await new Promise((r)=> setTimeout(r,700));

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) {
    notFound();
  }

  const deleteSnippetAction= deleteSnippet.bind(null,snippet.id);

  return (
    <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-white drop-shadow-md truncate">{snippet.title}</h1>
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="default" size="sm" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg">
              Home
            </Button>
          </Link>
          <Link href={`/snippet/${id}/edit`}>
            <Button size="sm" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg">Edit</Button>
          </Link>

          <form action={deleteSnippetAction}>
            <Button variant="destructive" size="sm" className="bg-red-500/70 hover:bg-red-500/90 border-0 !border-none shadow-lg">
              Delete
            </Button> 
          </form>
        </div>
      </div>

      <pre className="overflow-x-auto p-4 bg-white/10 backdrop-blur-sm rounded-lg shadow-inner text-sm font-mono whitespace-pre-wrap text-white/90">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
