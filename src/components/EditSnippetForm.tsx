"use client";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { Button } from "./ui/button";
import { saveSnippet } from "@/actions";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "sql", label: "SQL" },
  { value: "shell", label: "Shell" },
];

const EditSnippetForm = ({ snippet }: { snippet: Snippet }) => {
  const [title, setTitle] = useState(snippet.title);
  const [code, setCode] = useState(snippet.code);
  const [isPublic, setIsPublic] = useState(snippet.isPublic);
  const [language, setLanguage] = useState("markdown");

  const changeCodeHandler = (value: string = "") => {
    setCode(value);
  };

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const togglePublicHandler = () => {
    setIsPublic(!isPublic);
  };

  const changeLanguageHandler = (value: string) => {
    setLanguage(value);
  };

  const saveSnippetAction = saveSnippet.bind(null, snippet.id, title, code, isPublic, language);

  return (
    <div className="flex flex-col gap-6">
      <form className="flex flex-col gap-4" action={saveSnippetAction}>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={changeTitleHandler}
            className="bg-white/30 border-0 rounded px-3 py-2 text-lg font-semibold flex-grow mr-4 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="Snippet Title"
            aria-label="Snippet Title"
          />
          <Button type="submit" className="bg-white/30 text-white hover:bg-white/40 border-0 !border-none shadow-lg">Save</Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isPublic" 
              checked={isPublic} 
              onCheckedChange={togglePublicHandler} 
            />
            <Label htmlFor="isPublic" className="text-white">
              {isPublic ? "Public" : "Private"} snippet
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="language" className="text-white">
              Language:
            </Label>
            <Select value={language} onValueChange={changeLanguageHandler}>
              <SelectTrigger id="language" className="w-[180px] bg-white/30 text-white border-0">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>

      <div className="rounded-lg overflow-hidden shadow-lg">
        <Editor
          height="70vh"
          width="100%"
          theme="vs-dark"
          language={language}
          defaultValue={code}
          onChange={changeCodeHandler}
          options={{ 
            fontSize: 16,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            roundedSelection: true,
            padding: { top: 16, bottom: 16 }
          }}
        />
      </div>
    </div>
  );
};

export default EditSnippetForm;
