import { cookies } from "next/headers";

export async function getAccessCodeFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const accessCodeCookie = cookieStore.get('access_code');
    return accessCodeCookie?.value || null;
  } catch (error) {
    console.error("Error getting access code from cookies:", error);
    return null;
  }
}

export async function getUserCodeFromCookies(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const userCodeCookie = cookieStore.get('user_code');
    return userCodeCookie?.value || null;
  } catch (error) {
    console.error("Error getting user code from cookies:", error);
    return null;
  }
} 