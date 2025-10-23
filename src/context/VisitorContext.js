import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

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
  const companies = ['TechCorp', 'StartupXYZ', 'InnovateLab', 'FutureTech', 'DigitalWorks', 'SmartSolutions'];
  const hosts = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Chen', 'Alex Rodriguez', 'Lisa Wang'];
  const names = ['Alice Brown', 'Bob Wilson', 'Carol Taylor', 'David Lee', 'Eva Martinez', 'Frank Garcia', 'Grace Liu', 'Henry Kim'];
  const methods = ['QR Code', 'Face Recognition', 'Manual Entry'];
  const statuses = ['Checked-in', 'Checked-out'];

  return Array.from({ length: 15 }, (_, index) => {
    const checkInTime = new Date();
    checkInTime.setHours(checkInTime.getHours() - Math.floor(Math.random() * 8));
    checkInTime.setMinutes(Math.floor(Math.random() * 60));
    
    const isCheckedOut = Math.random() > 0.6;
    const checkOutTime = isCheckedOut ? new Date(checkInTime.getTime() + Math.random() * 4 * 60 * 60 * 1000) : null;

    return {
      id: index + 1,
      name: names[Math.floor(Math.random() * names.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      host: hosts[Math.floor(Math.random() * hosts.length)],
      checkInTime: checkInTime,
      checkOutTime: checkOutTime,
      status: isCheckedOut ? 'Checked-out' : 'Checked-in',
      method: methods[Math.floor(Math.random() * methods.length)],
      purpose: Math.random() > 0.5 ? 'Business Meeting' : 'Interview',
    };
  });
};

const generatePendingApprovals = () => {
  const names = ['Jennifer Adams', 'Michael Brown', 'Susan Clark', 'Robert Davis'];
  const companies = ['NewTech Inc', 'Innovation Labs', 'StartupHub', 'TechVentures'];
  
  return Array.from({ length: 4 }, (_, index) => ({
    id: index + 100,
    name: names[index],
    company: companies[index],
    purpose: 'Business Meeting',
    requestedTime: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000),
    host: 'John Smith',
    status: 'Pending',
  }));
};

const generateDevices = () => {
  return [
    { id: 1, name: 'Main Entrance Kiosk', status: 'Online', lastPing: new Date(), location: 'Lobby' },
    { id: 2, name: 'Reception Tablet', status: 'Online', lastPing: new Date(Date.now() - 5 * 60 * 1000), location: 'Reception' },
    { id: 3, name: 'Exit Scanner', status: 'Offline', lastPing: new Date(Date.now() - 30 * 60 * 1000), location: 'Exit Door' },
    { id: 4, name: 'Conference Room Kiosk', status: 'Online', lastPing: new Date(Date.now() - 2 * 60 * 1000), location: 'Conference Room A' },
  ];
};

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState(generateMockVisitors());
  const [pendingApprovals, setPendingApprovals] = useState(generatePendingApprovals());
  const [devices, setDevices] = useState(generateDevices());

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
        const checkedInVisitors = updated.filter(v => v.status === 'Checked-in');
        if (checkedInVisitors.length > 0 && Math.random() > 0.7) {
          const randomVisitor = checkedInVisitors[Math.floor(Math.random() * checkedInVisitors.length)];
          randomVisitor.status = 'Checked-out';
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
          ? { ...visitor, status: 'Checked-out', checkOutTime: new Date() }
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
        company: approval.company,
        host: approval.host,
        checkInTime: new Date(),
        checkOutTime: null,
        status: 'Checked-in',
        method: 'Manual Entry',
        purpose: approval.purpose,
      };
      setVisitors(prev => [newVisitor, ...prev]);
      setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
    }
  };

  const rejectVisitor = (approvalId) => {
    setPendingApprovals(prev => prev.filter(a => a.id !== approvalId));
  };

  const value = {
    visitors,
    pendingApprovals,
    devices,
    checkOutVisitor,
    approveVisitor,
    rejectVisitor,
  };

  return (
    <VisitorContext.Provider value={value}>
      {children}
    </VisitorContext.Provider>
  );
};
