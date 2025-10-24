import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Badge, Avatar, InputBase, Menu, MenuItem, ListItemText } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ApprovalIcon from '@mui/icons-material/Approval';
import BarChartIcon from '@mui/icons-material/BarChart';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [notifAnchor, setNotifAnchor] = useState(null);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: null },
    { path: '/visitors', label: 'Visitors', icon: null },
    { path: '/events', label: 'Events', icon: null },
    { path: '/analytics', label: 'Analytics', icon: null },
    { path: '/devices', label: 'Kiosks', icon: null },
  ];

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar sx={{ minHeight: '64px', px: 3 }}>
        {/* Logo and Branding */}
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', mr: 4, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          <BusinessIcon sx={{ fontSize: 28, mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, letterSpacing: '0.5px' }}>
            InnoHub VMS
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              component={Link}
              to={item.path}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                px: 2.5,
                py: 1,
                borderRadius: 1,
                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.15)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right side actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 1,
              px: 2,
              py: 0.5,
              mr: 1,
            }}
          >
            <SearchIcon sx={{ fontSize: 20, mr: 1, color: 'rgba(255,255,255,0.7)' }} />
            <InputBase
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/visitors?q=${encodeURIComponent(search)}`);
                }
              }}
              sx={{
                color: 'white',
                '& ::placeholder': {
                  color: 'rgba(255,255,255,0.7)',
                  opacity: 1,
                },
                fontSize: '0.9rem',
                width: '120px',
              }}
            />
          </Box>

          {/* Notification Bell */}
          <IconButton color="inherit" size="medium" onClick={(e) => setNotifAnchor(e.currentTarget)}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={() => setNotifAnchor(null)}
          >
            <MenuItem onClick={() => { setNotifAnchor(null); navigate('/visitors'); }}>
              <ListItemText primary="3 new visitor check-ins" secondary="Just now" />
            </MenuItem>
            <MenuItem onClick={() => { setNotifAnchor(null); navigate('/devices'); }}>
              <ListItemText primary="Kiosk A is online" secondary="5m ago" />
            </MenuItem>
            <MenuItem onClick={() => { setNotifAnchor(null); navigate('/events'); }}>
              <ListItemText primary="Event request submitted" secondary="12m ago" />
            </MenuItem>
          </Menu>


          {/* Settings (direct navigation) */}
          <IconButton color="inherit" size="medium" onClick={() => navigate('/settings')}>
            <SettingsIcon />
          </IconButton>

          {/* User Avatar (direct navigation) */}
          <IconButton onClick={() => navigate('/profile')} sx={{ p: 0, ml: 1 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#3f5c85',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              {(user?.name?.[0] || 'U').toUpperCase()}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
