# Dokumentasi Deployment

## Prasyarat
- Akun Google Cloud Platform
- Google Cloud SDK terinstall
- Docker terinstall
- Node.js dan npm terinstall
- Python terinstall

## Langkah-langkah Deployment

### 1. Setup Google Cloud Project
1. Buat project baru di Google Cloud Console
2. Aktifkan Cloud Run dan Container Registry
3. Setup billing account

### 2. Setup Credentials
1. Buat Service Account di GCP
2. Download JSON key
3. Tambahkan sebagai secret di GitHub repository:
   - GCP_PROJECT_ID
   - GCP_SA_KEY

### 3. Deployment Backend
1. Build Docker image:
   ```bash
   cd backend
   docker build -t gcr.io/[project-id]/backend-service .