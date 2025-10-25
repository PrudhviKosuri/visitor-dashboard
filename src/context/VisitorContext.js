import React, { createContext, useContext, useState, useEffect } from 'react';

const VisitorContext = createContext();

export const useVisitors = () => {
  const context = useContext(VisitorContext);
  if (!context) {
    throw new Error('useVisitors must be used within a VisitorProvider');
  }
  return context;
};

// Mock data generator
const generateMockVisitors = () => {
  const companies = [
    'Tech Corp',
    'Tech Solutions Inc.',
    'Acme Corporation',
    'Global Services',
    'Innovate Co.',
    'Software Development',
  ];
  const hosts = [
    'Sarah Wilson',
    'Robert Brown',
    'Emily White',
    'Sarah Green',
    'David Lee',
    'Alice Smith',
  ];
  const firstNames = ['Jane', 'John', 'Michael', 'Lisa', 'Sarah', 'James', 'Emily', 'David', 'Jennifer', 'Robert'];
  const lastNames = ['Smith', 'Doe', 'Chen', 'Anderson', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson'];
  const methods = ['QR Code', 'Face Recognition', 'Manual Entry'];
  const purposes = [
    'Business Meeting',
    'Interview',
    'Quarterly Business Review',
    'Project Alpha Meeting',
    'Technical Interview',
    'Partnership Discussion',
  ];

  const visitors = [
    {
      id: 1,
      name: 'Jane Smith',
      email: 'jane.smith@acmecorp.com',
      company: 'Acme Corporation',
      host: 'Robert Brown',
      checkInTime: new Date('2025-10-23T09:05:00'),
      checkOutTime: new Date('2025-10-23T16:30:00'),
      status: 'Checked Out',
      method: 'QR Code',
      purpose: 'Business Meeting',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@techsolutions.io',
      company: 'Tech Solutions Inc.',
      host: 'Emily White',
      checkInTime: new Date('2025-10-23T10:15:00'),
      checkOutTime: null,
      status: 'Checked In',
      method: 'Face Recognition',
      purpose: 'Technical Interview',
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'm.chen@innovate.co',
      company: 'Innovate Co.',
      host: 'Sarah Green',
      checkInTime: new Date('2025-10-24T11:00:00'),
      checkOutTime: null,
      status: 'Pending',
      method: 'Manual Entry',
      purpose: 'Project Alpha Meeting',
    },
    {
      id: 4,
      name: 'Lisa Anderson',
      email: 'lisa.a@globalservice.net',
      company: 'Global Services',
      host: 'David Lee',
      checkInTime: new Date('2025-10-22T14:00:00'),
      checkOutTime: new Date('2025-10-22T15:45:00'),
      status: 'Checked Out',
      method: 'QR Code',
      purpose: 'Quarterly Business Review',
    },
  ];

  // Generate additional random visitors
  for (let i = 5; i <= 20; i++) {
    const checkInTime = new Date();
    checkInTime.setHours(checkInTime.getHours() - Math.floor(Math.random() * 48));
    checkInTime.setMinutes(Math.floor(Math.random() * 60));
    
    const statusRand = Math.random();
    let status, checkOutTime;
    if (statusRand > 0.7) {
      status = 'Checked In';
      checkOutTime = null;
    } else if (statusRand > 0.5) {
      status = 'Pending';
      checkOutTime = null;
    } else {
      status = 'Checked Out';
      checkOutTime = new Date(checkInTime.getTime() + Math.random() * 4 * 60 * 60 * 1000);
    }

    visitors.push({
      id: i,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      email: `visitor${i}@example.com`,
      company: companies[Math.floor(Math.random() * companies.length)],
      host: hosts[Math.floor(Math.random() * hosts.length)],
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      status: status,
      method: methods[Math.floor(Math.random() * methods.length)],
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
    });
  }

  return visitors;
};

const generatePendingApprovals = () => {
  const approvals = [
    {
      id: 100,
      name: 'John Doe',
      company: 'Innovate Corp.',
      purpose: 'Project Alpha Meeting',
      requestedTime: new Date('2025-10-23T10:00:00'),
      host: 'Alice Smith',
      status: 'Pending',
    },
    {
      id: 101,
      name: 'Linda Williams',
      company: 'Solutions Inc.',
      purpose: 'Quarterly Business Review',
      requestedTime: new Date('2025-10-23T14:30:00'),
      host: 'Bob Johnson',
      status: 'Pending',
    },
    {
      id: 102,
      name: 'Michael Klein',
      company: 'Tech Forward',
      purpose: 'Technical Interview',
      requestedTime: new Date('2025-10-24T11:00:00'),
      host: 'Carol White',
      status: 'Pending',
    },
    {
      id: 103,
      name: 'Sarah Page',
      company: 'Data Dynamics',
      purpose: 'Partnership Discussion',
      requestedTime: new Date('2025-10-22T15:00:00'),
      host: 'David Green',
      status: 'Approved',
    },
  ];

  // Add more random approvals
  const names = ['Jennifer Adams', 'Michael Brown', 'Susan Clark', 'Robert Davis', 'Emma White', 'Oliver Green'];
  const companies = ['NewTech Inc', 'Innovation Labs', 'StartupHub', 'TechVentures', 'Global Tech', 'Smart Solutions'];
  const purposes = ['Business Meeting', 'Interview', 'Technical Discussion', 'Partnership Meeting'];
  const hosts = ['John Smith', 'Emily Chen', 'Alex Lee', 'Sarah Wilson'];
  
  for (let i = 104; i < 116; i++) {
    approvals.push({
      id: i,
      name: names[Math.floor(Math.random() * names.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      purpose: purposes[Math.floor(Math.random() * purposes.length)],
      requestedTime: new Date(Date.now() + (Math.random() - 0.5) * 48 * 60 * 60 * 1000),
      host: hosts[Math.floor(Math.random() * hosts.length)],
      status: 'Pending',
    });
  }

  return approvals;
};

const generateDevices = () => {
  return [
    { 
      id: 1, 
      name: 'Lobby Tablet 01', 
      type: 'Tablet',
      status: 'Online', 
      lastPing: new Date(Date.now() - 2 * 60 * 1000), 
      location: 'Main Entrance' 
    },
    { 
      id: 2, 
      name: 'Reception Desk', 
      type: 'Desktop',
      status: 'Offline', 
      lastPing: new Date(Date.now() - 3 * 60 * 60 * 1000), 
      location: 'Building A' 
    },
    { 
      id: 3, 
      name: 'Custom QR Stand', 
      type: 'QR Stand',
      status: 'Inactive', 
      lastPing: new Date(Date.now() - 24 * 60 * 60 * 1000), 
      location: 'Warehouse Entrance' 
    },
    { 
      id: 4, 
      name: 'Meeting Room PC', 
      type: 'PC',
      status: 'Online', 
      lastPing: new Date(Date.now() - 15 * 60 * 1000), 
      location: 'Floor 3' 
    },
    { 
      id: 5, 
      name: 'Security Checkpoint', 
      type: 'Tablet',
      status: 'Online', 
      lastPing: new Date(Date.now() - 5 * 60 * 1000), 
      location: 'Main Gate' 
    },
    { 
      id: 6, 
      name: 'Conference Hall Kiosk', 
      type: 'Kiosk',
      status: 'Online', 
      lastPing: new Date(), 
      location: 'Conference Hall' 
    },
    { 
      id: 7, 
      name: 'Executive Floor Station', 
      type: 'Desktop',
      status: 'Online', 
      lastPing: new Date(Date.now() - 10 * 60 * 1000), 
      location: 'Floor 10' 
    },
    { 
      id: 8, 
      name: 'Parking Entrance', 
      type: 'QR Stand',
      status: 'Online', 
      lastPing: new Date(Date.now() - 1 * 60 * 1000), 
      location: 'Parking Level B1' 
    },
    { 
      id: 9, 
      name: 'Cafeteria Check-in', 
      type: 'Tablet',
      status: 'Offline', 
      lastPing: new Date(Date.now() - 2 * 60 * 60 * 1000), 
      location: 'Cafeteria' 
    },
    { 
      id: 10, 
      name: 'Emergency Exit Monitor', 
      type: 'Kiosk',
      status: 'Online', 
      lastPing: new Date(Date.now() - 30 * 1000), 
      location: 'East Wing Exit' 
    },
    { 
      id: 11, 
      name: 'Visitor Lounge Station', 
      type: 'Desktop',
      status: 'Online', 
      lastPing: new Date(), 
      location: 'Visitor Lounge' 
    },
    { 
      id: 12, 
      name: 'Server Room Access', 
      type: 'Tablet',
      status: 'Online', 
      lastPing: new Date(Date.now() - 3 * 60 * 1000), 
      location: 'Server Room' 
    },
  ];
};

const generateStaff = () => {
  return [
    { id: 1, name: 'Sarah Wilson', department: 'Engineering', status: 'In Office', checkInTime: new Date(Date.now() - 4 * 60 * 60 * 1000) },
    { id: 2, name: 'Robert Brown', department: 'HR', status: 'In Office', checkInTime: new Date(Date.now() - 3 * 60 * 60 * 1000) },
    { id: 3, name: 'Emily White', department: 'Sales', status: 'In Office', checkInTime: new Date(Date.now() - 5 * 60 * 60 * 1000) },
    { id: 4, name: 'David Lee', department: 'Marketing', status: 'Out', checkInTime: null },
    { id: 5, name: 'Alice Smith', department: 'Finance', status: 'In Office', checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    { id: 6, name: 'John Chen', department: 'Engineering', status: 'In Office', checkInTime: new Date(Date.now() - 6 * 60 * 60 * 1000) },
    { id: 7, name: 'Maria Garcia', department: 'Operations', status: 'Out', checkInTime: null },
    { id: 8, name: 'James Wilson', department: 'Security', status: 'In Office', checkInTime: new Date(Date.now() - 7 * 60 * 60 * 1000) },
  ];
};

const generateRooms = () => {
  return [
    { id: 1, name: 'Conference Room A', capacity: 20, currentOccupancy: 12, status: 'Occupied' },
    { id: 2, name: 'Conference Room B', capacity: 15, currentOccupancy: 0, status: 'Available' },
    { id: 3, name: 'Meeting Room 1', capacity: 8, currentOccupancy: 5, status: 'Occupied' },
    { id: 4, name: 'Meeting Room 2', capacity: 8, currentOccupancy: 8, status: 'Full' },
    { id: 5, name: 'Executive Board Room', capacity: 30, currentOccupancy: 18, status: 'Occupied' },
    { id: 6, name: 'Training Room', capacity: 25, currentOccupancy: 0, status: 'Available' },
  ];
};

const generateVisitTypes = () => {
  return [
    { id: 1, name: 'Business Meeting', defaultDuration: 120, requiresApproval: true, accessZones: ['Reception', 'Meeting Rooms', 'Cafeteria'] },
    { id: 2, name: 'Interview', defaultDuration: 90, requiresApproval: true, accessZones: ['Reception', 'HR Floor'] },
    { id: 3, name: 'Delivery', defaultDuration: 30, requiresApproval: false, accessZones: ['Reception', 'Loading Dock'] },
    { id: 4, name: 'Vendor Meeting', defaultDuration: 60, requiresApproval: true, accessZones: ['Reception', 'Vendor Area'] },
    { id: 5, name: 'Technical Support', defaultDuration: 180, requiresApproval: true, accessZones: ['Reception', 'IT Department', 'Server Room'] },
  ];
};

const generateEventRequests = () => {
  return [
    {
      id: 201,
      eventName: 'Tech Conference 2025',
      organizer: 'Sarah Johnson',
      company: 'Tech Innovations Inc.',
      eventType: 'Conference',
      expectedAttendees: 150,
      eventDate: new Date('2025-11-15T09:00:00'),
      duration: 480, // minutes
      venue: 'Main Auditorium',
      requirements: ['Projector', 'Microphone', 'Catering'],
      status: 'Pending',
      requestedTime: new Date('2025-10-20T10:30:00'),
    },
    {
      id: 202,
      eventName: 'Product Launch',
      organizer: 'Michael Chen',
      company: 'StartupHub',
      eventType: 'Product Launch',
      expectedAttendees: 80,
      eventDate: new Date('2025-11-10T14:00:00'),
      duration: 180,
      venue: 'Conference Hall A',
      requirements: ['Stage Setup', 'Sound System', 'Lighting'],
      status: 'Pending',
      requestedTime: new Date('2025-10-22T15:45:00'),
    },
    {
      id: 203,
      eventName: 'Team Building Workshop',
      organizer: 'Emily White',
      company: 'Internal',
      eventType: 'Workshop',
      expectedAttendees: 40,
      eventDate: new Date('2025-11-05T10:00:00'),
      duration: 240,
      venue: 'Training Room',
      requirements: ['Whiteboard', 'Flip Charts', 'Refreshments'],
      status: 'Pending',
      requestedTime: new Date('2025-10-23T09:15:00'),
    },
    {
      id: 204,
      eventName: 'Investor Meeting',
      organizer: 'Robert Davis',
      company: 'Venture Capital Group',
      eventType: 'Meeting',
      expectedAttendees: 25,
      eventDate: new Date('2025-11-08T11:00:00'),
      duration: 120,
      venue: 'Executive Board Room',
      requirements: ['Video Conferencing', 'Presentation Screen'],
      status: 'Pending',
      requestedTime: new Date('2025-10-21T14:20:00'),
    },
  ];
};

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState(generateMockVisitors());
  const [pendingApprovals, setPendingApprovals] = useState(generatePendingApprovals());
  const [approvedVisitors, setApprovedVisitors] = useState([]);
  const [rejectedApprovals, setRejectedApprovals] = useState([]);
  const [eventRequests, setEventRequests] = useState(generateEventRequests());
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [rejectedEvents, setRejectedEvents] = useState([]);
  const [devices, setDevices] = useState(generateDevices());
  const [staff] = useState(generateStaff());
  const [rooms] = useState(generateRooms());
  const [visitTypes, setVisitTypes] = useState(generateVisitTypes());

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new visitors and status changes
      setVisitors(prevVisitors => {
        const updated = [...prevVisitors];
        // Random chance to add a new visitor
        if (Math.random() > 0.8) {
          const newVisitor = generateMockVisitors()[0];
          newVisitor.id = Math.max(...updated.map(v => v.id)) + 1;
          updated.unshift(newVisitor);
        }
        // Random chance to check out a visitor
        const checkedInVisitors = updated.filter(v => v.status === 'Checked In');
        if (checkedInVisitors.length > 0 && Math.random() > 0.7) {
          const randomVisitor = checkedInVisitors[Math.floor(Math.random() * checkedInVisitors.length)];
          randomVisitor.status = 'Checked Out';
          randomVisitor.checkOutTime = new Date();
        }
        return updated;
      });

      // Update device statuses
      setDevices(prevDevices => 
        prevDevices.map(device => ({
          ...device,
          lastPing: device.status === 'Online' ? new Date() : device.lastPing,
        }))
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const checkOutVisitor = (visitorId) => {
    setVisitors(prevVisitors =>
      prevVisitors.map(visitor =>
        visitor.id === visitorId
          ? { ...visitor, status: 'Checked Out', checkOutTime: new Date() }
          : visitor
      )
    );
  };

  const approveVisitor = (approvalId) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (approval) {
      const newVisitor = {
        id: Math.max(...visitors.map(v => v.id)) + 1,
        name: approval.name,
        email: `${approval.name.toLowerCase().replace(' ', '.')}@example.com`,
        company: approval.company,
        host: approval.host,
        checkInTime: new Date(),
        checkOutTime: null,
        status: 'Checked In',
        method: 'Manual Entry',
        purpose: approval.purpose,
      };
      setVisitors(prev => [newVisitor, ...prev]);
      setApprovedVisitors(prev => [{ ...approval, approvedTime: new Date() }, ...prev]);
      setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
    }
  };

  const rejectVisitor = (approvalId) => {
    const approval = pendingApprovals.find(a => a.id === approvalId);
    if (approval) {
      setRejectedApprovals(prev => [{ ...approval, rejectedTime: new Date() }, ...prev]);
      setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
    }
  };

  const addVisitType = (visitType) => {
    const newVisitType = {
      ...visitType,
      id: Math.max(...visitTypes.map(vt => vt.id)) + 1,
    };
    setVisitTypes(prev => [...prev, newVisitType]);
  };

  const updateVisitType = (id, updates) => {
    setVisitTypes(prev => prev.map(vt => vt.id === id ? { ...vt, ...updates } : vt));
  };

  const approveEvent = (eventId) => {
    const event = eventRequests.find(e => e.id === eventId);
    if (event) {
      setApprovedEvents(prev => [{ ...event, approvedTime: new Date(), status: 'Approved' }, ...prev]);
      setEventRequests(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const rejectEvent = (eventId) => {
    const event = eventRequests.find(e => e.id === eventId);
    if (event) {
      setRejectedEvents(prev => [{ ...event, rejectedTime: new Date(), status: 'Rejected' }, ...prev]);
      setEventRequests(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const approveRejectedEvent = (eventId) => {
    const event = rejectedEvents.find(e => e.id === eventId);
    if (event) {
      setApprovedEvents(prev => [{ ...event, approvedTime: new Date(), status: 'Approved' }, ...prev]);
      setRejectedEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const reApproveRejectedVisitor = (approvalId) => {
    const rejection = rejectedApprovals.find(r => r.id === approvalId);
    if (rejection) {
      approveVisitor(rejection.id);
      setRejectedApprovals(prev => prev.filter(r => r.id !== approvalId));
    }
  };

  const value = {
    visitors,
    pendingApprovals,
    approvedVisitors,
    rejectedApprovals,
    eventRequests,
    approvedEvents,
    rejectedEvents,
    devices,
    staff,
    rooms,
    visitTypes,
    checkOutVisitor,
    approveVisitor,
    rejectVisitor,
    reApproveRejectedVisitor,
    addVisitType,
    updateVisitType,
    approveEvent,
    rejectEvent,
    approveRejectedEvent,
  };

  return (
    <VisitorContext.Provider value={value}>
      {children}
    </VisitorContext.Provider>
  );
};
