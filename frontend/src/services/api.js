import axios from 'axios';

const services = {
  hotel: process.env.REACT_APP_HOTEL_URL || 'http://localhost:5001',
  auth: process.env.REACT_APP_AUTH_URL || 'http://localhost:5002',
  reservation: process.env.REACT_APP_RESERVATION_URL || 'http://localhost:5003',
  notification: process.env.REACT_APP_NOTIFICATION_URL || 'http://localhost:5004'
};

const api = {
  // Hotel Service
  getRooms: () => axios.get(`${services.hotel}/api/rooms`),
  getRoom: (id) => axios.get(`${services.hotel}/api/rooms/${id}`),
  createRoom: async (roomData) => {
    try {
      const response = await axios.post(`${services.hotel}/api/rooms`, {
        room_type: roomData.room_type,
        price: parseFloat(roomData.price),
        room_number: `R${String(roomData.total_rooms).padStart(3, '0')}`,
        total_rooms: parseInt(roomData.total_rooms),
        available_rooms: parseInt(roomData.available_rooms)
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Gagal menambahkan kamar';
    }
  },
  deleteRoom: (id) => axios.delete(`${services.hotel}/api/rooms/${id}`),
  updateRoom: async (id, roomData) => {
    try {
      const response = await axios.put(`${services.hotel}/api/rooms/${id}`, {
        room_type: roomData.room_type,
        price: parseFloat(roomData.price),
        total_rooms: parseInt(roomData.total_rooms),
        available_rooms: parseInt(roomData.available_rooms)
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Gagal memperbarui kamar';
    }
  },
  
  // Reservation Service
  createBooking: (data) => axios.post(`${services.reservation}/api/bookings`, data),
  getBookings: () => {
    return axios.get(`${services.reservation}/api/bookings`);
  },
  
  // Auth Service
  login: (credentials) => axios.post(`${services.auth}/api/auth/login`, credentials),
  logout: () => axios.post(`${services.auth}/api/auth/logout`),
  
  // Notification Service
  sendNotification: (data) => axios.post(`${services.notification}/api/notifications`, data)
};

export default api;