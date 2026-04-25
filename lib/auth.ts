import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import { getSupabase } from './supabase'

const getAdapter = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !secret) {
    return undefined
  }

  return SupabaseAdapter({ url, secret })
}

// Use dummy values during build if env vars are missing
// This ensures the build succeeds while actual auth works at runtime
const googleClientId = process.env.GOOGLE_CLIENT_ID || 'dummy-client-id'
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || 'dummy-client-secret'

const authResult = NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  adapter: getAdapter(),

  callbacks: {
    async session({ session, user }) {
      // Hardcoded admin emails for quick access
      const adminEmails: string[] = [
        // Tambahkan email admin kamu di sini
        // Contoh: 'your-email@gmail.com',
      ]
      
      // Auto-assign admin role based on email
      if (adminEmails.includes(session.user?.email || '')) {
        session.user.role = 'admin'
        return session
      }
      
      const supabase = getSupabase()
      if (supabase && user?.id) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()
        session.user.role = (data as { role?: string } | null)?.role || 'user'
      } else {
        session.user.role = 'user'
      }
      return session
    },
  },
})

// Ensure exports always exist for build compatibility
const result = authResult ?? {}
export const handlers = result.handlers ?? {
  GET: () => new Response('Auth not configured', { status: 503 }),
  POST: () => new Response('Auth not configured', { status: 503 }),
}
export const auth = result.auth ?? (() => null)
export const signIn = result.signIn ?? (() => Promise.resolve())
export const signOut = result.signOut ?? (() => Promise.resolve())