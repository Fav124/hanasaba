'use client'

// @ts-nocheck - Supabase type inference issues

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Calendar, User, Clock, Package, Loader2, Shield } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

export default function UserDashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<any[]>([])
  const [reservations, setReservations] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchUserData()
  }, [session, router])

  const fetchUserData = async () => {
    try {
      const supabase = getSupabase()
      if (!supabase) return

      // Fetch user's orders
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', (session as any)?.user?.id)
        .order('created_at', { ascending: false })

      setOrders(ordersData || [])

      // Fetch user's reservations
      const { data: reservationsData } = await supabase
        .from('reservations')
        .select('*')
        .eq('user_id', (session as any)?.user?.id)
        .order('reservation_date', { ascending: false })

      setReservations(reservationsData || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-6">Silakan login terlebih dahulu untuk mengakses dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Saya</h1>
              <p className="text-gray-600 mt-1">Selamat datang, {(session as any)?.user?.name || 'User'}!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Pesanan</p>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Reservasi</p>
                <p className="text-2xl font-bold text-gray-900">{reservations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">{(session as any)?.user?.role || 'user'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Riwayat Pesanan
              </div>
            </button>
            <button
              onClick={() => setActiveTab('reservations')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'reservations'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                Riwayat Reservasi
              </div>
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'orders' ? (
              orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada pesanan</p>
                  <button
                    onClick={() => router.push('/menu')}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">Pesanan #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'delivering' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'preparing' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Item:</strong> {order.items}</p>
                        <p><strong>Total:</strong> Rp {order.total?.toLocaleString()}</p>
                        {order.customer_address && (
                          <p><strong>Alamat:</strong> {order.customer_address}</p>
                        )}
                      </div>
                      <button
                        onClick={() => router.push(`/track?id=${order.id}`)}
                        className="mt-4 text-primary font-medium text-sm hover:underline"
                      >
                        Lacak Pesanan
                      </button>
                    </motion.div>
                  ))}
                </div>
              )
            ) : (
              reservations.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada reservasi</p>
                  <button
                    onClick={() => router.push('/reserve')}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reservasi Sekarang
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <motion.div
                      key={reservation.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">Reservasi #{reservation.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(reservation.reservation_date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          reservation.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {reservation.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Waktu:</strong> {reservation.reservation_time}</p>
                        <p><strong>Jumlah Tamu:</strong> {reservation.guests}</p>
                        {reservation.notes && (
                          <p><strong>Catatan:</strong> {reservation.notes}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
