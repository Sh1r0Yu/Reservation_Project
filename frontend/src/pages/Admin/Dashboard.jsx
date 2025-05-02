import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import AdminSidebar from '../../components/shared/AdminSidebar';
import api from '../../services/api';

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.getReservations();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 4 }}>Dashboard Admin</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Reservasi</Typography>
                <Typography variant="h4">{bookings.length}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;