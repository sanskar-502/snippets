import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


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

export async function GET() {
  try {
    
    const users = await prisma.user.findMany({
      where: {
        userCode: null
      }
    });

    
    let updatedCount = 0;
    const assignedCodes = new Set<string>();
    
    for (const user of users) {
      let userCode: string;
      
      
      do {
        userCode = await generateUserCode();
      } while (assignedCodes.has(userCode));
      
      
      assignedCodes.add(userCode);
      
      await prisma.user.update({
        where: { id: user.id },
        data: { userCode }
      });
      updatedCount++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Generated unique user codes for ${updatedCount} users.` 
    });
  } catch (error) {
    console.error("Error generating user codes:", error);
    return NextResponse.json(
      { success: false, message: "Failed to generate user codes" },
      { status: 500 }
    );
  }
} 