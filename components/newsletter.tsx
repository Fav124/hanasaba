'use client'

import { motion } from 'framer-motion'
import { Mail, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail('')
      // TODO: Connect to newsletter API
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-red-700 to-red-800 relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-white font-medium">Jadi Yang Pertama Tahu!</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Langganan <span className="text-secondary">Newsletter</span> Kami
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Dapatkan info menu baru, promo spesial, dan diskon eksklusif langsung di inbox kamu!
            </p>

            {isSubmitted ? (
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Terima Kasih!</h3>
                <p className="text-gray-600">
                  Kamu sudah berlangganan newsletter Hanasaba. Nantikan promo menarik dari kami!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Masukkan email kamu..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="bg-secondary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-5 h-5" />
                  Langganan
                </motion.button>
              </form>
            )}

            <p className="text-white/60 text-sm mt-6">
              *Kami tidak akan mengirim spam. Unsubscribe kapan saja.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
