# Dokumentasi Deployment

## Prasyarat
- Node.js dan npm terinstall
- Akun GitHub
- Akun Vercel

## Langkah-langkah Deployment Frontend ke Vercel

### 1. Persiapan Repository
1. Push project ke GitHub repository
2. Pastikan struktur folder benar:
   - /frontend
   - package.json
   - src/
   - public/

### 2. Setup Vercel
1. Buat akun di Vercel.com (login dengan GitHub)
2. Klik "Add New Project"
3. Import repository GitHub
4. Pilih repository Reservation_Project

### 3. Konfigurasi Deployment
1. Framework Preset: Create React App
2. Root Directory: frontend (tanpa ./)
3. Build Command: npm run build
4. Output Directory: build
5. Node.js Version: 18.x
6. Environment Variables (jika diperlukan):
   - REACT_APP_API_URL: URL backend API

### 4. Build Settings Tambahan
1. Include Source Maps: Enabled (untuk debugging)
2. Skip Build Step: Disabled (kita perlu build step)

### 4. Deploy
1. Klik "Deploy"
2. Tunggu proses build dan deployment selesai
3. Vercel akan memberikan URL untuk aplikasi

### 5. Monitoring
1. Monitor build status di dashboard Vercel
2. Cek deployment logs jika ada error
3. Test aplikasi di URL yang diberikan

### 6. Automatic Deployments
- Setiap push ke branch main akan otomatis trigger deployment baru
- Preview deployments tersedia untuk setiap pull request