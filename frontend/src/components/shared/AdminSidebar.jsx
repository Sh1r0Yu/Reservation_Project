import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import { Dashboard, Hotel, BookOnline, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function AdminSidebar() {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin/dashboard' },
    { text: 'Kamar', icon: <Hotel />, path: '/admin/rooms' },
    { text: 'Reservasi', icon: <BookOnline />, path: '/admin/reservations' },
    { text: 'Notifikasi', icon: <Notifications />, path: '/admin/notifications' }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#1976d2',
          color: 'white'
        }
      }}
    >
      <Box sx={{ width: 240, mt: 8 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default AdminSidebar;