// Consistent dummy data for Admin Portal
export const adminStats = {
  totalVisitorsToday: 42,
  totalActiveResidents: 10,
  currentOccupancy: 32,
  watchlistAlerts: 3,
};

export const liveOccupancyData = [
  {
    id: 1,
    name: 'John Doe',
    resident: 'Startup Alpha',
    purpose: 'Investor Meeting',
    checkInTime: '09:30',
    checkOutTime: '10:15',
    status: 'Approved',
  },
  {
    id: 2,
    name: 'Alice Smith',
    resident: 'Startup Beta',
    purpose: 'Delivery',
    checkInTime: '10:00',
    checkOutTime: '10:30',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Bob Lee',
    resident: 'Startup Gamma',
    purpose: 'Mentor Session',
    checkInTime: '11:00',
    checkOutTime: '11:45',
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Clara Jones',
    resident: 'Startup Alpha',
    purpose: 'Client Visit',
    checkInTime: '12:30',
    checkOutTime: '13:00',
    status: 'Approved',
  },
  {
    id: 5,
    name: 'David Kim',
    resident: 'Startup Beta',
    purpose: 'Delivery',
    checkInTime: '14:00',
    checkOutTime: '14:20',
    status: 'Approved',
  },
];

export const visitorFrequencyData = [
  { day: 'Mon', visitors: 10 },
  { day: 'Tue', visitors: 15 },
  { day: 'Wed', visitors: 7 },
  { day: 'Thu', visitors: 20 },
  { day: 'Fri', visitors: 12 },
];

export const topStartupsData = [
  { name: 'Alpha', visits: 12, color: '#3b82f6' },
  { name: 'Beta', visits: 10, color: '#10b981' },
  { name: 'Gamma', visits: 8, color: '#f59e0b' },
  { name: 'Delta', visits: 5, color: '#8b5cf6' },
  { name: 'Epsilon', visits: 3, color: '#ec4899' },
];

export const peakHoursData = [
  { hour: '9am', visitors: 5 },
  { hour: '10am', visitors: 8 },
  { hour: '11am', visitors: 7 },
  { hour: '12pm', visitors: 6 },
  { hour: '1pm', visitors: 10 },
  { hour: '2pm', visitors: 8 },
  { hour: '3pm', visitors: 5 },
  { hour: '4pm', visitors: 4 },
];

export const residentManagementData = [
  {
    id: 1,
    name: 'Alpha Startup',
    members: 5,
    status: 'Active',
    joinDate: '2024-01-15',
    totalVisitors: 45,
  },
  {
    id: 2,
    name: 'Beta Startup',
    members: 3,
    status: 'Active',
    joinDate: '2024-03-20',
    totalVisitors: 32,
  },
  {
    id: 3,
    name: 'Gamma Startup',
    members: 2,
    status: 'Inactive',
    joinDate: '2024-05-10',
    totalVisitors: 18,
  },
  {
    id: 4,
    name: 'Delta Startup',
    members: 4,
    status: 'Active',
    joinDate: '2024-07-01',
    totalVisitors: 28,
  },
];

export const reportsData = {
  dateRange: '2025-10-01 to 2025-10-25',
  totalVisitors: 128,
  averageVisitsPerDay: 5.12,
  peakDay: 'Thursday',
  mostVisitedResident: 'Startup Alpha',
  filters: {
    dateRange: 'Last 30 days',
    resident: 'All',
    visitorType: 'All',
  },
};
