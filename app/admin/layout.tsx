import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link href="/admin/menu" className="block hover:text-secondary">Kelola Menu</Link>
          <Link href="/admin/orders" className="block hover:text-secondary">Kelola Pesanan</Link>
          <Link href="/admin/reviews" className="block hover:text-secondary">Kelola Ulasan</Link>
          <Link href="/" className="block hover:text-secondary">Kembali ke Home</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}