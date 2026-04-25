import { auth } from '@/lib/auth'

export default auth((req) => {
  const isAuth = !!req.auth
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isChatRoute = req.nextUrl.pathname.startsWith('/chat')

  if (isAdminRoute && (!isAuth || req.auth?.user?.role !== 'admin')) {
    return Response.redirect(new URL('/api/auth/signin', req.nextUrl))
  }

  if (isChatRoute && !isAuth) {
    return Response.redirect(new URL('/api/auth/signin', req.nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}