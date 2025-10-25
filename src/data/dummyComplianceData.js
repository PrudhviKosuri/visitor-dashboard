// Consistent dummy data for Privacy & Compliance Center
export const complianceStats = {
  dataRetentionDays: 90,
  totalRecordsStored: 200,
  lastAuditDate: '2025-10-25',
  complianceMode: 'GDPR',
};

export const auditLogs = [
  {
    id: 1,
    action: 'Visitor Check-In',
    user: 'John Doe',
    timestamp: '2025-10-25 09:30:00',
    details: 'Checked in for Investor Meeting',
    status: 'Success',
  },
  {
    id: 2,
    action: 'Approval Granted',
    user: 'Startup Alpha',
    timestamp: '2025-10-25 09:25:00',
    details: 'Approved visit request from John Doe',
    status: 'Success',
  },
  {
    id: 3,
    action: 'Visitor Check-In',
    user: 'Alice Smith',
    timestamp: '2025-10-25 10:00:00',
    details: 'Checked in for Delivery',
    status: 'Success',
  },
  {
    id: 4,
    action: 'Data Access Request',
    user: 'Clara Jones',
    timestamp: '2025-10-25 11:15:00',
    details: 'Requested access to personal visitor data',
    status: 'Pending',
  },
  {
    id: 5,
    action: 'Visitor Check-Out',
    user: 'David Kim',
    timestamp: '2025-10-25 14:20:00',
    details: 'Checked out after Delivery',
    status: 'Success',
  },
];

export const accessRequests = [
  {
    id: 1,
    requester: 'Clara Jones',
    email: 'clara.jones@example.com',
    requestType: 'Data Access',
    date: '2025-10-25',
    status: 'Pending',
    description: 'Request to view all personal visitor records',
  },
  {
    id: 2,
    requester: 'Bob Lee',
    email: 'bob.lee@example.com',
    requestType: 'Data Deletion',
    date: '2025-10-24',
    status: 'Completed',
    description: 'Request to delete visitor history from 2024',
  },
];

export const dataRetentionPolicy = {
  enabled: true,
  retentionPeriod: 90,
  autoDelete: true,
  backupEnabled: true,
  encryptionEnabled: true,
};

export const privacySettings = {
  gdprCompliant: true,
  cookieConsent: true,
  dataMinimization: true,
  rightToAccess: true,
  rightToErasure: true,
  dataPortability: true,
};
