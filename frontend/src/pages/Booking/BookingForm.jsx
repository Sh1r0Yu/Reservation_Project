import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper, Alert, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function BookingForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guestName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchRoomDetails();
  }, [roomId]);

  const fetchRoomDetails = async () => {
    try {
      const response = await api.getRoom(roomId);
      setRoom(response.data);
    } catch (error) {
      setError('Gagal mengambil detail kamar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const bookingData = {
        ...formData,
        roomId: roomId,
        status: 'PENDING'
      };
      await api.createBooking(bookingData);
      alert('Pemesanan berhasil!');
      navigate('/');
    } catch (error) {
      setError('Gagal membuat pemesanan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !room) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
          Form Pemesanan Kamar
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {room && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">Detail Kamar:</Typography>
            <Typography>Tipe: {room.room_type}</Typography>
            <Typography>Harga: Rp {room.price}/malam</Typography>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tanggal Check-in"
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tanggal Check-out"
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nama Lengkap"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nomor Telepon"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  py: 1.5,
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                {loading ? 'MEMPROSES...' : 'KONFIRMASI PEMESANAN'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default BookingForm;