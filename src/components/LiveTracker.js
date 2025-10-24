import React, { useState, useEffect } from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import GroupsIcon from '@mui/icons-material/Groups';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useVisitors } from '../context/VisitorContext';

const LiveTracker = () => {
  const { visitors, staff, rooms } = useVisitors();
  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const checkedInVisitors = visitors.filter(v => v.status === 'Checked In').length;
  const activeStaff = staff.filter(s => s.status === 'In Office').length;
  const totalPeople = checkedInVisitors + activeStaff;
  const totalCapacity = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const occupancyPercentage = (totalPeople / totalCapacity) * 100;

  const TrackerCard = ({ title, count, icon, color, bgColor }) => (
    <Card sx={{ height: '100%', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: bgColor,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 500, fontSize: '0.7rem' }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: color, mt: 0.5 }}>
              {count}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
              Live Tracker
            </Typography>
            <FiberManualRecordIcon sx={{ fontSize: 12, color: '#4caf50', animation: 'pulse 2s infinite' }} />
          </Box>
          <Typography variant="caption" color="text.secondary">
            Real-time occupancy monitoring • {liveTime.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TrackerCard
            title="Visitors Inside"
            count={checkedInVisitors}
            icon={<PersonIcon sx={{ fontSize: 24, color: '#2196f3' }} />}
            color="#2196f3"
            bgColor="#e3f2fd"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TrackerCard
            title="Staff In Office"
            count={activeStaff}
            icon={<BadgeIcon sx={{ fontSize: 24, color: '#ff9800' }} />}
            color="#ff9800"
            bgColor="#fff3e0"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TrackerCard
            title="Total People"
            count={totalPeople}
            icon={<GroupsIcon sx={{ fontSize: 24, color: '#9c27b0' }} />}
            color="#9c27b0"
            bgColor="#f3e5f5"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#666' }}>
            Building Occupancy
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
            {totalPeople} / {totalCapacity} ({occupancyPercentage.toFixed(1)}%)
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={Math.min(occupancyPercentage, 100)}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              borderRadius: 4,
              backgroundColor: occupancyPercentage > 80 ? '#f44336' : occupancyPercentage > 60 ? '#ff9800' : '#4caf50',
            },
          }}
        />
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.4;
            }
          }
        `}
      </style>
    </Paper>
  );
};

export default LiveTracker;
