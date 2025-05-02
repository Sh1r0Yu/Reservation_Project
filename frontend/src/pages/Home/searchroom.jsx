import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  AppBar, 
  Toolbar 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

function SearchRoom() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await api.getRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleBooking = (roomId) => {
    navigate(`/booking/${roomId}`);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Hotel Reservation</Typography>
          <Button 
            color="inherit"
            variant="outlined"
            onClick={() => navigate('/admin/login')}
          >
            Login Admin
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            fontWeight: 'bold',
            color: '#1976d2'
          }}
        >
          Daftar Kamar Tersedia
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} key={room.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'scale(1.02)',
                    transition: 'all 0.2s ease-in-out'
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      textAlign: 'center', 
                      mb: 2,
                      color: '#1976d2',
                      fontWeight: 'bold'
                    }}
                  >
                    {room.room_type}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Nomor: {room.room_number}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32' }}>
                    Harga: Rp {room.price.toLocaleString()}/malam
                  </Typography>
                  <Typography sx={{ mb: 3 }}>
                    {room.description}
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={() => handleBooking(room.id)}
                      sx={{
                        width: '80%',
                        py: 1.5,
                        fontWeight: 'bold',
                        borderRadius: 2
                      }}
                    >
                      PESAN KAMAR
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default SearchRoom;