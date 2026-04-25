'use client'

import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-900"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-60 h-60 bg-secondary/10 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pesan Sekarang & Nikmati{' '}
            <span className="text-secondary">Kelezatannya!</span>
          </motion.h2>

          <motion.p
            className="text-xl text-white/80 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Jangan tunggu lagi! Ayam geprek lezat siap diantar ke rumahmu.
          </motion.p>

          {/* Contact Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-1">Telepon</h3>
              <p className="text-white/80">0812-3456-7890</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-1">Lokasi</h3>
              <p className="text-white/80">Jl. Sudirman No. 123</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-white mb-1">Buka Setiap Hari</h3>
              <p className="text-white/80">10:00 - 22:00 WIB</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/order"
              className="inline-flex items-center gap-3 bg-secondary text-primary px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-xl shadow-black/20"
            >
              Pesan Sekarang
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
