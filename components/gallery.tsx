'use client'

import { motion } from 'framer-motion'
import { Camera, Image as ImageIcon } from 'lucide-react'
import { useState } from 'react'

const galleryItems = [
  { id: 1, title: 'Ayam Geprek Original', category: 'Makanan' },
  { id: 2, title: 'Paket Family', category: 'Paket' },
  { id: 3, title: 'Suasana Restoran', category: 'Tempat' },
  { id: 4, title: 'Ayam Geprek Keju', category: 'Makanan' },
  { id: 5, title: 'Tim Kami', category: 'Behind the Scene' },
  { id: 6, title: 'Menu Baru', category: 'Makanan' },
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Semua')

  const filteredItems = selectedCategory === 'Semua'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory)

  const categories = ['Semua', 'Makanan', 'Paket', 'Tempat', 'Behind the Scene']

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Camera className="w-4 h-4" />
            <span className="font-medium">Galeri</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-primary">Momen</span> di Hanasaba
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Lihat berbagai momen dan hidangan lezat dari Hanasaba
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              {/* Placeholder Image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">{item.title}</p>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <p className="text-secondary font-semibold text-sm">{item.category}</p>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
