'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Clock, CheckCircle, Package, Truck, ChefHat, Box, XCircle, AlertCircle, Download } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

const statusSteps = [
  { key: 'pending', label: 'Menunggu Konfirmasi', icon: Clock, color: 'bg-gray-400' },
  { key: 'confirmed', label: 'Dikonfirmasi', icon: CheckCircle, color: 'bg-blue-500' },
  { key: 'preparing', label: 'Sedang Dimasak', icon: ChefHat, color: 'bg-orange-500' },
  { key: 'packing', label: 'Sedang Dibungkus', icon: Box, color: 'bg-purple-500' },
  { key: 'delivering', label: 'Sedang Dikirim', icon: Truck, color: 'bg-emerald-500' },
  { key: 'delivered', label: 'Sampai', icon: CheckCircle, color: 'bg-green-500' },
]

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('id')
  const [order, setOrder] = useState<any>(null)
  const [statusHistory, setStatusHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deliveryProof, setDeliveryProof] = useState<any>(null)

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails()
    }
  }, [orderId])

  const fetchOrderDetails = async () => {
    try {
      const supabase = getSupabase()
      if (!supabase || !orderId) return

      const { data: orderData } = await supabase
        .from('orders')
        .select('*')
        .eq('id', parseInt(orderId))
        .single()

      if (orderData) {
        setOrder(orderData)

        const { data: historyData } = await supabase
          .from('order_status_history')
          .select('*')
          .eq('order_id', parseInt(orderId))
          .order('created_at', { ascending: true })

        setStatusHistory(historyData || [])

        const { data: proofData } = await supabase
          .from('delivery_proofs')
          .select('*')
          .eq('order_id', parseInt(orderId))
          .single()

        setDeliveryProof(proofData)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentStepIndex = () => {
    if (!order) return -1
    if (order.status === 'cancelled') return -1
    return statusSteps.findIndex(step => step.key === order.status)
  }

  const generateInvoice = () => {
    if (!order) return

    const invoiceData = {
      orderId: order.id,
      customerName: order.customer_name,
      customerPhone: order.customer_phone,
      customerAddress: order.customer_address,
      items: order.items,
      total: order.total,
      orderType: order.order_type,
      paymentStatus: order.payment_status,
      paymentMethod: order.payment_method,
      createdAt: order.created_at,
      estimatedDelivery: order.estimated_delivery_time,
      isFree: order.is_free,
    }

    const invoiceHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice #${order.id} - Hanasaba</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { color: #dc2626; margin: 0; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
    .info-box { background: #f9fafb; padding: 20px; border-radius: 8px; }
    .info-box h3 { margin: 0 0 10px 0; color: #374151; }
    .info-box p { margin: 5px 0; color: #6b7280; }
    .items-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .total-box { background: #dc2626; color: white; padding: 20px; border-radius: 8px; text-align: right; }
    .total-box .amount { font-size: 32px; font-weight: bold; }
    .footer { text-align: center; margin-top: 40px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="header">
    <h1>HANASABA</h1>
    <p>Ayam Geprek Restaurant</p>
  </div>

  <div class="info-grid">
    <div class="info-box">
      <h3>Informasi Pelanggan</h3>
      <p><strong>Nama:</strong> ${invoiceData.customerName}</p>
      <p><strong>Telepon:</strong> ${invoiceData.customerPhone}</p>
      <p><strong>Alamat:</strong> ${invoiceData.customerAddress}</p>
    </div>
    <div class="info-box">
      <h3>Informasi Pesanan</h3>
      <p><strong>No. Pesanan:</strong> #${invoiceData.orderId}</p>
      <p><strong>Tanggal:</strong> ${new Date(invoiceData.createdAt).toLocaleString('id-ID')}</p>
      <p><strong>Tipe:</strong> ${invoiceData.orderType === 'delivery' ? 'Delivery' : 'Dine In'}</p>
      <p><strong>Pembayaran:</strong> ${invoiceData.paymentStatus === 'paid' ? 'Lunas' : 'Belum Lunas'}</p>
      <p><strong>Metode:</strong> ${invoiceData.paymentMethod}</p>
    </div>
  </div>

  <div class="items-box">
    <h3>Item Pesanan</h3>
    <p>${invoiceData.items}</p>
  </div>

  <div class="total-box">
    <p>Total</p>
    <p class="amount">${invoiceData.isFree ? 'GRATIS' : 'Rp ' + invoiceData.total.toLocaleString('id-ID')}</p>
  </div>

  <div class="footer">
    <p>Terima kasih telah memesan di Hanasaba!</p>
    <p>Jika ada pertanyaan, hubungi kami di WhatsApp.</p>
  </div>
</body>
</html>
    `

    const blob = new Blob([invoiceHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${order.id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data pesanan...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pesanan Tidak Ditemukan</h2>
          <p className="text-gray-600">Pastikan nomor pesanan benar.</p>
        </div>
      </div>
    )
  }

  const currentStepIndex = getCurrentStepIndex()
  const isCancelled = order.status === 'cancelled'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Lacak Pesanan</h1>
          <p className="text-gray-600">Pesanan #{order.id}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-6"
        >
          {isCancelled ? (
            <div className="text-center py-8">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-red-600 mb-2">Pesanan Dibatalkan</h2>
              <p className="text-gray-600">Pesanan ini telah dibatalkan.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between overflow-x-auto pb-4">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon
                  const isCompleted = index <= currentStepIndex
                  const isCurrent = index === currentStepIndex

                  return (
                    <div key={step.key} className="flex items-center flex-shrink-0">
                      <div className="flex flex-col items-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isCompleted ? step.color : 'bg-gray-200'
                          } ${isCurrent ? 'ring-4 ring-offset-2 ring-primary/30' : ''}`}
                        >
                          <Icon className={`w-6 h-6 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                        </motion.div>
                        <p className={`text-xs mt-2 text-center ${isCompleted ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={`w-16 h-1 mx-2 ${index < currentStepIndex ? step.color : 'bg-gray-200'}`} />
                      )}
                    </div>
                  )
                })}
              </div>

              {order.estimated_delivery_time && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Estimasi Pengiriman</p>
                    <p className="text-sm text-blue-700">
                      {new Date(order.estimated_delivery_time).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              )}

              {order.is_late && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-900">Pengiriman Terlambat</p>
                    <p className="text-sm text-amber-700">Pesanan ini gratis karena terlambat!</p>
                  </div>
                </div>
              )}

              {order.is_free && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-900">Gratis!</p>
                    <p className="text-sm text-green-700">Pesanan ini gratis untuk Anda.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {deliveryProof && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bukti Pengiriman</h2>
            <img
              src={deliveryProof.image_url}
              alt="Bukti Pengiriman"
              className="w-full rounded-xl"
            />
            {deliveryProof.notes && (
              <p className="mt-4 text-gray-600">{deliveryProof.notes}</p>
            )}
          </motion.div>
        )}

        {statusHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Riwayat Status</h2>
            <div className="space-y-4">
              {statusHistory.map((history, index) => (
                <div key={history.id} className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 capitalize">{history.status}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(history.created_at).toLocaleString('id-ID')}
                    </p>
                    {history.notes && <p className="text-sm text-gray-500 mt-1">{history.notes}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={generateInvoice}
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
        >
          <Download className="w-5 h-5" />
          Download Invoice
        </motion.button>
      </div>
    </div>
  )
}
