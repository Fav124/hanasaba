'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Camera, Upload, CheckCircle, Clock, Truck, Package } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

export default function CourierDeliveriesPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [deliveries, setDeliveries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [proofImage, setProofImage] = useState<File | null>(null)
  const [proofNotes, setProofNotes] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (session?.user?.role !== 'courier') {
      router.push('/')
      return
    }
    fetchDeliveries()
  }, [session, router])

  const fetchDeliveries = async () => {
    try {
      const supabase = getSupabase()
      if (!supabase) return

      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('courier_id', (session as any)?.user?.id)
        .in('status', ['delivering', 'delivered'])
        .order('created_at', { ascending: false })

      setDeliveries(data || [])
    } catch (error) {
      console.error('Error fetching deliveries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadProof = async () => {
    if (!selectedOrder || !proofImage) return

    setUploading(true)
    try {
      const supabase = getSupabase()
      if (!supabase) return

      // Upload image to Supabase storage
      const fileExt = proofImage.name.split('.').pop()
      const fileName = `${selectedOrder.id}-${Date.now()}.${fileExt}`
      const filePath = `delivery-proofs/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('delivery-proofs')
        .upload(filePath, proofImage)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('delivery-proofs')
        .getPublicUrl(filePath)

      // Insert delivery proof record
      await supabase
        .from('delivery_proofs')
        .insert({
          order_id: selectedOrder.id,
          image_url: publicUrl,
          notes: proofNotes,
          uploaded_by: (session as any)?.user?.id
        } as any)

      // Update order status to delivered
      await (supabase.from('orders') as any)
        .update({
          status: 'delivered',
          actual_delivery_time: new Date().toISOString()
        })
        .eq('id', selectedOrder.id)

      // Add status history
      await supabase
        .from('order_status_history')
        .insert({
          order_id: selectedOrder.id,
          status: 'delivered',
          notes: 'Bukti pengiriman diupload'
        } as any)

      alert('Bukti pengiriman berhasil diupload!')
      setSelectedOrder(null)
      setProofImage(null)
      setProofNotes('')
      fetchDeliveries()
    } catch (error) {
      console.error('Error uploading proof:', error)
      alert('Gagal upload bukti pengiriman')
    } finally {
      setUploading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofImage(e.target.files[0])
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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pengiriman Saya</h1>
          <p className="text-gray-600">Kelola dan upload bukti pengiriman</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deliveries List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {deliveries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Tidak ada pengiriman aktif</p>
              </div>
            ) : (
              deliveries.map((delivery) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all ${
                    selectedOrder?.id === delivery.id ? 'ring-2 ring-primary' : 'hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedOrder(delivery)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">Pesanan #{delivery.id}</h3>
                      <p className="text-sm text-gray-500">{delivery.customer_name}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      delivery.status === 'delivering' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {delivery.status === 'delivering' ? 'Sedang Dikirim' : 'Sampai'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Alamat:</strong> {delivery.customer_address}</p>
                    <p><strong>Telepon:</strong> {delivery.customer_phone}</p>
                    <p><strong>Item:</strong> {delivery.items}</p>
                    <p><strong>Total:</strong> Rp {delivery.total.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Upload Proof Section */}
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                Upload Bukti Pengiriman
              </h2>

              {selectedOrder.status === 'delivered' ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Sudah Diantar</h3>
                  <p className="text-gray-600">Pesanan ini sudah selesai.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto Bukti Pengiriman
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="proof-upload"
                      />
                      <label
                        htmlFor="proof-upload"
                        className="cursor-pointer"
                      >
                        {proofImage ? (
                          <div>
                            <p className="font-semibold text-gray-900">{proofImage.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Klik untuk ganti</p>
                          </div>
                        ) : (
                          <div>
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Klik untuk upload foto</p>
                            <p className="text-sm text-gray-400 mt-1">PNG, JPG hingga 10MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catatan (Opsional)
                    </label>
                    <textarea
                      value={proofNotes}
                      onChange={(e) => setProofNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all resize-none text-gray-900 placeholder:text-gray-400"
                      rows={3}
                      placeholder="Contoh: Pesanan diterima dengan baik..."
                    />
                  </div>

                  <motion.button
                    onClick={handleUploadProof}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!proofImage || uploading}
                    className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Mengupload...' : 'Upload Bukti'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
