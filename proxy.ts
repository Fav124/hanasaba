import type { NextRequest } from 'next/server'

// Simple proxy without auth() wrapper to avoid Next.js 16 compatibility issues
export default function proxyHandler(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isChatRoute = req.nextUrl.pathname.startsWith('/chat')

  // Check for auth cookie/session token
  const authCookie = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')
  const isAuth = !!authCookie?.value

  if (isAdminRoute || isChatRoute) {
    if (!isAuth) {
      return Response.redirect(new URL('/api/auth/signin', req.nextUrl))
    }
  }

  // Continue to next middleware/page
  return undefined
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
