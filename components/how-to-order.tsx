'use client'

import { motion } from 'framer-motion'
import { Smartphone, ShoppingCart, CreditCard, Clock, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Smartphone,
    number: '01',
    title: 'Pilih Menu',
    description: 'Buka aplikasi dan pilih menu favoritmu dari berbagai pilihan ayam geprek',
    color: 'bg-blue-500',
  },
  {
    icon: ShoppingCart,
    number: '02',
    title: 'Tambah ke Keranjang',
    description: 'Pilih level pedas dan tambahkan ke keranjang belanja',
    color: 'bg-primary',
  },
  {
    icon: CreditCard,
    number: '03',
    title: 'Pembayaran',
    description: 'Bayar dengan transfer bank, e-wallet, atau COD',
    color: 'bg-emerald-500',
  },
  {
    icon: Clock,
    number: '04',
    title: 'Tunggu & Nikmati',
    description: 'Pesanan akan diantar dalam 30 menit, langsung santap!',
    color: 'bg-amber-500',
  },
]

export function HowToOrder() {
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
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Smartphone className="w-4 h-4" />
            <span className="font-medium">Cara Pesan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gampang Banget <span className="text-primary">Order</span>!
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Cuma 4 langkah mudah, ayam geprek favoritmu sampai di depan pintu
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-500 via-primary to-amber-500 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}
                      whileHover={{ rotate: 10 }}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-secondary text-primary font-bold rounded-full flex items-center justify-center text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow (except last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-24 -right-4 transform translate-x-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
