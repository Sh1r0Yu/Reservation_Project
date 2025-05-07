import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import { BookOnline, Hotel, Notifications } from '@mui/icons-material';
import AdminSidebar from '../../components/shared/AdminSidebar';
import api from '../../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    totalReservations: 0,
    totalRooms: 0,
    totalNotifications: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [reservationsRes, roomsRes] = await Promise.all([
        api.getBookings().catch(() => ({ data: [] })), // Fallback jika error
        api.getRooms()
      ]);
      
      setStats({
        totalReservations: reservationsRes.data.length || 0,
        totalRooms: roomsRes.data.length || 0,
        totalNotifications: 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalReservations: 0,
        totalRooms: 0,
        totalNotifications: 0
      });
    }
  };

  const statCards = [
    {
      title: 'Total Reservasi',
      value: stats.totalReservations,
      icon: <BookOnline sx={{ fontSize: 40, color: '#1976d2' }} />
    },
    {
      title: 'Total Kamar',
      value: stats.totalRooms,
      icon: <Hotel sx={{ fontSize: 40, color: '#2e7d32' }} />
    },
    {
      title: 'Notifikasi',
      value: stats.totalNotifications,
      icon: <Notifications sx={{ fontSize: 40, color: '#ed6c02' }} />
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
            Dashboard Admin
          </Typography>
          
          <Grid container spacing={4}>
            {statCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}>
                  <CardContent sx={{ 
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    {card.icon}
                    <Typography variant="h6" sx={{ mt: 2, color: '#666' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h3" sx={{ mt: 1, fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;