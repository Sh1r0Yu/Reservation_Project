# Dokumentasi Deployment

## Prasyarat
- Node.js dan npm terinstall
- Akun GitHub
- Akun Netlify

## Langkah-langkah Deployment Frontend ke Netlify

### 1. Setup Netlify
1. Buat akun di Netlify.com (login dengan GitHub)
2. Klik "Add new site" > "Import an existing project"
3. Pilih repository GitHub Anda

### 2. Konfigurasi Build
1. Base directory: frontend
2. Build command: npm run build
3. Publish directory: build

### Deploy
1. Deployment otomatis berjalan setelah konfigurasi
2. Site berhasil di-deploy dan bisa diakses

### Maintenance
1. Setiap push ke main branch akan trigger deployment baru
2. Monitor build status di dashboard Netlify
3. Cek deployment logs jika ada perubahan yang gagal
4. Gunakan preview deployments untuk testing sebelum ke production

### Environment Variables
Jika nanti diperlukan, tambahkan environment variables di:
1. Site Settings > Build & Deploy > Environment
2. Variabel yang mungkin diperlukan:
   - REACT_APP_API_URL: URL backend API
4. Tambahkan file netlify.toml di root project

### 3. Deploy
1. Commit dan push perubahan ke GitHub
2. Netlify akan otomatis melakukan build dan deploy
3. Jika muncul error 404:
   - Periksa Build logs
   - Pastikan path di netlify.toml benar
   - Pastikan ada file index.html di folder build

### 4. Monitoring
1. Monitor build status di dashboard Netlify
2. Cek deployment logs jika ada error
3. Test aplikasi di URL yang diberikan