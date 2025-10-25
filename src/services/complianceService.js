import apiClient from '../config/api';

// Compliance Portal API calls
export const complianceService = {
  // Get compliance summary statistics
  getSummary: async () => {
    try {
      const response = await apiClient.get('/compliance/summary');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get audit logs
  getAuditLogs: async (filters = {}) => {
    try {
      const response = await apiClient.get('/compliance/audit-logs', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get access requests
  getAccessRequests: async () => {
    try {
      const response = await apiClient.get('/compliance/access-requests');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Process access request
  processAccessRequest: async (requestId, action) => {
    try {
      const response = await apiClient.post(`/compliance/access-requests/${requestId}/${action}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get data retention policy
  getDataRetentionPolicy: async () => {
    try {
      const response = await apiClient.get('/compliance/data-retention');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update data retention policy
  updateDataRetentionPolicy: async (policyData) => {
    try {
      const response = await apiClient.put('/compliance/data-retention', policyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get privacy settings
  getPrivacySettings: async () => {
    try {
      const response = await apiClient.get('/compliance/privacy-settings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update privacy settings
  updatePrivacySettings: async (settings) => {
    try {
      const response = await apiClient.put('/compliance/privacy-settings', settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Export audit logs
  exportAuditLogs: async (format = 'csv') => {
    try {
      const response = await apiClient.get(`/compliance/audit-logs/export`, {
        params: { format },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
