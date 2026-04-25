'use client'

import { motion } from 'framer-motion'
import { Quote, Star, User } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    role: 'Food Blogger',
    content: 'Ayam gepreknya enak banget! Crispy di luar, juicy di dalam. Sambalnya pedasnya pas, nggak cuma pedes doang tapi ada rasa gurihnya.',
    rating: 5,
    avatar: 'B',
  },
  {
    id: 2,
    name: 'Siti Aminah',
    role: 'Pelanggan Setia',
    content: 'Sudah 3 bulan langganan di Hanasaba. Porsinya pas, harganya terjangkau, dan pelayanannya cepat. Recommended!',
    rating: 5,
    avatar: 'S',
  },
  {
    id: 3,
    name: 'Ahmad Rizki',
    role: 'Mahasiswa',
    content: 'Paket Family-nya worth it banget buat makan rame-rame sama temen. Delivery-nya juga cepat, datang masih anget.',
    rating: 4,
    avatar: 'A',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Quote className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-medium">Testimoni</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Apa Kata <span className="text-secondary">Pelanggan</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Lihat apa yang dikatakan pelanggan setia kami
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
                {/* Quote Icon */}
                <div className="absolute -top-4 left-8 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-secondary fill-secondary'
                          : 'text-gray-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-200 mb-6 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-red-700 rounded-full flex items-center justify-center font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
