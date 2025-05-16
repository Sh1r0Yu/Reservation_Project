import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Paper,
  Divider
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import AdminSidebar from '../../components/shared/AdminSidebar';
import api from '../../services/api';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Implementasi nanti setelah API notifikasi tersedia
      setNotifications([]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
            Notifikasi
          </Typography>
          
          <Paper sx={{ boxShadow: 3 }}>
            <List>
              {notifications.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="Tidak ada notifikasi"
                    sx={{ textAlign: 'center', color: '#666' }}
                  />
                </ListItem>
              ) : (
                notifications.map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <ListItem>
                      <ListItemIcon>
                        <NotificationsIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={notification.message}
                        secondary={new Date(notification.createdAt).toLocaleString()}
                      />
                    </ListItem>
                    {index < notifications.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </List>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Notifications;