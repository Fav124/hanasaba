import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import { supabase } from './supabase'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      // Add user role from Supabase
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      session.user.role = data?.role || 'user'
      return session
    },
  },
})