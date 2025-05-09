import React, { useState, useEffect } from 'react';
import '../../styles/SearchRoom.css';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function SearchRoom() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0'
  });
  const [searchParams, setSearchParams] = useState({
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0'
  });
  const [openBookingModal, setOpenBookingModal] = useState(false);

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

  const handleOpenBookingModal = (room) => {
    setSelectedRoom(room);
    setOpenBookingModal(true);
  };

  const handleBooking = (roomId) => {
    navigate(`/booking/${roomId}`);
  };

  // Tambahkan fungsi untuk smooth scroll
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleCloseModal = () => {
    setOpenBookingModal(false);
    setSelectedRoom(null);
    setBookingData({
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      adults: '1',
      children: '0'
    });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validasi form
      if (!bookingData.name || !bookingData.email || !bookingData.phone || 
          !bookingData.checkIn || !bookingData.checkOut) {
        throw new Error('Semua field harus diisi');
      }

      // Validasi format email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(bookingData.email)) {
        throw new Error('Format email tidak valid');
      }

      // Validasi tanggal
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      if (checkOut <= checkIn) {
        throw new Error('Tanggal check-out harus setelah check-in');
      }

      await api.createBooking({
        ...bookingData,
        roomId: selectedRoom.id
      });
      
      // Tampilkan pesan sukses
      alert('Booking berhasil!');
      handleCloseModal();
      
    } catch (error) {
      // Tampilkan pesan error yang lebih informatif
      const errorMessage = error.response?.data?.message || error.message || 'Terjadi kesalahan saat booking';
      alert('Gagal melakukan booking: ' + errorMessage);
      
      // Log error untuk debugging
      console.error('Booking error:', error);
    }
  };

  return (
    <div className="site-wrap">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/" style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            color: '#1976d2'
          }}>
            Hotel Reservation
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a 
                  className="nav-link" 
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setIsNavCollapsed(true);
                  }}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className="nav-link" 
                  href="#rooms"
                  onClick={(e) => {
                    e.preventDefault();
                    const roomsSection = document.querySelector('.hotel-room').closest('div[style*="padding: 5rem 0"]');
                    if (roomsSection) {
                      const navHeight = document.querySelector('.navbar').offsetHeight;
                      const roomsOffset = roomsSection.offsetTop - navHeight;
                      window.scrollTo({ top: roomsOffset, behavior: 'smooth' });
                    }
                    setIsNavCollapsed(true);
                  }}
                >
                  Rooms
                </a>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link border-0 bg-transparent" 
                  onClick={() => {
                    scrollToSection('about');
                    setIsNavCollapsed(true);
                  }}
                >
                  About
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link border-0 bg-transparent" 
                  onClick={() => {
                    scrollToSection('contact');
                    setIsNavCollapsed(true);
                  }}
                >
                  Contact
                </button>
              </li>
            </ul>
            <div className="d-flex">
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  navigate('/admin/login');
                  setIsNavCollapsed(true);
                }}
              >
                Login Admin
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        backgroundImage: 'url("/images/hero_3.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '76px' // Menambahkan margin untuk navbar fixed
      }}>
        {/* Overlay gelap */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}></div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <h1 style={{
            color: '#fff',
            fontSize: '3.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>A Best Place To Stay</h1>

          {/* Search Form */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '1000px',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.5s ease-in-out'
          }}>
            <div className="row g-4">
              <div className="col-md-3">
                <label className="form-label fw-bold text-dark">Check In</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fas fa-calendar"></i>
                  </span>
                  <input 
                    type="date" 
                    className="form-control form-control-lg"
                    value={searchParams.checkIn}
                    onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                    style={{ borderLeft: 'none' }}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold text-dark">Check Out</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fas fa-calendar"></i>
                  </span>
                  <input 
                    type="date" 
                    className="form-control form-control-lg"
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                    style={{ borderLeft: 'none' }}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold text-dark">Adults</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fas fa-user"></i>
                  </span>
                  <select 
                    className="form-select form-select-lg"
                    value={searchParams.adults}
                    onChange={(e) => setSearchParams({...searchParams, adults: e.target.value})}
                    style={{ borderLeft: 'none' }}
                  >
                    {[1,2,3,4].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-2">
                <label className="form-label fw-bold text-dark">Children</label>
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <i className="fas fa-child"></i>
                  </span>
                  <select 
                    className="form-select form-select-lg"
                    value={searchParams.children}
                    onChange={(e) => setSearchParams({...searchParams, children: e.target.value})}
                    style={{ borderLeft: 'none' }}
                  >
                    {[0,1,2,3].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button 
                  className="btn btn-primary btn-lg w-100"
                  style={{
                    background: 'linear-gradient(45deg, #2196F3, #1976D2)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(33, 150, 243, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(33, 150, 243, 0.3)';
                  }}
                >
                  <i className="fas fa-search me-2"></i>
                  Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Section */}
      <div style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h2 className="font-weight-bold text-black mb-3" 
                style={{
                  fontSize: '2.5rem',
                  color: '#1976d2'
                }}
              >
                Our Rooms
              </h2>
              <p className="text-muted" data-aos="fade-up" data-aos-delay="100">
                Choose from our comfortable and luxurious rooms
              </p>
            </div>
          </div>
          <div className="row">
            {rooms.map((room, index) => (
              <div className="col-md-6 col-lg-4 mb-5" key={room.id} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
              >
                <div className="hotel-room bg-white rounded-lg shadow-sm overflow-hidden"
                  style={{
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '1px solid #eee'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
                  }}>
                  <div className="position-relative">
                    <img 
                      src={`/images/img_${room.id}.jpg`} 
                      alt={room.room_type}
                      className="img-fluid w-100"
                      style={{height: '250px', objectFit: 'cover'}}
                    />
                    <div className="price-tag position-absolute"
                         style={{
                           bottom: '15px',
                           right: '15px',
                           background: 'rgba(255,255,255,0.9)',
                           padding: '8px 15px',
                           borderRadius: '20px'
                         }}>
                      <span className="text-primary font-weight-bold">
                        Rp {room.price.toLocaleString()}
                      </span>
                      <small className="d-block text-muted">per night</small>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="h5 mb-3 font-weight-bold">
                      {room.room_type}
                    </h3>
                    <p className="text-muted mb-4">
                      {room.description || 'Experience luxury and comfort in our well-appointed room.'}
                    </p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleOpenBookingModal(room)}
                      style={{
                        background: 'linear-gradient(45deg, #2196F3, #1976D2)',
                        border: 'none',
                        padding: '10px 25px',
                        borderRadius: '25px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" style={{ padding: '5rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-up">
              <img 
                src="/images/about.jpg" 
                alt="About Us" 
                className="img-fluid rounded shadow"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
              <h2 className="font-weight-bold text-black mb-4">Tentang Kami</h2>
              <p className="text-muted mb-4">
                Selamat datang di Hotel Reservation, tempat di mana kenyamanan bertemu dengan kemewahan. 
                Kami berkomitmen untuk memberikan pengalaman menginap terbaik bagi setiap tamu kami.
              </p>
              <p className="text-muted mb-4">
                Dengan lokasi strategis dan fasilitas modern, hotel kami menawarkan akomodasi berkualitas 
                tinggi yang cocok untuk liburan keluarga, perjalanan bisnis, atau acara spesial Anda.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-check text-primary me-2"></i>
                  Lokasi strategis di pusat kota
                </li>
                <li className="mb-3">
                  <i className="fas fa-check text-primary me-2"></i>
                  Kamar modern dengan pemandangan kota
                </li>
                <li className="mb-3">
                  <i className="fas fa-check text-primary me-2"></i>
                  Layanan 24 jam
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" style={{ padding: '5rem 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-8 text-center">
              <h2 className="font-weight-bold text-black mb-4" data-aos="fade-up">Hubungi Kami</h2>
              <p className="text-muted" data-aos="fade-up" data-aos-delay="100">
                Kami siap membantu Anda dengan segala pertanyaan dan kebutuhan Anda
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="fade-up">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-map-marker-alt fa-2x text-primary mb-3"></i>
                  <h5 className="card-title">Alamat</h5>
                  <p className="card-text text-muted">
                    Jl. Hotel Reservation No. 123<br />
                    Jakarta, Indonesia 12345
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-phone fa-2x text-primary mb-3"></i>
                  <h5 className="card-title">Telepon</h5>
                  <p className="card-text text-muted">
                    +62 21 1234 5678<br />
                    +62 812 3456 7890
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="fas fa-envelope fa-2x text-primary mb-3"></i>
                  <h5 className="card-title">Email</h5>
                  <p className="card-text text-muted">
                    info@hotelreservation.com<br />
                    booking@hotelreservation.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#343a40', 
        color: '#fff', 
        padding: '2rem 0',
        marginTop: 'auto' 
      }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0">
                © {new Date().getFullYear()} Hotel Reservation. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <Dialog 
        open={openBookingModal} 
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: '15px',
            padding: '20px'
          }
        }}
      >
        <DialogTitle>
          Booking Kamar {selectedRoom?.room_type}
        </DialogTitle>
        <form onSubmit={handleBookingSubmit}>
          <DialogContent>
            <div className="row g-3">
              <div className="col-md-6">
                <TextField
                  required
                  fullWidth
                  label="Nama Lengkap"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  required
                  fullWidth
                  label="Nomor Telepon"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Check In"
                  InputLabelProps={{ shrink: true }}
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                />
              </div>
              <div className="col-md-6">
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Check Out"
                  InputLabelProps={{ shrink: true }}
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="inherit">
              Batal
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              style={{
                background: 'linear-gradient(45deg, #2196F3, #1976D2)',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
              }}
            >
              Konfirmasi Booking
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default SearchRoom;