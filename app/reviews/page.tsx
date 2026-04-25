'use client'

import { useState } from 'react'

export default function ReviewsPage() {
  const [reviews] = useState([
    { id: 1, name: 'Ahmad', rating: 5, comment: 'Ayam gepreknya enak banget! Pelayanan juga cepat.', pinned: true },
    { id: 2, name: 'Siti', rating: 4, comment: 'Tempatnya nyaman, makanan oke.', pinned: false },
    { id: 3, name: 'Budi', rating: 5, comment: 'Rekomendasi untuk yang suka pedas!', pinned: false },
  ])

  const pinnedReviews = reviews.filter(r => r.pinned)
  const otherReviews = reviews.filter(r => !r.pinned)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Ulasan Pelanggan</h1>

      {pinnedReviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-secondary">Ulasan Terpilih</h2>
          <div className="grid gap-4">
            {pinnedReviews.map((review) => (
              <div key={review.id} className="bg-yellow-100 border-l-4 border-secondary p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Semua Ulasan</h2>
        <div className="grid gap-4">
          {otherReviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{review.name}</span>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}