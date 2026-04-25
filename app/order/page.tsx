'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ShoppingCart, User, Phone, ArrowRight, CheckCircle, Send, Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { getSupabase } from '@/lib/supabase'
import { useSession } from 'next-auth/react'

export default function OrderPage() {
  const { cart, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart()
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitSuccess(false)
    setError('')

    if (cart.length === 0) {
      setError('Keranjang kosong')
      return
    }

    try {
      const supabase = getSupabase()
      if (!supabase) {
        alert('Supabase tidak terkonfigurasi')
        return
      }

      const itemsText = cart.map(item => `${item.name} x${item.quantity}`).join(', ')

      // Calculate estimated delivery time (30 minutes from now)
      const estimatedDelivery = new Date()
      estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 30)

      const { data: orderData, error } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_address: formData.address,
          items: itemsText,
          total: cartTotal,
          status: 'pending',
          order_type: 'delivery',
          payment_status: 'pending',
          payment_method: 'internal',
          estimated_delivery_time: estimatedDelivery.toISOString(),
          notes: formData.notes,
          user_id: (session as any)?.user?.id || null
        } as any)
        .select()
        .single()

      if (error) throw error

      // Add initial status to history
      await supabase
        .from('order_status_history')
        .insert({
          order_id: (orderData as any).id,
          status: 'pending',
          notes: 'Pesanan dibuat'
        } as any)

      setSubmitSuccess(true)
      clearCart()

      // Show tracking link
      if (orderData) {
        alert(`Pesanan berhasil! No. Pesanan: ${(orderData as any).id}\nLacak pesanan di: /track?id=${(orderData as any).id}`)
      }

      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting order:', error)
      setError('Gagal mengirim pesanan')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <ShoppingCart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pesan Delivery</h1>
          <p className="text-gray-600">Nikmati hidangan lezat Hanasaba di rumah Anda</p>
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

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 text-primary" />
              Alamat Pengiriman
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none text-gray-900 placeholder:text-gray-400"
              rows={3}
              placeholder="Jalan, No. Rumah, Kecamatan, Kota"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <ShoppingCart className="w-4 h-4 text-primary" />
              Keranjang Pesanan
            </label>
            {cart.length === 0 ? (
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Keranjang kosong</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">Rp {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <p className="font-bold text-primary w-24 text-right">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Catatan Tambahan (Opsional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Contoh: Sambal dipisah, nasi tidak banyak"
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none text-gray-900 placeholder:text-gray-400"
              rows={2}
            />
          </div>

          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Pesanan berhasil dikirim!</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || cart.length === 0}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              'Memproses...'
            ) : (
              <>
                <Send className="w-5 h-5" />
                Pesan Sekarang
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}