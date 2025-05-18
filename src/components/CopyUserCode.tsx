"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

interface CopyUserCodeProps {
  code: string;
}

export default function CopyUserCode({ code }: CopyUserCodeProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Code copied to clipboard");
      } else {
       
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";  
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopied(true);
          toast.success("Code copied to clipboard");
        } else {
          toast.error("Failed to copy code");
        }
      }
      
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy code");
      console.error(error);
    }
  };

  return (
    <Button 
      onClick={copyToClipboard}
      variant="ghost" 
      size="sm"
      className="h-6 w-6 p-0 ml-2 text-white/70 hover:text-white hover:bg-white/10"
    >
      {copied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
    </Button>
  );
} 