import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <NotificationsIcon sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            color="inherit"
            startIcon={<NotificationsIcon />}
            onClick={() => navigate('/')}
            sx={{
              fontWeight: location.pathname === '/' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/' ? '2px solid white' : 'none'
            }}
          >
            All
          </Button>
          <Button
            color="inherit"
            startIcon={<StarIcon />}
            onClick={() => navigate('/priority')}
            sx={{
              fontWeight: location.pathname === '/priority' ? 'bold' : 'normal',
              borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none'
            }}
          >
            Priority
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;