import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SearchRoom from './pages/Home/searchroom';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Admin/Dashboard';
import Rooms from './pages/Admin/Rooms';
import BookingForm from './pages/Booking/BookingForm';
import Reservations from './pages/Admin/Reservations';
import Notifications from './pages/Admin/Notifications';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SearchRoom />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/rooms" element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          } />
          <Route path="/admin/reservations" element={
            <ProtectedRoute>
              <Reservations />
            </ProtectedRoute>
          } />
          <Route path="/admin/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/booking/:roomId" element={<BookingForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;