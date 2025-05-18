import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {

  const response = NextResponse.next();
  
  const accessCode = request.cookies.get('access_code')?.value;
  

  if (accessCode) {
    response.headers.set('x-access-code', accessCode);
  }
  
  return response;
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 