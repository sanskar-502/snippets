import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSnippet } from "@/actions";

const page = async () => {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">Snippets</h1>
        <Link href="/snippet/new">
          <Button className="text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white shadow-lg border-0 !border-none">+ New Snippet</Button>
        </Link>
      </div>

      {snippets.length === 0 ? (
        <p className="text-white/80 text-center mt-10 backdrop-blur-sm p-6 rounded-lg bg-white/10 shadow-lg">No snippets available.</p>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => {
            const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

            return (
              <div
                key={snippet.id}
                className="flex items-center justify-between backdrop-blur-sm bg-white/20 shadow-lg rounded-lg p-4 hover:bg-white/30 transition"
              >
                <h2 className="text-lg font-medium text-white">{snippet.title}</h2>

                <div className="flex gap-2">
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button variant="outline" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none">View</Button>
                  </Link>

                  <form action={deleteSnippetAction}>
                    <Button variant="destructive" size="sm" type="submit" className="bg-red-500/70 hover:bg-red-500/90 border-0 !border-none">
                      Delete
                    </Button>
                  </form>
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
