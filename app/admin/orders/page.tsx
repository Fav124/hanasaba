'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Clock, XCircle, Truck, ChefHat, Box, DollarSign, User, MapPin, Phone } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

const statusOptions = [
  { value: 'pending', label: 'Menunggu', icon: Clock, color: 'bg-gray-400' },
  { value: 'confirmed', label: 'Dikonfirmasi', icon: CheckCircle, color: 'bg-blue-500' },
  { value: 'preparing', label: 'Dimasak', icon: ChefHat, color: 'bg-orange-500' },
  { value: 'packing', label: 'Dibungkus', icon: Box, color: 'bg-purple-500' },
  { value: 'delivering', label: 'Dikirim', icon: Truck, color: 'bg-emerald-500' },
  { value: 'delivered', label: 'Sampai', icon: CheckCircle, color: 'bg-green-500' },
  { value: 'cancelled', label: 'Dibatalkan', icon: XCircle, color: 'bg-red-500' },
]

export default function AdminOrdersPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [newStatus, setNewStatus] = useState('')
  const [newPaymentStatus, setNewPaymentStatus] = useState('')
  const [notes, setNotes] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (session?.user?.role !== 'admin' && session?.user?.role !== 'moderator') {
      router.push('/')
      return
    }
    fetchOrders()
  }, [session, router])

  const fetchOrders = async () => {
    try {
      const supabase = getSupabase()
      if (!supabase) return

      const { data } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async () => {
    if (!selectedOrder || !newStatus) return

    setUpdating(true)
    try {
      const supabase = getSupabase()
      if (!supabase) return

      // Update order status
      await supabase
        .from('orders')
        .update({
          status: newStatus,
          payment_status: newPaymentStatus || selectedOrder.payment_status
        } as any)
        .eq('id', selectedOrder.id) as any

      // Add to status history
      await supabase
        .from('order_status_history')
        .insert({
          order_id: selectedOrder.id,
          status: newStatus,
          notes: notes || `Status diubah ke ${newStatus}`
        } as any)

      alert('Status berhasil diupdate!')
      setSelectedOrder(null)
      setNewStatus('')
      setNewPaymentStatus('')
      setNotes('')
      fetchOrders()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Gagal update status')
    } finally {
      setUpdating(false)
    }
  }

  const handleMarkAsLate = async (order: any) => {
    if (!confirm('Tandai pesanan ini sebagai terlambat (gratis)?')) return

    try {
      const supabase = getSupabase()
      if (!supabase) return

      await supabase
        .from('orders')
        .update({
          is_late: true,
          is_free: true
        } as any)
        .eq('id', order.id) as any

      alert('Pesanan ditandai sebagai terlambat dan gratis!')
      fetchOrders()
    } catch (error) {
      console.error('Error marking as late:', error)
      alert('Gagal update pesanan')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Kelola Pesanan</h1>
          <p className="text-gray-600">Kelola semua pesanan dan update status</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <p className="text-gray-600">Tidak ada pesanan</p>
              </div>
            ) : (
              orders.map((order) => {
                const statusOption = statusOptions.find(s => s.value === order.status)
                const StatusIcon = statusOption?.icon || Clock

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all ${
                      selectedOrder?.id === order.id ? 'ring-2 ring-primary' : 'hover:shadow-xl'
                    }`}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900">Pesanan #{order.id}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.payment_status === 'paid' ? 'Lunas' : 'Belum Lunas'}
                        </span>
                        {order.is_free && (
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                            Gratis
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{order.customer_name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{order.customer_phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 col-span-2">
                        <MapPin className="w-4 h-4" />
                        <span>{order.customer_address}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Item:</p>
                      <p className="font-medium text-gray-900">{order.items}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${statusOption?.color || 'bg-gray-400'} flex items-center justify-center`}>
                          <StatusIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900 capitalize">{order.status}</span>
                      </div>
                      <p className="text-xl font-bold text-primary">
                        Rp {order.total.toLocaleString()}
                      </p>
                    </div>

                    {order.estimated_delivery_time && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          Estimasi: {new Date(order.estimated_delivery_time).toLocaleString('id-ID')}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )
              })
            )}
          </motion.div>

          {/* Update Panel */}
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-4"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Update Pesanan #{selectedOrder.id}</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Pesanan
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Pilih status</option>
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status Pembayaran
                  </label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Pilih status pembayaran</option>
                    <option value="pending">Belum Lunas</option>
                    <option value="paid">Lunas</option>
                    <option value="failed">Gagal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Catatan
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 resize-none"
                    rows={3}
                    placeholder="Catatan untuk update ini..."
                  />
                </div>

                <motion.button
                  onClick={handleUpdateStatus}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!newStatus || updating}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </motion.button>

                {!selectedOrder.is_late && (
                  <motion.button
                    onClick={() => handleMarkAsLate(selectedOrder)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Tandai Terlambat (Gratis)
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}