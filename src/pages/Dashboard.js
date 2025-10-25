import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useVisitors } from '../context/VisitorContext';
import { format } from 'date-fns';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LiveTracker from '../components/LiveTracker';
import RoomAnalytics from '../components/RoomAnalytics';
import SpotRegistration from '../components/SpotRegistration';
import { adminStats, liveOccupancyData, visitorFrequencyData, peakHoursData } from '../data/dummyAdminData';

const Dashboard = () => {
  const { visitors } = useVisitors();

  // Use consistent dummy data from centralized file
  const currentVisitorsInside = adminStats.currentOccupancy;
  const peakHour = '1pm';
  const avgVisitorsPerHour = 8;

  // Using imported data
  const hourlyData = peakHoursData.map(item => ({
    hour: item.hour,
    visitors: item.visitors
  }));

  // Get recent visitors from dummy data and map to expected format
  const recentVisitors = liveOccupancyData.slice(0, 5).map(visitor => ({
    id: visitor.id,
    name: visitor.name,
    email: `${visitor.name.toLowerCase().replace(' ', '.')}@example.com`,
    company: visitor.resident,
    purpose: visitor.purpose,
    host: visitor.resident,
    checkInTime: new Date(`2025-10-25 ${visitor.checkInTime}`),
    status: visitor.status === 'Approved' ? 'Checked In' : 'Pending',
  }));

  // Helper function to get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Helper function to get avatar color
  const getAvatarColor = (name) => {
    const colors = ['#1e3a5f', '#2c5aa0', '#3498db', '#5f9ea0', '#4682b4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const StatCard = ({ title, value, subtitle, icon, iconBg }) => (
    <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ mt: 1, mb: 0.5, fontWeight: 600, color: '#1e3a5f' }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 14, mr: 0.5 }} />
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              backgroundColor: iconBg || '#e3f2fd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, px: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1e3a5f', mb: 0.5 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome to your visitor management dashboard
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="TOTAL VISITORS TODAY"
            value={adminStats.totalVisitorsToday}
            subtitle="+12% from last month"
            icon={<PeopleIcon sx={{ fontSize: 32, color: '#1e3a5f' }} />}
            iconBg="#e8eef5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="ACTIVE RESIDENTS"
            value={adminStats.totalActiveResidents}
            subtitle="Startup members"
            icon={<GroupIcon sx={{ fontSize: 32, color: '#4caf50' }} />}
            iconBg="#e8f5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="CURRENT OCCUPANCY"
            value={adminStats.currentOccupancy}
            subtitle={`Peak at ${peakHour}`}
            icon={<AccessTimeIcon sx={{ fontSize: 32, color: '#ff9800' }} />}
            iconBg="#fff3e0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="WATCHLIST ALERTS"
            value={adminStats.watchlistAlerts}
            subtitle="Requires attention"
            icon={<BarChartIcon sx={{ fontSize: 32, color: '#9c27b0' }} />}
            iconBg="#f3e5f5"
          />
        </Grid>
      </Grid>

      {/* Live Tracker */}
      <LiveTracker />

      {/* Room Analytics */}
      <RoomAnalytics />

      {/* Spot Registration and Quick Actions */}
      <SpotRegistration />

      {/* Visitor Statistics Chart */}
      <Paper sx={{ p: 3, mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
              Visitor Statistics
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small">
              <RefreshIcon />
            </IconButton>
            <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
              View
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="hour" 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '12px', fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                style={{ fontSize: '12px', fill: '#666' }}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(30, 58, 95, 0.1)' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}
              />
              <Bar 
                dataKey="visitors" 
                fill="#1e3a5f" 
                radius={[8, 8, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Recent Visitors Table */}
      <Paper sx={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a5f' }}>
            Recent Visitors
          </Typography>
          <Button 
            endIcon={<ArrowForwardIcon />} 
            sx={{ textTransform: 'none', color: '#1e3a5f', fontWeight: 600 }}
          >
            View All
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#fafafa' }}>
                <TableCell sx={{ fontWeight: 600, color: '#666' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666' }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666' }}>Host</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666' }}>Check-in Time</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#666' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentVisitors.length > 0 ? (
                recentVisitors.map((visitor) => (
                  <TableRow key={visitor.id} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: getAvatarColor(visitor.name),
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          {getInitials(visitor.name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {visitor.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {visitor.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {visitor.company}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {visitor.purpose}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{visitor.host}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {format(visitor.checkInTime, 'hh:mm a')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={visitor.status}
                        size="small"
                        sx={{
                          backgroundColor: visitor.status === 'Checked In' ? '#e8f5e9' : '#f5f5f5',
                          color: visitor.status === 'Checked In' ? '#2e7d32' : '#666',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      No recent visitors
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Dashboard;
