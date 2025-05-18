"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import { hash } from "bcrypt";
import { auth } from "@/lib/auth";

export const saveSnippet = async(id:number, title:string, code: string, isPublic: boolean, language: string = "cpp") =>{
    await prisma.snippet.update({
        where:{
            id
        },
        data:{
            title,
            code,
            isPublic,
            language
        }
    });
    
    redirect(`/snippet/${id}`);
}


export const deleteSnippet = async (id: number) =>{
    await prisma.snippet.delete({
        where:{id}
    });
    
}


export async function createSnippet(prevState : {message: string}, formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  const title = formData.get("title") as string;
  const code  = formData.get("code")  as string;
  const isPublic = formData.get("isPublic") === "on";
  const language = formData.get("language") as string || "cpp";

  if(!title){
      return {message : "Title is required"}
  }

  if(!code){
      return {message: "Code is required"}
  }
  
  await prisma.snippet.create({ 
    data: { 
      title, 
      code, 
      isPublic,
      language,
      userId 
    } 
  });

  return { success: true, message: "Snippet created successfully" };
}


async function generateUserCode(attempts = 0): Promise<string> {
  
  if (attempts > 50) {
    throw new Error("Failed to generate a unique user code after 50 attempts");
  }
  
  
  const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
  
  
  const existingUser = await prisma.user.findFirst({
    where: {
    
      userCode: randomCode
    }
  });

  
  if (existingUser) {
    return generateUserCode(attempts + 1);
  }

  return randomCode;
}

export async function registerUser(formData: FormData): Promise<{ success: boolean; message: string }> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, message: "Email already in use" };
  }

  try {
    const hashedPassword = await hash(password, 10);
    const userCode = await generateUserCode();

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        userCode
      },
    });
    
    return { success: true, message: "Registration successful! Please log in." };
  } catch (error) {
    console.error("Error during registration:", error);
    return { success: false, message: "An error occurred during registration" };
  }
}

export async function generateAccessCode(): Promise<{ code: string }> {
  
  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  
  const existingCode = await prisma.accessCode.findUnique({
    where: { code: randomCode }
  });

  
  if (existingCode) {
    return generateAccessCode();
  }

  
  const accessCode = await prisma.accessCode.create({
    data: {
      code: randomCode,
      
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      active: true
    }
  });

  return { code: accessCode.code };
}


export async function validateAccessCode(formData: FormData): Promise<{ valid: boolean; message: string }> {
  const code = formData.get("code") as string;

  if (!code) {
    return { valid: false, message: "Access code is required" };
  }

  const accessCode = await prisma.accessCode.findUnique({
    where: { code }
  });

  if (!accessCode) {
    return { valid: false, message: "Invalid access code" };
  }

  if (!accessCode.active) {
    return { valid: false, message: "This access code is no longer active" };
  }

  if (accessCode.expiresAt && accessCode.expiresAt < new Date()) {
    
    await prisma.accessCode.update({
      where: { id: accessCode.id },
      data: { active: false }
    });
    return { valid: false, message: "This access code has expired" };
  }


  
  return { valid: true, message: "Access code validated successfully" };
}


export async function resetUserCode(): Promise<{ success: boolean; message: string; newCode?: string }> {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
      return { success: false, message: "You must be logged in to reset your code" };
    }
    
    const newCode = await generateUserCode();
    
    await prisma.user.update({
      where: { id: userId },
      data: { 
    
        userCode: newCode 
      }
    });
    
    return { 
      success: true, 
      message: "Your user code has been reset successfully",
      newCode
    };
  } catch (error) {
    console.error("Error resetting user code:", error);
    return { success: false, message: "Failed to reset user code" };
  }
}