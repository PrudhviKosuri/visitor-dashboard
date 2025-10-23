import React, { useState } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Typography,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle,
  ExitToApp,
  QrCode,
  Face,
  Edit,
  Search,
  Refresh,
} from '@mui/icons-material';
import { useVisitors } from '../context/VisitorContext';
import { format, isToday } from 'date-fns';

const VisitorTable = () => {
  const { visitors, checkOutVisitor } = useVisitors();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  // Filter visitors based on selected criteria
  const filteredVisitors = visitors.filter(visitor => {
    // Status filter
    if (filter !== 'all' && visitor.status.toLowerCase() !== filter) {
      return false;
    }

    // Date filter
    if (dateFilter === 'today' && !isToday(visitor.checkInTime)) {
      return false;
    }

    // Search filter
    if (searchTerm && !visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !visitor.host.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  });

  const handleCheckOut = (visitorId) => {
    checkOutVisitor(visitorId);
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'QR Code':
        return <QrCode fontSize="small" />;
      case 'Face Recognition':
        return <Face fontSize="small" />;
      default:
        return <Edit fontSize="small" />;
    }
  };

  const getStatusChip = (status) => {
    return (
      <Chip
        label={status}
        color={status === 'Checked-in' ? 'success' : 'default'}
        size="small"
        icon={status === 'Checked-in' ? <CheckCircle /> : <ExitToApp />}
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Visitor Management
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search visitors..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          
          <TextField
            select
            label="Status"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="checked-in">Checked-in</MenuItem>
            <MenuItem value="checked-out">Checked-out</MenuItem>
          </TextField>

          <TextField
            select
            label="Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="all">All Dates</MenuItem>
          </TextField>

          <Typography variant="body2" color="textSecondary">
            Showing {filteredVisitors.length} of {visitors.length} visitors
          </Typography>
        </Box>
      </Paper>

      {/* Visitor Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Visitor Name</strong></TableCell>
              <TableCell><strong>Company/Purpose</strong></TableCell>
              <TableCell><strong>Host/Resident</strong></TableCell>
              <TableCell><strong>Check-in Time</strong></TableCell>
              <TableCell><strong>Check-out Time</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Method</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVisitors.map((visitor) => (
              <TableRow 
                key={visitor.id}
                sx={{ 
                  '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                  '&:hover': { backgroundColor: '#f0f0f0' }
                }}
              >
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {visitor.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {visitor.company}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {visitor.purpose}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{visitor.host}</TableCell>
                <TableCell>
                  {format(visitor.checkInTime, 'MMM dd, yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  {visitor.checkOutTime 
                    ? format(visitor.checkOutTime, 'MMM dd, yyyy HH:mm')
                    : '-'
                  }
                </TableCell>
                <TableCell>
                  {getStatusChip(visitor.status)}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getMethodIcon(visitor.method)}
                    <Typography variant="caption">
                      {visitor.method}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {visitor.status === 'Checked-in' ? (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<ExitToApp />}
                      onClick={() => handleCheckOut(visitor.id)}
                    >
                      Check Out
                    </Button>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      Completed
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredVisitors.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="textSecondary">
                    No visitors found matching your criteria
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}>
        <Typography variant="body2" color="textSecondary">
          <strong>Live Updates:</strong> This table refreshes automatically every 30 seconds. 
          Current visitors inside: {filteredVisitors.filter(v => v.status === 'Checked-in').length}
        </Typography>
      </Box>
    </Container>
  );
};

export default VisitorTable;
