"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";

export const saveSnippet = async(id:number,title:string, code: string) =>{
    await prisma.snippet.update({
        where:{
            id
        },
        data:{
            title,code
        }
    });
    
    redirect(`/snippet/${id}`);
}


export const deleteSnippet = async (id: number) =>{
    await prisma.snippet.delete({
        where:{id}
    });
    redirect("/");
}