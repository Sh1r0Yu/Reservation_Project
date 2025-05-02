import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getRooms();
      setRooms(response.data);
    } catch (error) {
      setError('Gagal mengambil data kamar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kamar ini?')) {
      try {
        setLoading(true);
        await api.deleteRoom(id);
        await fetchRooms();
      } catch (error) {
        setError('Gagal menghapus kamar: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar - menggunakan style yang sama dengan Dashboard */}
      <Box sx={{ 
        width: 240, 
        bgcolor: '#1976d2',
        minHeight: '100vh',
        p: 3,
        color: 'white'
      }}>
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Button
          component={Link}
          to="/admin/dashboard"
          fullWidth
          sx={{ color: 'white', mb: 2 }}
        >
          Dashboard
        </Button>
        <Button
          component={Link}
          to="/admin/rooms"
          fullWidth
          sx={{ color: 'white', mb: 2 }}
        >
          Rooms
        </Button>
        <Button
          component={Link}
          to="/"
          fullWidth
          sx={{ color: 'white', mt: 'auto' }}
        >
          Logout
        </Button>
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Manajemen Kamar
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              Tambah Kamar
            </Button>
          </Box>

          <Paper sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tipe Kamar</TableCell>
                      <TableCell>Harga/Malam</TableCell>
                      <TableCell>Total Kamar</TableCell>
                      <TableCell>Kamar Tersedia</TableCell>
                      <TableCell>Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.room_type}</TableCell>
                        <TableCell>Rp {room.price}</TableCell>
                        <TableCell>{room.room_number}</TableCell>
                        <TableCell>{room.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleEdit(room.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(room.id)}
                          >
                            Hapus
                          </Button>
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

export default Rooms;