import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AdminSidebar from '../../components/shared/AdminSidebar';
import api from '../../services/api';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    room_type: '',
    price: '',
    total_rooms: '',
    available_rooms: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await api.getRooms();
      setRooms(response.data);
    } catch (error) {
      setError('Gagal mengambil data kamar');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (room = null) => {
    if (room) {
      setSelectedRoom(room);
      setFormData({
        room_type: room.room_type,
        price: room.price.toString(),
        total_rooms: room.total_rooms.toString(),
        available_rooms: room.available_rooms.toString()
      });
    } else {
      setSelectedRoom(null);
      setFormData({
        room_type: '',
        price: '',
        total_rooms: '',
        available_rooms: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoom(null);
    setFormData({
      room_type: '',
      price: '',
      total_rooms: '',
      available_rooms: ''
    });
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
      if (selectedRoom) {
        // Mode edit
        const updatedData = {
          ...formData,
          room_number: selectedRoom.room_number // Gunakan room_number yang sudah ada
        };
        await api.updateRoom(selectedRoom.id, updatedData);
        alert('Kamar berhasil diperbarui');
      } else {
        // Mode tambah baru
        await api.createRoom(formData);
        alert('Kamar berhasil ditambahkan');
      }
      handleCloseDialog();
      fetchRooms(); // Refresh daftar kamar
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Gagal menyimpan data kamar');
    } finally {
      setLoading(false);
    }
  };

 

  const handleDelete = async (roomId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kamar ini?')) {
      try {
        setLoading(true);
        await api.deleteRoom(roomId);
        fetchRooms(); // Refresh daftar kamar setelah menghapus
        alert('Kamar berhasil dihapus');
      } catch (error) {
        setError('Gagal menghapus kamar: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h4">Manajemen Kamar</Typography>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => handleOpenDialog()}
            >
              TAMBAH KAMAR
            </Button>
          </Box>

          {error && (
            <Box sx={{ mb: 2 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          )}

          <TableContainer component={Paper}>
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
                    <TableCell>Rp {room.price.toLocaleString()}</TableCell>
                    <TableCell>{room.total_rooms}</TableCell>
                    <TableCell>{room.available_rooms}</TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => handleOpenDialog(room)}
                        sx={{ mr: 1 }}
                      >
                        EDIT
                      </Button>
                      <Button 
                        color="error"
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

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>
              {selectedRoom ? 'Edit Kamar' : 'Tambah Kamar Baru'}
            </DialogTitle>
            <form onSubmit={handleSubmit}> {/* Tambahkan form wrapper */}
              <DialogContent>
                <Box sx={{ pt: 2 }}>
                  <TextField
                    required // Tambahkan validasi required
                    fullWidth
                    label="Tipe Kamar"
                    name="room_type"
                    value={formData.room_type}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    error={!formData.room_type} // Tambahkan validasi visual
                    helperText={!formData.room_type ? 'Tipe kamar harus diisi' : ''}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Harga per Malam"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    error={!formData.price}
                    helperText={!formData.price ? 'Harga harus diisi' : ''}
                    inputProps={{ min: 0 }} // Tambahkan validasi min
                  />
                  <TextField
                    required
                    fullWidth
                    label="Total Kamar"
                    name="total_rooms"
                    type="number"
                    value={formData.total_rooms}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    error={!formData.total_rooms}
                    helperText={!formData.total_rooms ? 'Total kamar harus diisi' : ''}
                    inputProps={{ min: 0 }}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Kamar Tersedia"
                    name="available_rooms"
                    type="number"
                    value={formData.available_rooms}
                    onChange={handleChange}
                    error={!formData.available_rooms || parseInt(formData.available_rooms) > parseInt(formData.total_rooms)}
                    helperText={
                      !formData.available_rooms 
                        ? 'Kamar tersedia harus diisi' 
                        : parseInt(formData.available_rooms) > parseInt(formData.total_rooms)
                        ? 'Kamar tersedia tidak boleh lebih dari total kamar'
                        : ''
                    }
                    inputProps={{ 
                      min: 0,
                      max: formData.total_rooms // Tambahkan validasi max
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Batal</Button>
                <Button 
                  type="submit"
                  variant="contained"
                  disabled={loading || !formData.room_type || !formData.price || !formData.total_rooms || !formData.available_rooms}
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}

export default Rooms;