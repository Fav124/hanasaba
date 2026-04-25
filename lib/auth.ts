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

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  adapter: getAdapter(),

  callbacks: {
    async session({ session, user }) {
      // Add user role from Supabase
      const supabase = getSupabase()
      if (supabase) {
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