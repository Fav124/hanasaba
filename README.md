# Hanasaba Restaurant Website

Website penjualan restoran ayam geprek dengan fitur lengkap.

## Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Pergi ke Settings > API untuk mendapatkan URL dan anon key
4. Pergi ke Authentication > Providers > Google dan enable Google OAuth, set redirect URL ke `http://localhost:3000/api/auth/callback/google` (untuk development)
5. Buat database tables dengan SQL berikut:

```sql
-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'))
);

-- Menu items
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT,
  items TEXT NOT NULL,
  total INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered')),
  order_type TEXT DEFAULT 'delivery' CHECK (order_type IN ('delivery', 'dine_in')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reservations
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guests INTEGER NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages for chat
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  sender_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pinned reviews view
CREATE VIEW pinned_reviews AS
SELECT * FROM reviews WHERE pinned = TRUE ORDER BY created_at DESC;

-- RLS Policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view menu items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Only admins can modify menu items" ON menu_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Similar policies for reservations, reviews, messages
```

6. Set environment variables di `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

7. Untuk membuat admin user, update role di profiles table setelah login pertama.

## Menjalankan Project

```bash
npm install
npm run dev
```

Buka http://localhost:3000
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
