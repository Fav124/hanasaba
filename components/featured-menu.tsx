'use client'

import { motion } from 'framer-motion'
import { Utensils, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'

const menuItems = [
  {
    id: 1,
    name: 'Ayam Geprek Original',
    description: 'Ayam crispy dengan sambal pedas pilihan level 1-5',
    price: 'Rp 25.000',
    rating: 4.8,
    tag: 'Terlaris',
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 2,
    name: 'Paket Family',
    description: '2 ayam geprek + nasi + minuman 2 porsi',
    price: 'Rp 50.000',
    rating: 4.9,
    tag: 'Hemat',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    id: 3,
    name: 'Ayam Geprek Mozzarella',
    description: 'Ayam geprek dengan keju mozzarella leleh',
    price: 'Rp 35.000',
    rating: 4.7,
    tag: 'Premium',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 4,
    name: 'Es Teh Manis',
    description: 'Minuman segar pemanis harimu',
    price: 'Rp 5.000',
    rating: 4.5,
    tag: 'Best',
    color: 'from-cyan-400 to-blue-500',
  },
]

export function FeaturedMenu() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Utensils className="w-4 h-4" />
            <span className="font-medium">Menu Unggulan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pilihan <span className="text-primary">Terfavorit</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Nikmati menu spesial kami yang dibuat dengan bahan berkualitas dan resep rahasia
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              {/* Image Placeholder with Gradient */}
              <div className={`h-48 bg-gradient-to-br ${item.color} flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Utensils className="w-12 h-12 text-white" />
                </motion.div>
                
                {/* Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {item.tag}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-secondary text-primary px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  {item.rating}
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/10 rounded-full" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {item.price}
                  </span>
                  <motion.button
                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all hover:scale-105 shadow-lg shadow-primary/30"
          >
            Lihat Semua Menu
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
