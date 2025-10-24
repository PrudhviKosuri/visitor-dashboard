import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  Menu,
  InputAdornment,
  IconButton,
  Tooltip,
  Collapse,
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
import { format, isToday, isSameDay } from 'date-fns';

const VisitorTable = () => {
  const { visitors, checkOutVisitor } = useVisitors();
  const location = useLocation();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');
  const [selectedDate, setSelectedDate] = useState('');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [companyAnchor, setCompanyAnchor] = useState(null);
  const [methodAnchor, setMethodAnchor] = useState(null);

  // Sync search bar with `q` query param for deep links and navbar search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchTerm(q);
  }, [location.search]);

  // Base filters (exclude company/method so option lists can adapt)
  const baseFiltered = useMemo(() => visitors.filter(visitor => {
    // Normalize status values e.g., 'Checked In' or 'Checked-in' -> 'checkedin'
    const normalize = (s) => s.toLowerCase().replace(/[\s-]/g, '');
    const vStatus = normalize(visitor.status);
    // Status filter
    if (filter !== 'all' && vStatus !== filter) {
      return false;
    }

    // Date filter
    if (dateFilter === 'today' && !isToday(visitor.checkInTime)) {
      return false;
    }
    if (dateFilter === 'specific') {
      if (!selectedDate) return false;
      const sel = new Date(selectedDate);
      if (!isSameDay(visitor.checkInTime, sel)) return false;
    }

    // Search filter
    if (searchTerm && !visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !visitor.host.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    return true;
  }), [visitors, filter, dateFilter, selectedDate, searchTerm]);

  // Derive dynamic option lists based on the opposite filter and base filters
  const availableCompanyOptions = useMemo(() => {
    const counts = new Map();
    baseFiltered
      .filter(v => methodFilter === 'all' || v.method === methodFilter)
      .forEach(v => counts.set(v.company, (counts.get(v.company) || 0) + 1));
    return Array.from(counts.entries()) // [company, count]
      .filter(([, count]) => count > 0)
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [baseFiltered, methodFilter]);

  const availableMethodOptions = useMemo(() => {
    const counts = new Map();
    baseFiltered
      .filter(v => companyFilter === 'all' || v.company === companyFilter)
      .forEach(v => counts.set(v.method, (counts.get(v.method) || 0) + 1));
    return Array.from(counts.entries()) // [method, count]
      .filter(([, count]) => count > 0)
      .sort((a, b) => a[0].localeCompare(b[0]));
  }, [baseFiltered, companyFilter]);

  // Auto-reset selections that are no longer valid
  useEffect(() => {
    if (companyFilter !== 'all' && !availableCompanyOptions.some(([c]) => c === companyFilter)) {
      setCompanyFilter('all');
    }
  }, [availableCompanyOptions, companyFilter]);

  useEffect(() => {
    if (methodFilter !== 'all' && !availableMethodOptions.some(([m]) => m === methodFilter)) {
      setMethodFilter('all');
    }
  }, [availableMethodOptions, methodFilter]);

  // Final filtered list applying dynamic company/method filters
  const filteredVisitors = useMemo(() => baseFiltered.filter(visitor => {
    if (companyFilter !== 'all' && visitor.company !== companyFilter) return false;
    if (methodFilter !== 'all' && visitor.method !== methodFilter) return false;
    return true;
  }), [baseFiltered, companyFilter, methodFilter]);

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
    const normalized = status.toLowerCase().replace(/[\s-]/g, '');
    return (
      <Chip
        label={status}
        color={normalized === 'checkedin' ? 'success' : normalized === 'checkedout' ? 'error' : normalized === 'pending' ? 'warning' : 'default'}
        size="small"
        icon={normalized === 'checkedin' ? <CheckCircle /> : <ExitToApp />}
      />
    );
  };

  const uniqueCompanies = availableCompanyOptions.map(([c]) => c);
  const uniqueMethods = availableMethodOptions.map(([m]) => m);

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
            <MenuItem value="checkedin">Checked-in</MenuItem>
            <MenuItem value="checkedout">Checked-out</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </TextField>

          <TextField
            select
            label="Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="all">All Dates</MenuItem>
            <MenuItem value="specific">Specific Date</MenuItem>
          </TextField>
          <Collapse in={dateFilter === 'specific'} timeout={250} orientation="horizontal">
            <TextField
              label="Select date"
              type="date"
              size="medium"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ ml: 1, minWidth: 240 }}
              required
              fullWidth={false}
            />
          </Collapse>

          <Typography variant="body2" color="textSecondary">
            Showing {filteredVisitors.length} of {visitors.length} visitors
          </Typography>
        </Box>
      </Paper>

      {/* Visitor Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Visitor Name</strong></TableCell>
              <TableCell>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                  <strong>Company/Purpose</strong>
                  <Button size="small" variant="text" onClick={(e) => setCompanyAnchor(e.currentTarget)}>
                    {companyFilter === 'all' ? 'All' : companyFilter}
                  </Button>
                  <Menu
                    anchorEl={companyAnchor}
                    open={Boolean(companyAnchor)}
                    onClose={() => setCompanyAnchor(null)}
                  >
                    <MenuItem onClick={() => { setCompanyFilter('all'); setCompanyAnchor(null); }}>All</MenuItem>
                    {availableCompanyOptions.map(([c, count]) => (
                      <MenuItem key={c} onClick={() => { setCompanyFilter(c); setCompanyAnchor(null); }}>{c}</MenuItem>
                    ))}
                  </Menu>
                </Box>
              </TableCell>
              <TableCell><strong>Host/Resident</strong></TableCell>
              <TableCell><strong>Check-in Time</strong></TableCell>
              <TableCell><strong>Check-out Time</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                  <strong>Method</strong>
                  <Button size="small" variant="text" onClick={(e) => setMethodAnchor(e.currentTarget)}>
                    {methodFilter === 'all' ? 'All' : methodFilter}
                  </Button>
                  <Menu
                    anchorEl={methodAnchor}
                    open={Boolean(methodAnchor)}
                    onClose={() => setMethodAnchor(null)}
                  >
                    <MenuItem onClick={() => { setMethodFilter('all'); setMethodAnchor(null); }}>All</MenuItem>
                    {availableMethodOptions.map(([m, count]) => (
                      <MenuItem key={m} onClick={() => { setMethodFilter(m); setMethodAnchor(null); }}>{m}</MenuItem>
                    ))}
                  </Menu>
                </Box>
              </TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVisitors.map((visitor) => (
              <TableRow 
                key={visitor.id}
                sx={{ 
                  '&:hover': { backgroundColor: (theme) => theme.palette.action.hover }
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
                  <Typography variant="caption" color="textSecondary">—</Typography>
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
          Current visitors inside: {filteredVisitors.filter(v => v.status.toLowerCase().replace(/[\s-]/g, '') === 'checkedin').length}
        </Typography>
      </Box>
    </Container>
  );
};

export default VisitorTable;
