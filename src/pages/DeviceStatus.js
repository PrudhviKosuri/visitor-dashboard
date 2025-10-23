import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  Error,
  DevicesOther,
  LocationOn,
  AccessTime,
  Wifi,
  WifiOff,
} from '@mui/icons-material';
import { useVisitors } from '../context/VisitorContext';
import { format, formatDistanceToNow } from 'date-fns';

const DeviceStatus = () => {
  const { devices } = useVisitors();

  const onlineDevices = devices.filter(device => device.status === 'Online').length;
  const totalDevices = devices.length;
  const healthPercentage = (onlineDevices / totalDevices) * 100;

  const getStatusIcon = (status) => {
    return status === 'Online' ? (
      <Wifi color="success" />
    ) : (
      <WifiOff color="error" />
    );
  };

  const getStatusChip = (status) => {
    return (
      <Chip
        icon={status === 'Online' ? <CheckCircle /> : <Error />}
        label={status}
        color={status === 'Online' ? 'success' : 'error'}
        variant="outlined"
        size="small"
      />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Device & Kiosk Status
      </Typography>
      
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Monitor the status of all visitor management devices and kiosks
      </Typography>

      {/* System Health Overview */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          System Health Overview
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {onlineDevices} of {totalDevices} devices online
          </Typography>
          <Chip 
            label={`${healthPercentage.toFixed(0)}% Healthy`}
            color={healthPercentage >= 80 ? 'success' : healthPercentage >= 60 ? 'warning' : 'error'}
          />
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={healthPercentage} 
          sx={{ height: 10, borderRadius: 5 }}
          color={healthPercentage >= 80 ? 'success' : healthPercentage >= 60 ? 'warning' : 'error'}
        />
      </Paper>

      {/* Alerts */}
      {devices.some(device => device.status === 'Offline') && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Some devices are offline. Please check the connection and restart if necessary.
        </Alert>
      )}

      {/* Device Cards */}
      <Grid container spacing={3}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={device.id}>
            <Card 
              sx={{ 
                height: '100%',
                border: device.status === 'Offline' ? '2px solid #f44336' : '1px solid #e0e0e0',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DevicesOther sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6" component="div">
                      {device.name}
                    </Typography>
                  </Box>
                  {getStatusChip(device.status)}
                </Box>

                <List dense>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <LocationOn fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Location"
                      secondary={device.location}
                    />
                  </ListItem>
                  
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <AccessTime fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Last Ping"
                      secondary={`${format(device.lastPing, 'HH:mm:ss')} (${formatDistanceToNow(device.lastPing)} ago)`}
                    />
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {getStatusIcon(device.status)}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Connection"
                      secondary={device.status === 'Online' ? 'Connected' : 'Disconnected'}
                    />
                  </ListItem>
                </List>

                {device.status === 'Offline' && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    Device has been offline for more than 5 minutes. Please check the connection.
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Device Management Instructions */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          Device Management Guide
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Online Devices
            </Typography>
            <Typography variant="body2" paragraph>
              • Receiving data and functioning normally
              • Auto-refresh every 30 seconds
              • Ready for visitor check-ins
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Offline Devices
            </Typography>
            <Typography variant="body2" paragraph>
              • Check network connectivity
              • Restart the device if necessary
              • Contact IT support if issue persists
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DeviceStatus;
