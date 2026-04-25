'use client'

import { useState } from 'react'

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Ayam Geprek Original', price: 25000, description: 'Ayam geprek dengan sambal pedas', category: 'Ayam Geprek' },
    { id: 2, name: 'Ayam Geprek Keju', price: 30000, description: 'Ayam geprek dengan topping keju', category: 'Ayam Geprek' },
  ])

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    description: '',
    category: ''
  })

  const handleAdd = () => {
    if (newItem.name && newItem.price > 0) {
      setMenuItems([...menuItems, { ...newItem, id: Date.now() }])
      setNewItem({ name: '', price: 0, description: '', category: '' })
      // TODO: Save to Supabase
    }
  }

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter(item => item.id !== id))
    // TODO: Delete from Supabase
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Menu</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Menu Baru</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nama menu"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Harga"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Kategori"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Deskripsi"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAdd}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Tambah Menu
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Menu</h2>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-primary font-bold">Rp {item.price.toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}