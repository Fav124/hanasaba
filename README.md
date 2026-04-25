# Hanasaba Restaurant Website

Website penjualan restoran ayam geprek dengan fitur lengkap.

## Setup Supabase

1. Buat akun di [Supabase](https://supabase.com)
2. Buat project baru
3. Pergi ke Settings > API untuk mendapatkan URL dan anon key
4. Pergi ke Authentication > Providers > Google dan enable Google OAuth, set redirect URL ke `http://localhost:3000/api/auth/callback/google` (untuk development)
5. Copy `.env.example` ke `.env.local` dan isi dengan nilai dari Supabase:
   - `NEXT_PUBLIC_SUPABASE_URL`: URL dari Settings > API
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/public key dari Settings > API
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role key dari Settings > API
   - `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET`: dari Google Cloud Console (OAuth 2.0 credentials)
6. Jalankan SQL schema dari file `supabase-schema.sql` di Supabase SQL Editor (RLS pada auth.users sudah diaktifkan secara default oleh Supabase, jadi jangan jalankan baris ALTER TABLE auth.users)
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
