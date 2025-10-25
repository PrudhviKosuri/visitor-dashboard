import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { useVisitors } from '../context/VisitorContext';

const RoomAnalytics = () => {
  const { rooms } = useVisitors();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return { bg: '#e8f5e9', color: '#2e7d32' };
      case 'Occupied':
        return { bg: '#fff3e0', color: '#ed6c02' };
      case 'Full':
        return { bg: '#ffebee', color: '#d32f2f' };
      default:
        return { bg: '#f5f5f5', color: '#666' };
    }
  };

  const availableRooms = rooms.filter(r => r.status === 'Available').length;
  const occupiedRooms = rooms.filter(r => r.status === 'Occupied').length;
  const fullRooms = rooms.filter(r => r.status === 'Full').length;

  return (
    <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
            Room Analytics
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Meeting room occupancy and availability
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={`${availableRooms} Available`} size="small" color="success" variant="outlined" />
          <Chip label={`${occupiedRooms} Occupied`} size="small" color="warning" variant="outlined" />
          <Chip label={`${fullRooms} Full`} size="small" color="error" variant="outlined" />
        </Box>
      </Box>

      <Grid container spacing={2}>
        {rooms.map((room) => {
          const occupancyPercentage = (room.currentOccupancy / room.capacity) * 100;
          const statusColors = getStatusColor(room.status);

          return (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <Card sx={{ height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #f0f0f0' }}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MeetingRoomIcon sx={{ fontSize: 20, color: '#1e3a5f' }} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
                        {room.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={room.status}
                      size="small"
                      sx={{
                        backgroundColor: statusColors.bg,
                        color: statusColors.color,
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: 20,
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <EventSeatIcon sx={{ fontSize: 16, color: '#666' }} />
                    <Typography variant="caption" color="text.secondary">
                      {room.currentOccupancy} / {room.capacity} seats
                    </Typography>
                  </Box>

                  <Box>
                    <LinearProgress
                      variant="determinate"
                      value={occupancyPercentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          backgroundColor:
                            occupancyPercentage >= 100
                              ? '#d32f2f'
                              : occupancyPercentage >= 60
                              ? '#ed6c02'
                              : '#2e7d32',
                        },
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        fontWeight: 600,
                        color: '#666',
                      }}
                    >
                      {occupancyPercentage.toFixed(0)}% occupied
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default RoomAnalytics;
