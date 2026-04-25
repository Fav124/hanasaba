'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Phone, User, MapPin, Send, CheckCircle } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

export default function ReservePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const supabase = getSupabase()
      if (!supabase) {
        alert('Supabase tidak terkonfigurasi')
        setIsSubmitting(false)
        return
      }

      const { data, error } = await supabase
        .from('reservations')
        .insert({
          customer_name: formData.name,
          customer_phone: formData.phone,
          reservation_date: formData.date,
          reservation_time: formData.time,
          guests: formData.guests,
          notes: formData.notes,
          status: 'pending'
        } as any)
        .select()
        .single()

      if (error) throw error

      setSubmitSuccess(true)
      setFormData({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        notes: ''
      })
      alert(`Reservasi berhasil! No. Reservasi: ${(data as any)?.id}`)
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting reservation:', error)
      alert('Gagal mengirim reservasi. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reservasi Meja</h1>
          <p className="text-gray-600">Booking meja Anda untuk pengalaman dining terbaik</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4 text-primary" />
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="Masukkan nama Anda"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone className="w-4 h-4 text-primary" />
                No. WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-gray-900 placeholder:text-gray-400"
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-primary" />
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-gray-900"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 text-primary" />
                Waktu
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-gray-900"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4 text-primary" />
              Jumlah Tamu
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({ ...formData, guests: num })}
                  className={`py-3 rounded-xl font-medium transition-all ${
                    formData.guests === num
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Catatan Tambahan (Opsional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Contoh: Request area non-smoking, high chair untuk anak"
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none text-gray-900 placeholder:text-gray-400"
              rows={3}
            />
          </div>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Reservasi berhasil dikirim!</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Memproses...'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Reservasi Sekarang
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}