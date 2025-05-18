import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSnippet } from "@/actions";

const page = async () => {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Snippets</h1>
        <Link href="/snippet/new">
          <Button className="text-sm">+ New Snippet</Button>
        </Link>
      </div>

      {snippets.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No snippets available.</p>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet) => {
            const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

            return (
              <div
                key={snippet.id}
                className="flex items-center justify-between bg-white border shadow-sm rounded-lg p-4 hover:shadow-md transition"
              >
                <h2 className="text-lg font-medium text-gray-800">{snippet.title}</h2>

                <div className="flex gap-2">
                  <Link href={`/snippet/${snippet.id}`}>
                    <Button variant="outline">View</Button>
                  </Link>

                  <form action={deleteSnippetAction}>
                    <Button variant="destructive" size="sm" type="submit">
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
