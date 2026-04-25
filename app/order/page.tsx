'use client'

import { useState } from 'react'

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    items: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to Supabase
    alert('Order submitted! (Integration with Supabase pending)')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Pesan Delivery</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">No. HP</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Alamat</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pesanan</label>
          <textarea
            name="items"
            value={formData.items}
            onChange={handleChange}
            placeholder="Contoh: 2 Ayam Geprek Original, 1 Es Teh"
            className="w-full p-2 border rounded"
            rows={2}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Catatan</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={2}
          />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-red-700">
          Pesan Sekarang
        </button>
      </form>
    </div>
  )
}