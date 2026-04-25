export default function MenuPage() {
  const menuItems = [
    { id: 1, name: 'Ayam Geprek Original', price: 25000, description: 'Ayam geprek dengan sambal pedas', category: 'Ayam Geprek' },
    { id: 2, name: 'Ayam Geprek Keju', price: 30000, description: 'Ayam geprek dengan topping keju', category: 'Ayam Geprek' },
    { id: 3, name: 'Paket Family', price: 50000, description: '2 ayam geprek + nasi + minum', category: 'Paket' },
    { id: 4, name: 'Es Teh Manis', price: 5000, description: 'Minuman segar', category: 'Minuman' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-primary">Menu Hanasaba</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-primary font-bold">Rp {item.price.toLocaleString()}</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-red-700">
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}