'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Clock, Car, Train } from 'lucide-react'

export function Location() {
  // Default location coordinates (Jakarta - bisa diganti)
  const lat = -6.2088
  const lng = 106.8456
  
  // Google Maps API Key placeholder - ganti dengan API key kamu
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=Hanasaba+Restaurant,Jakarta+Indonesia&zoom=17`

  return (
    <section className="py-20 bg-white" id="lokasi">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Lokasi Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kunjungi <span className="text-primary">Restoran</span> Kami
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Datang langsung untuk menikmati pengalaman makan terbaik
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Container */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-[500px] bg-gray-100"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {GOOGLE_MAPS_API_KEY !== 'YOUR_API_KEY_HERE' ? (
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            ) : (
              /* Placeholder saat API key belum diisi */
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Google Maps</h3>
                  <p className="text-gray-500 mb-4">
                    Tambahkan NEXT_PUBLIC_GOOGLE_MAPS_API_KEY di environment variables untuk menampilkan peta
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-700">
                    <p className="font-semibold mb-1">📍 Lokasi:</p>
                    <p>Jl. Sudirman No. 123, Jakarta Pusat</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              <span className="font-semibold text-gray-800">Hanasaba Restaurant</span>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Address Card */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Alamat</h3>
                  <p className="text-gray-600">Jl. Sudirman No. 123</p>
                  <p className="text-gray-600">Jakarta Pusat, DKI Jakarta 10220</p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-medium mt-3 hover:underline"
                  >
                    <Navigation className="w-4 h-4" />
                    Petunjuk Arah
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Kontak</h3>
                  <p className="text-gray-600">0812-3456-7890</p>
                  <p className="text-gray-600">hello@hanasaba.com</p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Jam Operasional</h3>
                  <p className="text-gray-600">Senin - Minggu: 10:00 - 22:00 WIB</p>
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium mt-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Buka Sekarang
                  </span>
                </div>
              </div>
            </div>

            {/* Transport Info */}
            <div className="bg-gradient-to-r from-primary to-red-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" />
                Akses Transportasi
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Train className="w-4 h-4 text-secondary" />
                  <span>5 menit dari MRT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-secondary" />
                  <span>Parkir tersedia</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
