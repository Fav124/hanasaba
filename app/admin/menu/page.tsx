'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Image as ImageIcon,
  UtensilsCrossed,
  MoreVertical,
  ChevronDown,
  X,
} from 'lucide-react'

const categories = ['Semua', 'Ayam Geprek', 'Paket', 'Minuman', 'Snack']

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<any[]>([
    { id: 1, name: 'Ayam Geprek Original', price: 25000, description: 'Ayam geprek crispy dengan sambal pedas pilihan', category: 'Ayam Geprek', status: 'active', image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=400&fit=crop' },
    { id: 2, name: 'Ayam Geprek Keju', price: 30000, description: 'Ayam geprek dengan topping keju mozarella leleh', category: 'Ayam Geprek', status: 'active', image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=400&h=400&fit=crop' },
    { id: 3, name: 'Ayam Geprek Mozzarella', price: 35000, description: 'Premium cheese overload', category: 'Ayam Geprek', status: 'active', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop' },
    { id: 4, name: 'Paket Family', price: 50000, description: '2 ayam + 2 nasi + 2 minuman', category: 'Paket', status: 'active', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop' },
    { id: 5, name: 'Es Teh Manis', price: 5000, description: 'Minuman segar', category: 'Minuman', status: 'active', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop' },
    { id: 6, name: 'Es Jeruk', price: 8000, description: 'Jeruk peras asli', category: 'Minuman', status: 'inactive', image: 'https://images.unsplash.com/photo-1621505289979-b7ae1c8b7d33?w=400&h=400&fit=crop' },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Ayam Geprek',
    status: 'active',
    image: '' as string | null,
  })

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAdd = () => {
    if (newItem.name && newItem.price) {
      setMenuItems([...menuItems, { ...newItem, id: Date.now(), price: Number(newItem.price) }])
      setNewItem({ name: '', price: '', description: '', category: 'Ayam Geprek', status: 'active', image: null })
      setShowAddModal(false)
    }
  }

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setNewItem({ ...item, price: String(item.price) })
    setShowAddModal(true)
  }

  const handleUpdate = () => {
    if (editingItem) {
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? { ...newItem, id: item.id, price: Number(newItem.price) } : item
      ))
      setEditingItem(null)
      setNewItem({ name: '', price: '', description: '', category: 'Ayam Geprek', status: 'active', image: null })
      setShowAddModal(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kelola Menu</h1>
              <p className="text-gray-500 mt-1">Kelola semua item menu restoran</p>
            </div>
            <motion.button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-primary/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Tambah Menu
            </motion.button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-10 py-3 bg-gray-100 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 py-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Menu', value: menuItems.length, color: 'bg-blue-500' },
            { label: 'Menu Aktif', value: menuItems.filter(i => i.status === 'active').length, color: 'bg-emerald-500' },
            { label: 'Kategori', value: new Set(menuItems.map(i => i.category)).size, color: 'bg-purple-500' },
            { label: 'Rata-rata Harga', value: `Rp ${Math.round(menuItems.reduce((a, b) => a + b.price, 0) / menuItems.length || 0).toLocaleString()}`, color: 'bg-amber-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(item)}
                      className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 className="w-4 h-4 text-blue-600" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(item.id)}
                      className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </motion.button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {item.category}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-lg ${
                      item.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.status === 'active' ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-xl font-bold text-primary">
                    Rp {item.price.toLocaleString()}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                    setNewItem({ name: '', price: '', description: '', category: 'Ayam Geprek', status: 'active', image: null })
                  }}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Menu</label>
                  <input
                    type="text"
                    placeholder="Contoh: Ayam Geprek Spesial"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Harga (Rp)</label>
                    <input
                      type="number"
                      placeholder="25000"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {categories.filter(c => c !== 'Semua').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                  <textarea
                    placeholder="Deskripsi menu..."
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={newItem.image || ''}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value || null })}
                    className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-xs text-gray-500 mt-1">Masukkan URL gambar atau biarkan kosong untuk placeholder</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <div className="flex gap-4">
                    {['active', 'inactive'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setNewItem({ ...newItem, status })}
                        className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                          newItem.status === status
                            ? status === 'active'
                              ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500'
                              : 'bg-gray-100 text-gray-700 ring-2 ring-gray-500'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingItem(null)
                    setNewItem({ name: '', price: '', description: '', category: 'Ayam Geprek', status: 'active', image: null })
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={editingItem ? handleUpdate : handleAdd}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  {editingItem ? 'Simpan Perubahan' : 'Tambah Menu'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}