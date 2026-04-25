export default function AdminOrdersPage() {
  const orders = [
    { id: 1, customer: 'Ahmad', items: '2 Ayam Geprek Original', total: 50000, status: 'Pending', type: 'Delivery' },
    { id: 2, customer: 'Siti', items: 'Reservasi meja untuk 4 orang', total: 0, status: 'Confirmed', type: 'Reservation' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Pesanan</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daftar Pesanan</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{order.customer}</h3>
                  <p className="text-gray-600">{order.items}</p>
                  <p className="text-sm text-gray-500">{order.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">Rp {order.total.toLocaleString()}</p>
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700">
                  Konfirmasi
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Update Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}