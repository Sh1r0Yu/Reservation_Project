import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  CircularProgress,  // Tambahkan ini
  Alert            // Tambahkan ini
} from '@mui/material';
import AdminSidebar from '../../components/shared/AdminSidebar';
import api from '../../services/api';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.getBookings();
      setReservations(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setReservations([]);
      if (error.response?.status === 404) {
        setError('Endpoint reservasi tidak ditemukan. Silakan hubungi administrator.');
      } else {
        setError('Gagal memuat data reservasi. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning';
      case 'confirmed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
            Manajemen Reservasi
          </Typography>
          
          <Paper sx={{ p: 3, boxShadow: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : reservations.length === 0 ? (
              <Box sx={{ p: 3, textAlign: 'center', color: '#666' }}>
                <Typography>Tidak ada data reservasi yang tersedia</Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell>ID Reservasi</TableCell>
                      <TableCell>Nama Tamu</TableCell>
                      <TableCell>Check-in</TableCell>
                      <TableCell>Check-out</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.id}</TableCell>
                        <TableCell>{reservation.guestName}</TableCell>
                        <TableCell>{new Date(reservation.checkIn).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(reservation.checkOut).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip 
                            label={reservation.status} 
                            color={getStatusColor(reservation.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Reservations;