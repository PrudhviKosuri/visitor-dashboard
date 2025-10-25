// Consistent dummy data for Resident Portal
export const residentStats = {
  todaysVisitors: 42,
  pendingRequests: 7,
  approvedVisits: 15,
  totalThisMonth: 128,
};

export const visitorRequests = [
  {
    id: 1,
    name: 'John Doe',
    purpose: 'Investor Meeting',
    date: '2025-10-25',
    time: '09:30',
    status: 'Approved',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8901',
  },
  {
    id: 2,
    name: 'Alice Smith',
    purpose: 'Delivery',
    date: '2025-10-25',
    time: '10:00',
    status: 'Approved',
    email: 'alice.smith@example.com',
    phone: '+1 234-567-8902',
  },
  {
    id: 3,
    name: 'Bob Lee',
    purpose: 'Mentor Session',
    date: '2025-10-25',
    time: '11:00',
    status: 'Pending',
    email: 'bob.lee@example.com',
    phone: '+1 234-567-8903',
  },
  {
    id: 4,
    name: 'Clara Jones',
    purpose: 'Client Visit',
    date: '2025-10-25',
    time: '12:30',
    status: 'Approved',
    email: 'clara.jones@example.com',
    phone: '+1 234-567-8904',
  },
  {
    id: 5,
    name: 'David Kim',
    purpose: 'Delivery',
    date: '2025-10-25',
    time: '14:00',
    status: 'Approved',
    email: 'david.kim@example.com',
    phone: '+1 234-567-8905',
  },
];

export const recentInvitations = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    purpose: 'Investor Meeting',
    date: '2025-10-25',
    time: '09:30',
    status: 'Accepted',
  },
  {
    id: 2,
    name: 'Clara Jones',
    email: 'clara.jones@example.com',
    purpose: 'Client Visit',
    date: '2025-10-25',
    time: '12:30',
    status: 'Accepted',
  },
  {
    id: 3,
    name: 'Bob Lee',
    email: 'bob.lee@example.com',
    purpose: 'Mentor Session',
    date: '2025-10-25',
    time: '11:00',
    status: 'Pending',
  },
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

export const visitorTypeData = [
  { name: 'Clients', value: 40, color: '#3b82f6' },
  { name: 'Investors', value: 30, color: '#10b981' },
  { name: 'Delivery', value: 30, color: '#f59e0b' },
];
