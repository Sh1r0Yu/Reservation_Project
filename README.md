# Hotel Reservation System

## Overview
Sistem reservasi hotel berbasis microservices yang memungkinkan pengguna untuk melihat, memesan, dan mengelola kamar hotel.

## Architecture
Sistem terdiri dari beberapa microservices:
- Hotel Service: Manajemen informasi kamar
- Auth Service: Autentikasi dan manajemen user
- Reservation Service: Pengelolaan reservasi

## Tech Stack
- Backend: Flask, PostgreSQL
- Infrastructure: Docker
- Tools: pgAdmin, Postman/REST Client

## Services
- Hotel Service: Mengelola informasi kamar, termasuk ketersediaan dan harga
- Auth Service: Menangani autentikasi dan otorisasi pengguna
- Reservation Service: Mengelola pemesanan kamar

## Getting Started
### Prerequisites
- Docker Desktop
- Python 3.9+
- PostgreSQL
- VS Code + REST Client extension (opsional)

### Local Development
1. Clone repository
2. Setup database PostgreSQL
3. Di setiap service folder, build dan jalankan Docker:
```bash
docker build -t [service-name] .
docker run -p [port]:[port] [service-name]
```
### Team Members
- Shello Juliano Julius - Backend & Frontend
- Nurma Nulan Dari - DevOps

