'use client'

import { motion } from 'framer-motion'
import { Flame, Clock, Award, Leaf, Truck, HeartHandshake } from 'lucide-react'

const features = [
  {
    icon: Flame,
    title: 'Sambal Pedas',
    description: 'Level pedas bisa dipilih 1-10 sesuai selera kamu',
    color: 'bg-red-500',
  },
  {
    icon: Clock,
    title: 'Cepat & Fresh',
    description: 'Ayam digoreng fresh setelah dipesan, bukan yang tersisa',
    color: 'bg-orange-500',
  },
  {
    icon: Award,
    title: 'Kualitas Terbaik',
    description: 'Bahan premium dan bumbu rahasia turun-temurun',
    color: 'bg-yellow-500',
  },
  {
    icon: Leaf,
    title: 'Bahan Segar',
    description: 'Ayam dan bahan lainnya selalu fresh setiap hari',
    color: 'bg-green-500',
  },
  {
    icon: Truck,
    title: 'Delivery Cepat',
    description: 'Pesanan diantar dalam 30 menit atau gratis',
    color: 'bg-blue-500',
  },
  {
    icon: HeartHandshake,
    title: 'Pelayanan Ramah',
    description: 'Customer service siap membantu 24/7',
    color: 'bg-purple-500',
  },
]

export function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kenapa Pilih <span className="text-primary">Hanasaba</span>?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kami berkomitmen memberikan pengalaman makan ayam geprek terbaik
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-1 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
