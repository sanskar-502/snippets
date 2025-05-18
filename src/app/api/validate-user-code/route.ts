import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code || !/^\d{4}$/.test(code)) {
      return NextResponse.json({ exists: false }, { status: 400 });
    }

    
    const user = await prisma.user.findFirst({
      where: {
        userCode: code
      }
    });

    return NextResponse.json({ exists: !!user });
  } catch (error) {
    console.error("Error validating user code:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 