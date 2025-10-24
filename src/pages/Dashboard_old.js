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
import { format, isToday } from 'date-fns';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import RefreshIcon from '@mui/icons-material/Refresh';

const Dashboard = () => {
  const { visitors } = useVisitors();

  // Calculate statistics
  const allVisitors = visitors.length; // Total from all time for demo (1,247 in screenshot)
  const todayVisitors = visitors.filter(visitor => isToday(visitor.checkInTime));
  const currentVisitorsInside = visitors.filter(visitor => visitor.status === 'Checked In').length;
  const totalVisitorsCount = 1247; // Mock number from screenshot

  // Peak hours data
  const hourlyData = Array.from({ length: 24 }, (_, hour) => {
    const count = todayVisitors.filter(visitor => 
      visitor.checkInTime.getHours() === hour
    ).length;
    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      visitors: count,
    };
  }).filter(data => data.visitors > 0);

  // Visitor type distribution
  const purposeData = todayVisitors.reduce((acc, visitor) => {
    const purpose = visitor.purpose || 'Other';
    acc[purpose] = (acc[purpose] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(purposeData).map(([purpose, count]) => ({
    name: purpose,
    value: count,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {title}
            </Typography>
            <Typography variant="h4" component="div" color={color}>
              {value}
            </Typography>
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Visitors Today"
            value={totalTodayVisitors}
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Visitors Inside"
            value={currentVisitorsInside}
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Peak Hour Today"
            value={hourlyData.length > 0 ? hourlyData.reduce((max, curr) => 
              curr.visitors > max.visitors ? curr : max
            ).hour : 'N/A'}
            icon={<AccessTimeIcon sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Unique Companies"
            value={new Set(todayVisitors.map(v => v.company)).size}
            icon={<BusinessIcon sx={{ fontSize: 40 }} />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Hourly Visitor Traffic
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Visit Purpose Distribution
            </Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Check-ins
        </Typography>
        {todayVisitors.slice(0, 5).map(visitor => (
          <Box
            key={visitor.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              borderBottom: '1px solid #eee',
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight="medium">
                {visitor.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {visitor.company} - Host: {visitor.host}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2">
                {format(visitor.checkInTime, 'HH:mm')}
              </Typography>
              <Typography
                variant="caption"
                color={visitor.status === 'Checked-in' ? 'success.main' : 'text.secondary'}
              >
                {visitor.status}
              </Typography>
            </Box>
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default Dashboard;
