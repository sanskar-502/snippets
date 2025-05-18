import { prisma } from "./prisma";

export async function validateAccessCode(code: string | null): Promise<boolean> {
  if (!code) {
    return false;
  }
  
  try {
    const validAccessCode = await prisma.accessCode.findFirst({
      where: {
        code,
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
    });
    
    return !!validAccessCode;
  } catch (error) {
    console.error("Error validating access code:", error);
    return false;
  }
} 