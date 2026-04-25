'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Hanasaba
        </Link>
        <div className="flex space-x-4">
          <Link href="/menu" className="hover:text-secondary">Menu</Link>
          <Link href="/order" className="hover:text-secondary">Order</Link>
          <Link href="/reserve" className="hover:text-secondary">Reserve</Link>
          <Link href="/reviews" className="hover:text-secondary">Reviews</Link>
          {session && <Link href="/chat" className="hover:text-secondary">Chat</Link>}
          {session?.user?.role === 'admin' && <Link href="/admin" className="hover:text-secondary">Admin</Link>}
          {session ? (
            <button onClick={() => signOut()} className="hover:text-secondary">
              Logout
            </button>
          ) : (
            <button onClick={() => signIn('google')} className="hover:text-secondary">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}