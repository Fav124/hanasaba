'use client'

import { useState } from 'react'

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Ahmad', rating: 5, comment: 'Ayam gepreknya enak banget! Pelayanan juga cepat.', pinned: true },
    { id: 2, name: 'Siti', rating: 4, comment: 'Tempatnya nyaman, makanan oke.', pinned: false },
    { id: 3, name: 'Budi', rating: 5, comment: 'Rekomendasi untuk yang suka pedas!', pinned: false },
  ])

  const togglePin = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, pinned: !review.pinned } : review
    ))
    // TODO: Update in Supabase
  }

  const deleteReview = (id: number) => {
    setReviews(reviews.filter(review => review.id !== id))
    // TODO: Delete from Supabase
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Ulasan</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Ulasan</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => togglePin(review.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      review.pinned ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {review.pinned ? 'Unpin' : 'Pin'}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}