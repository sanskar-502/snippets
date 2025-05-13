import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1 className="font-bold text-xl">Home</h1>
      <div className="flex item-center justify-between">
        <h1>Snippets</h1>
        <Link href={"/snippet/new"}>
          <Button>New</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
