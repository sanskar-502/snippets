"use client";

import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { deleteSnippet } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DeleteSnippetButtonProps = {
  snippetId: number;
  className?: string;
};

const DeleteSnippetButton = ({ snippetId, className }: DeleteSnippetButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteSnippet(snippetId);
        toast.success("Snippet deleted successfully!");
        router.push("/");
      } catch {
        toast.error("Failed to delete snippet");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={isPending}
      className={`bg-red-500/70 hover:bg-red-500/90 border-0 !border-none shadow-lg ${className || ""}`}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteSnippetButton; 