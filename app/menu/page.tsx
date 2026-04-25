'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Search, Filter, ShoppingCart, Star, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function MenuPage() {
  const { addToCart, cartCount } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = ['Semua', 'Ayam Geprek', 'Paket', 'Minuman', 'Snack']

  const menuItems = [
    { id: 1, name: 'Ayam Geprek Original', price: 25000, description: 'Ayam geprek crispy dengan sambal pedas pilihan', category: 'Ayam Geprek', image: null, rating: 4.8 },
    { id: 2, name: 'Ayam Geprek Keju', price: 30000, description: 'Ayam geprek dengan topping keju mozarella leleh', category: 'Ayam Geprek', image: null, rating: 4.9 },
    { id: 3, name: 'Ayam Geprek Mozzarella', price: 35000, description: 'Premium cheese overload', category: 'Ayam Geprek', image: null, rating: 4.7 },
    { id: 4, name: 'Paket Family', price: 50000, description: '2 ayam + 2 nasi + 2 minuman', category: 'Paket', image: null, rating: 4.6 },
    { id: 5, name: 'Es Teh Manis', price: 5000, description: 'Minuman segar', category: 'Minuman', image: null, rating: 4.5 },
    { id: 6, name: 'Es Jeruk', price: 8000, description: 'Jeruk peras asli', category: 'Minuman', image: null, rating: 4.4 },
  ]

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <UtensilsCrossed className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Menu Hanasaba</h1>
          <p className="text-gray-600">Nikmati hidangan lezat kami</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <UtensilsCrossed className="w-16 h-16 text-gray-400" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    Rp {item.price.toLocaleString()}
                  </span>
                  <motion.button
                    onClick={() => handleAddToCart(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-primary/30"
                  >
                    <Plus className="w-4 h-4" />
                    Tambah
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}