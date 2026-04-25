'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Flame, Clock, Truck } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-700 to-red-900" />
      
      {/* Animated Shapes */}
      <motion.div
        className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Flame className="w-5 h-5 text-secondary" />
              <span className="text-white text-sm font-medium">Ayam Geprek Terlezat</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Nikmati{' '}
              <span className="text-secondary">Sensasi</span>
              <br />
              Pedasnya!
            </motion.h1>

            <motion.p
              className="text-xl text-white/80 mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Ayam geprek crispy dengan sambal level 1-10 yang bisa kamu pilih. 
              Fresh, pedas, dan nikmat!
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-secondary text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105 shadow-lg shadow-secondary/30"
              >
                Lihat Menu
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-all border border-white/30"
              >
                Pesan Sekarang
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-xl">15 Min</p>
                  <p className="text-white/60 text-sm">Pelayanan Cepat</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-xl">Gratis</p>
                  <p className="text-white/60 text-sm">Delivery Area</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Food Image Placeholder with Animation */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Glowing Circle */}
              <motion.div
                className="absolute inset-0 bg-secondary/30 rounded-full blur-2xl scale-110"
                animate={{
                  scale: [1.1, 1.2, 1.1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              
              {/* Food Image */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
                  <motion.img
                    src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=600&fit=crop"
                    alt="Ayam Geprek"
                    className="w-full h-full object-cover"
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* Floating Badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-secondary text-primary px-4 py-2 rounded-full font-bold shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  BEST SELLER! 🔥
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
