'use client'

import { useState } from 'react'

export default function ReservePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 1,
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Submit to Supabase
    alert('Reservation submitted! (Integration with Supabase pending)')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Reservasi Meja</h1>
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
          <label className="block text-gray-700 mb-2">Tanggal</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Waktu</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Tamu</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num} orang</option>
            ))}
          </select>
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
          Reservasi
        </button>
      </form>
    </div>
  )
}