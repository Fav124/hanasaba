'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageSquare, TrendingUp, Award } from 'lucide-react'

export default function ReviewsPage() {
  const [reviews] = useState([
    { id: 1, name: 'Ahmad', rating: 5, comment: 'Ayam gepreknya enak banget! Pelayanan juga cepat.', pinned: true, date: '2 hari lalu' },
    { id: 2, name: 'Siti', rating: 4, comment: 'Tempatnya nyaman, makanan oke.', pinned: false, date: '1 minggu lalu' },
    { id: 3, name: 'Budi', rating: 5, comment: 'Rekomendasi untuk yang suka pedas!', pinned: false, date: '2 minggu lalu' },
    { id: 4, name: 'Dewi', rating: 5, comment: 'Sambalnya juara! Bakal balik lagi.', pinned: true, date: '3 hari lalu' },
    { id: 5, name: 'Rizky', rating: 4, comment: 'Harga terjangkau dengan rasa premium.', pinned: false, date: '1 bulan lalu' },
  ])

  const pinnedReviews = reviews.filter(r => r.pinned)
  const otherReviews = reviews.filter(r => !r.pinned)
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <MessageSquare className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ulasan Pelanggan</h1>
          <p className="text-gray-600">Apa kata mereka tentang Hanasaba</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
              <Star className="w-6 h-6 text-primary fill-primary" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{averageRating}</p>
            <p className="text-gray-600 text-sm">Rating Rata-rata</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-3">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{reviews.length}</p>
            <p className="text-gray-600 text-sm">Total Ulasan</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{pinnedReviews.length}</p>
            <p className="text-gray-600 text-sm">Ulasan Terpilih</p>
          </div>
        </motion.div>

        {pinnedReviews.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              Ulasan Terpilih
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pinnedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Semua Ulasan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{review.name}</h3>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}