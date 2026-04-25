'use client'

import { motion } from 'framer-motion'
import { Building2, Users, Award, Truck, BadgeCheck } from 'lucide-react'

const stats = [
  { icon: Users, value: '50K+', label: 'Pelanggan Puas' },
  { icon: Building2, value: '5', label: 'Cabang Aktif' },
  { icon: Truck, value: '100K+', label: 'Order Terkirim' },
  { icon: Award, value: '15+', label: 'Penghargaan' },
]

const partners = [
  { name: 'GoFood', color: 'bg-green-500' },
  { name: 'GrabFood', color: 'bg-green-600' },
  { name: 'ShopeeFood', color: 'bg-orange-500' },
  { name: 'Traveloka Eats', color: 'bg-blue-500' },
  { name: 'Maxim', color: 'bg-purple-500' },
]

export function Partners() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20" />

      <div className="container mx-auto px-4 relative">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <stat.icon className="w-8 h-8 text-secondary" />
              </motion.div>
              <motion.p
                className="text-4xl md:text-5xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
              <BadgeCheck className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-medium">Partner Kami</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tersedia di <span className="text-secondary">Platform</span> Favoritmu
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pesan melalui aplikasi delivery kesayanganmu
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 hover:bg-white/20 transition-all border border-white/10">
                  <div className={`w-12 h-12 ${partner.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-white font-semibold text-center">{partner.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
