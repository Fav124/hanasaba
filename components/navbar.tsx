'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Menu, X, User, LogOut, Flame } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/order', label: 'Order' },
  { href: '/reserve', label: 'Reserve' },
  { href: '/reviews', label: 'Reviews' },
]

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      className="bg-primary text-white sticky top-0 z-50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Flame className="w-6 h-6 text-primary" />
            </motion.div>
            <span className="text-2xl font-bold group-hover:text-secondary transition-colors">
              Hanasaba
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full hover:bg-white/10 transition-all hover:text-secondary"
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/chat"
                className="px-4 py-2 rounded-full hover:bg-white/10 transition-all hover:text-secondary"
              >
                Chat
              </Link>
            )}
            {session?.user?.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-full bg-secondary text-primary font-semibold hover:bg-yellow-400 transition-all"
              >
                Admin
              </Link>
            )}

            {/* Auth Button */}
            {session ? (
              <motion.button
                onClick={() => signOut()}
                className="ml-2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">Logout</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={() => signIn('google')}
                className="ml-2 flex items-center gap-2 px-6 py-2 rounded-full bg-secondary text-primary font-semibold hover:bg-yellow-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4" />
                Login
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: mobileMenuOpen ? 'auto' : 0, opacity: mobileMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/chat"
                className="block px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chat
              </Link>
            )}
            {session?.user?.role === 'admin' && (
              <Link
                href="/admin"
                className="block px-4 py-2 rounded-lg bg-secondary text-primary font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {session ? (
              <button
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button
                onClick={() => { signIn('google'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 rounded-lg bg-secondary text-primary font-semibold flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Login
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}