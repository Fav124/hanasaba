'use client'

// @ts-nocheck - Supabase type inference issues

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, Users, Phone, User, CheckCircle, XCircle, Loader2, Shield } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

export default function AdminReservationsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    if (session?.user?.role !== 'admin' && session?.user?.role !== 'moderator') {
      router.push('/')
      return
    }
    fetchReservations()
  }, [session, router, filterStatus])

  const fetchReservations = async () => {
    try {
      const supabase = getSupabase()
      if (!supabase) return

      let query = supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data } = await query
      setReservations(data || [])
    } catch (error) {
      console.error('Error fetching reservations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const supabase = getSupabase()
      if (!supabase) return

      const { error } = await (supabase
        .from('reservations')
        .update({ status } as any)
        .eq('id', id) as any)

      if (error) throw error

      fetchReservations()
      alert('Status reservasi berhasil diupdate')
    } catch (error) {
      console.error('Error updating reservation:', error)
      alert('Gagal update status reservasi')
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

  if (!session || (session.user?.role !== 'admin' && session.user?.role !== 'moderator')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Terbatas</h2>
          <p className="text-gray-600 mb-6">Halaman ini hanya dapat diakses oleh admin dan moderator.</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Kelola Reservasi</h1>
              <p className="text-gray-600 mt-1">Kelola semua reservasi meja</p>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'confirmed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'cancelled').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reservations List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {reservations.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Tidak ada reservasi</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {reservations.map((reservation) => (
                <motion.div
                  key={reservation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-gray-900">#{reservation.id}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                          reservation.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {reservation.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <User className="w-4 h-4" />
                          <span>{reservation.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{reservation.customer_phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(reservation.reservation_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{reservation.reservation_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{reservation.guests} tamu</span>
                        </div>
                      </div>
                      {reservation.notes && (
                        <p className="mt-2 text-sm text-gray-500 italic">"{reservation.notes}"</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      {reservation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(reservation.id, 'confirmed')}
                            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(reservation.id, 'cancelled')}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
