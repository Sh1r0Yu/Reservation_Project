# Hotel Reservation System

## Overview
Sistem reservasi hotel berbasis microservices yang memungkinkan pengguna untuk melihat, memesan, dan mengelola kamar hotel.

## Architecture
Sistem terdiri dari beberapa microservices:
- Hotel Service (Port 5001): Manajemen informasi kamar
- Auth Service (Port 5002): Autentikasi dan manajemen user
- Reservation Service (Port 5003): Pengelolaan reservasi
- Notification Service (Port 5004): Sistem notifikasi

## Tech Stack
- Backend: Flask, PostgreSQL
- Infrastructure: Docker
- Tools: pgAdmin, Postman/REST Client

## Services
### Hotel Service (5001)
- Mengelola informasi kamar dan ketersediaan
- Endpoint: /api/rooms
- Fitur: CRUD operations untuk kamar hotel

### Auth Service (5002)
- Menangani autentikasi dan otorisasi pengguna
- Endpoint: /api/auth
- Fitur: Register, Login

### Reservation Service (5003)
- Mengelola pemesanan kamar
- Endpoint: /api/reservations
- Fitur: Membuat, membatalkan, dan mengupdate reservasi

### Notification Service (5004)
- Mengirim notifikasi kepada pengguna
- Endpoint: /api/notifications
- Fitur: Notifikasi booking dan status reservasi

## Getting Started
### Prerequisites
- Docker Desktop
- Python 3.9+
- PostgreSQL
- VS Code + REST Client extension (opsional)

### Database Setup
1. Install PostgreSQL
2. Create database: hotel_db
3. User: student
4. Password: 12345

### Local Development
1. Clone repository
2. Setup database PostgreSQL
3. Di setiap service folder, build dan jalankan Docker:
```bash
# Build images
docker build -t hotel-service .
docker build -t auth-service .
docker build -t reservation-service .
docker build -t notification-service .

# Run containers
docker run -d -p 5001:5001 hotel-service
docker run -d -p 5002:5002 auth-service
docker run -d -p 5003:5003 reservation-service
docker run -d -p 5004:5004 notification-service
```
### Team Members
- Shello Juliano Julius - Backend & Frontend
- Nurma Nulan Dari - DevOps

