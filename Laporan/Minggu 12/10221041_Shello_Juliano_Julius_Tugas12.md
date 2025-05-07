# Dokumentasi Integrasi Sistem Reservasi Hotel

## Arsitektur Sistem
Sistem terdiri dari beberapa microservices yang saling terintegrasi:

### 1. Frontend (Port 3000)
  - Form booking
  - Dashboard admin

### 2. Hotel Service (Port 5001)
- Mengelola informasi kamar
- Database: PostgreSQL
- Endpoint:
  - GET /api/rooms: Daftar kamar
  - GET /api/rooms/{id}: Detail kamar
  - POST /api/rooms: Tambah kamar (admin)
  - PUT /api/rooms/{id}: Update kamar (admin)
  - DELETE /api/rooms/{id}: Hapus kamar (admin)

### 3. Auth Service (Port 5002)
- Mengelola autentikasi
- Database: PostgreSQL
- Endpoint:
  - POST /api/auth/login: Login admin
  - POST /api/auth/logout: Logout
  - GET /api/auth/verify: Verifikasi token

### 4. Reservation Service (Port 5003)
- Mengelola pemesanan
- Database: PostgreSQL
- Endpoint:
  - POST /api/bookings: Buat reservasi
  - GET /api/bookings: Daftar reservasi
  - PUT /api/bookings/{id}: Update status

## Alur Komunikasi
1. User Flow:
   - User membuka website → Frontend
   - Lihat kamar → Hotel Service
   - Booking kamar → Reservation Service

2. Admin Flow:
   - Login → Auth Service
   - Kelola kamar → Hotel Service
   - Kelola reservasi → Reservation Service

## Integrasi Database
- Semua service menggunakan PostgreSQL
- Database: hotel_db
- Tabel:
  - room: Informasi kamar
  - booking: Data reservasi
  - user: Data admin

## Docker Integration
- Semua service berjalan dalam container
- Menggunakan docker-compose untuk orchestration
- Volume untuk persistensi data
- Health check untuk database

## Screenshot
- ![Screensot](IMG/Screenshot%202025-05-02%20151951.png)
- Terminal log saat service dijalankan
- ![Screensot](IMG/Screenshot%202025-05-02%20152221.png)
- Dashboard Container

- ![Screensot](IMG/Screenshot%20(90).png)
### Halaman Utama (Homepage)
Halaman utama menampilkan:
- Tombol "LOGIN ADMIN" di pojok kanan atas
- Tampilan responsif untuk berbagai ukuran layar

- ![Screensot](IMG/Screenshot%20(91).png)
### Form Pemesanan Kamar
Form pemesanan menampilkan:
- Detail kamar yang dipilih (tipe dan harga)
- Input untuk:
  - Tanggal Check-in dan Check-out
  - Nama Lengkap
  - Email
  - Nomor Telepon
- Tombol "KONFIRMASI PEMESANAN"
- Validasi input untuk semua field wajib

- ![Screensot](IMG/Screenshot%20(92).png)
###  Halaman Login Admin
Halaman login admin dengan:
- Field untuk username dan password
- Validasi input
- Pesan error jika login gagal


- ![Screensot](IMG/Screenshot%20(93).png)
### Dashboard Admin
Dashboard admin menampilkan:
- Menu navigasi di sidebar
- Total reservasi yang tercatat