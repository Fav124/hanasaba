import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
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
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Manual login with specific credentials
        if (credentials.email === 'admin@hanasaba.id' && credentials.password === 'password') {
          return {
            id: 'admin-manual',
            email: 'admin@hanasaba.id',
            name: 'Admin',
            role: 'admin',
          }
        }

        return null
      },
    }),
  ],
  adapter: getAdapter(),
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async session({ session, token }) {
      // Handle manual login - role from token
      if (session.user?.email === 'admin@hanasaba.id') {
        session.user.role = 'admin'
        return session
      }

      // Hardcoded role assignments for quick access
      const roleAssignments: Record<string, string> = {
        // Add email -> role mappings here
        // 'moderator@example.com': 'moderator',
        // 'courier@example.com': 'courier',
      }

      // Auto-assign role based on email
      if (roleAssignments[session.user?.email || '']) {
        session.user.role = roleAssignments[session.user?.email || '']
        return session
      }

      const supabase = getSupabase()
      if (supabase && token?.sub) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', token.sub)
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