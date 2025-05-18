"use client";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { Button } from "./ui/button";
import { saveSnippet } from "@/actions";


const EditSnippetForm = ({ snippet }: { snippet: Snippet }) => {
  const [title, setTitle] = useState(snippet.title);
  const [code, setCode] = useState(snippet.code);

  const changeCodeHandler = (value: string = "") => {
    setCode(value);
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const saveSnippetAction = saveSnippet.bind(null, snippet.id, title, code);

  return (
    <div className="flex flex-col gap-6">
      <form className="flex items-center justify-between" action={saveSnippetAction}>
        <input
          type="text"
          value={title}
          onChange={changeTitleHandler}
          className="border border-gray-300 rounded px-3 py-2 text-lg font-semibold flex-grow mr-4"
          placeholder="Snippet Title"
          aria-label="Snippet Title"
        />
        <Button type="submit">Save</Button>
      </form>

      <Editor
        height="60vh"
        theme="light"
        defaultLanguage="cpp"
        defaultValue={code}
        onChange={changeCodeHandler}
        options={{ fontSize: 16 }}
      />
    </div>
  );
};

export default EditSnippetForm;
