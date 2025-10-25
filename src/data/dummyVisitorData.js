// Consistent dummy data for Visitor Portal
export const visitorStats = {
  todaysVisitors: 42,
  pendingApprovals: 7,
  approvedVisits: 15,
  totalThisMonth: 128,
};

export const visitorCheckIns = [
  {
    id: 1,
    name: 'John Doe',
    purpose: 'Investor Meeting',
    date: '2025-10-25',
    time: '09:30',
    checkoutTime: '10:15',
    status: 'Approved',
    resident: 'Startup Alpha',
  },
  {
    id: 2,
    name: 'Alice Smith',
    purpose: 'Delivery',
    date: '2025-10-25',
    time: '10:00',
    checkoutTime: '10:30',
    status: 'Approved',
    resident: 'Startup Beta',
  },
  {
    id: 3,
    name: 'Bob Lee',
    purpose: 'Mentor Session',
    date: '2025-10-25',
    time: '11:00',
    checkoutTime: '11:45',
    status: 'Pending',
    resident: 'Startup Gamma',
  },
  {
    id: 4,
    name: 'Clara Jones',
    purpose: 'Client Visit',
    date: '2025-10-25',
    time: '12:30',
    checkoutTime: '13:00',
    status: 'Approved',
    resident: 'Startup Alpha',
  },
  {
    id: 5,
    name: 'David Kim',
    purpose: 'Delivery',
    date: '2025-10-25',
    time: '14:00',
    checkoutTime: '14:20',
    status: 'Approved',
    resident: 'Startup Beta',
  },
];

export const dailyVisitorData = [
  { day: 'Mon', visitors: 10 },
  { day: 'Tue', visitors: 15 },
  { day: 'Wed', visitors: 7 },
  { day: 'Thu', visitors: 20 },
  { day: 'Fri', visitors: 12 },
  { day: 'Sat', visitors: 8 },
  { day: 'Sun', visitors: 5 },
];

export const visitorTypeData = [
  { name: 'Clients', value: 40, color: '#3b82f6' },
  { name: 'Investors', value: 30, color: '#10b981' },
  { name: 'Delivery', value: 30, color: '#f59e0b' },
];

export const weeklyTrendData = [
  { day: 'Mon', visits: 10 },
  { day: 'Tue', visits: 15 },
  { day: 'Wed', visits: 7 },
  { day: 'Thu', visits: 20 },
  { day: 'Fri', visits: 12 },
  { day: 'Sat', visits: 8 },
  { day: 'Sun', visits: 5 },
];
