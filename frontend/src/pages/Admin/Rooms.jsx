import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
} from '@mui/material';
import AdminSidebar from '../../components/shared/AdminSidebar';
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
      const response = await api.getRooms();
      setRooms(response.data);
      setError(null);
    } catch (err) {
      setError('Gagal memuat data kamar');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    // Implementasi edit
  };

  const handleDelete = async (id) => {
    // Implementasi delete
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              Manajemen Kamar
            </Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              TAMBAH KAMAR
            </Button>
          </Box>

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
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                      <TableCell>Tipe Kamar</TableCell>
                      <TableCell>Harga/Malam</TableCell>
                      <TableCell>Total Kamar</TableCell>
                      <TableCell>Kamar Tersedia</TableCell>
                      <TableCell align="center">Aksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell>{room.room_type}</TableCell>
                        <TableCell>Rp {room.price}</TableCell>
                        <TableCell>{room.room_number}</TableCell>
                        <TableCell>{room.status}</TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mr: 1, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                            onClick={() => handleEdit(room.id)}
                          >
                            EDIT
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(room.id)}
                          >
                            HAPUS
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