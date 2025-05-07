import axios from 'axios';

const services = {
  hotel: 'http://localhost:5001',
  auth: 'http://localhost:5002',
  reservation: 'http://localhost:5003',
  notification: 'http://localhost:5004'
};

const RESERVATION_API = 'http://localhost:5003';

const api = {
  // Hotel Service
  getRooms: () => axios.get(`${services.hotel}/api/rooms`),
  getRoom: (id) => axios.get(`${services.hotel}/api/rooms/${id}`),
  
  // Reservation Service
  createBooking: (data) => axios.post(`${services.reservation}/api/bookings`, data),
  getBookings: () => {
    return axios.get(`${RESERVATION_API}/api/bookings`);
  },
  
  // Auth Service
  login: (credentials) => axios.post(`${services.auth}/api/auth/login`, credentials),
  logout: () => axios.post(`${services.auth}/api/auth/logout`),
  
  // Notification Service
  sendNotification: (data) => axios.post(`${services.notification}/api/notifications`, data)
};

export default api;