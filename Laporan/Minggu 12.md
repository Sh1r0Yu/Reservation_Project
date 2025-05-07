# Dokumentasi Integrasi Sistem Reservasi Hotel

## Arsitektur Sistem
Sistem terdiri dari beberapa microservices yang saling terintegrasi:

### 1. Frontend (Port 3000)
- Dibangun dengan React
- Berkomunikasi dengan backend services melalui REST API
- Fitur:
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

## Screenshots
- ![Screenshot](IMG/Screenshot%202025-05-02%20151951.png)