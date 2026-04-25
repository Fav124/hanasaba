'use client'

// @ts-nocheck - Supabase type inference issues

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  DollarSign,
  ShoppingBag,
  Users,
  Star,
  TrendingUp,
  Calendar,
  Package,
  Clock,
  Shield,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<any[]>([
    { label: 'Total Penjualan Hari Ini', value: 'Rp 0', icon: DollarSign, change: '+0%', color: 'bg-emerald-500' },
    { label: 'Total Order', value: '0', icon: ShoppingBag, change: '+0%', color: 'bg-blue-500' },
    { label: 'Pelanggan Baru', value: '0', icon: Users, change: '+0%', color: 'bg-purple-500' },
    { label: 'Rating Rata-rata', value: '0.0', icon: Star, change: '+0', color: 'bg-amber-500' },
  ])
  const [salesData, setSalesData] = useState<any[]>([])
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [categoryData, setCategoryData] = useState<any[]>([])
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      const supabase = getSupabase()
      if (!supabase) return

      // Fetch today's sales
      const today = new Date().toISOString().split('T')[0]
      const { data: ordersData } = await supabase
        .from('orders')
        .select('total, created_at')
        .gte('created_at', today)

      const todaySales = ordersData?.reduce((sum: number, order: any) => sum + order.total, 0) || 0

      // Fetch total orders
      const { count: totalOrders } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })

      // Fetch new customers (profiles created today)
      const { count: newCustomers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today)

      // Fetch average rating
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('rating')
      const avgRating = reviewsData && reviewsData.length > 0
        ? (reviewsData.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsData.length).toFixed(1)
        : '0.0'

      setStats([
        { label: 'Total Penjualan Hari Ini', value: `Rp ${todaySales.toLocaleString()}`, icon: DollarSign, change: '+0%', color: 'bg-emerald-500' },
        { label: 'Total Order', value: totalOrders?.toString() || '0', icon: ShoppingBag, change: '+0%', color: 'bg-blue-500' },
        { label: 'Pelanggan Baru', value: newCustomers?.toString() || '0', icon: Users, change: '+0%', color: 'bg-purple-500' },
        { label: 'Rating Rata-rata', value: avgRating, icon: Star, change: '+0', color: 'bg-amber-500' },
      ])

      // Fetch recent orders
      const { data: recent } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentOrders(recent || [])

      // Mock data for charts (can be enhanced with real aggregations)
      setSalesData([
        { name: 'Sen', sales: 4000, orders: 24 },
        { name: 'Sel', sales: 3000, orders: 18 },
        { name: 'Rab', sales: 5000, orders: 32 },
        { name: 'Kam', sales: 4500, orders: 28 },
        { name: 'Jum', sales: 6000, orders: 40 },
        { name: 'Sab', sales: 8000, orders: 55 },
        { name: 'Min', sales: 7500, orders: 50 },
      ])

      setMonthlyData([
        { name: 'Jan', sales: 45000 },
        { name: 'Feb', sales: 52000 },
        { name: 'Mar', sales: 48000 },
        { name: 'Apr', sales: 61000 },
        { name: 'Mei', sales: 55000 },
        { name: 'Jun', sales: 67000 },
      ])

      setCategoryData([
        { name: 'Ayam Geprek', value: 45, color: '#C41E3A' },
        { name: 'Paket Family', value: 25, color: '#FDB913' },
        { name: 'Minuman', value: 15, color: '#3B82F6' },
        { name: 'Lainnya', value: 15, color: '#10B981' },
      ])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-6">Silakan login terlebih dahulu untuk mengakses halaman admin.</p>
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  // Not admin
  if (session.user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Terbatas</h2>
          <p className="text-gray-600 mb-6">Halaman ini hanya dapat diakses oleh admin.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            Kembali ke Beranda
          </Link>
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
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-gray-600 mt-1">Ringkasan performa bisnis Hanasaba</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">25 April 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat: any, index: number) => (
            <motion.div
              key={stat.label}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-500 text-sm font-semibold">{stat.change}</span>
                    <span className="text-gray-400 text-sm">vs kemarin</span>
                  </div>
                </div>
                <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Sales Chart */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Penjualan Minggu Ini</h2>
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Minggu Ini</option>
                <option>Bulan Ini</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey="sales" fill="#C41E3A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Pie Chart */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Kategori Terlaris</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {categoryData.map((item: any) => (
                <div key={item.name} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly Trend */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Trend Bulanan</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#FDB913"
                    strokeWidth={3}
                    dot={{ fill: '#FDB913', strokeWidth: 0, r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Order Terbaru</h2>
              <button className="text-primary font-medium text-sm hover:underline">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                      order.status === 'delivered' ? 'bg-emerald-100' :
                      order.status === 'delivering' ? 'bg-blue-100' : 'bg-amber-100'
                    }`}>
                      <Package className={`w-6 h-6 ${
                        order.status === 'delivered' ? 'text-emerald-600' :
                        order.status === 'delivering' ? 'text-blue-600' : 'text-amber-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.customer_name}</p>
                      <p className="text-sm text-gray-500">{order.items}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">Rp {order.total?.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      {new Date(order.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
