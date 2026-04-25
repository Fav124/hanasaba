export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary mb-4">Selamat Datang di Hanasaba</h1>
        <p className="text-xl text-gray-600 mb-8">Ayam Geprek Terlezat dengan Pelayanan Terbaik</p>
        <div className="bg-secondary text-primary p-6 rounded-lg inline-block">
          <h2 className="text-2xl font-semibold mb-2">Keunggulan Kami</h2>
          <ul className="text-left">
            <li>✅ Ayam geprek crispy dengan bumbu rahasia</li>
            <li>✅ Bahan segar dan berkualitas</li>
            <li>✅ Pelayanan cepat dan ramah</li>
            <li>✅ Delivery ke rumah atau reservasi meja</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Menu Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Ayam Geprek Original</h3>
            <p className="text-gray-600">Ayam geprek dengan sambal pedas level 1-5</p>
            <p className="text-primary font-bold mt-2">Rp 25.000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Paket Family</h3>
            <p className="text-gray-600">2 ayam geprek + nasi + minum</p>
            <p className="text-primary font-bold mt-2">Rp 50.000</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Es Teh Manis</h3>
            <p className="text-gray-600">Minuman segar untuk melengkapi hidangan</p>
            <p className="text-primary font-bold mt-2">Rp 5.000</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Testimoni Pelanggan</h2>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-gray-600 italic">"Ayam gepreknya enak banget! Pelayanan juga cepat."</p>
          <p className="text-primary font-semibold mt-2">- Customer 1</p>
        </div>
      </section>
    </div>
  )
}