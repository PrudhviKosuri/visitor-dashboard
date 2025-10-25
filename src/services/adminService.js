import apiClient from '../config/api';

// Admin Portal API calls
export const adminService = {
  // Get admin summary statistics
  getSummary: async () => {
    try {
      const response = await apiClient.get('/admin/summary');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get live occupancy data
  getOccupancy: async () => {
    try {
      const response = await apiClient.get('/admin/occupancy');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get admin charts data
  getCharts: async () => {
    try {
      const response = await apiClient.get('/admin/charts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get resident management data
  getResidents: async () => {
    try {
      const response = await apiClient.get('/admin/residents');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add new resident
  addResident: async (residentData) => {
    try {
      const response = await apiClient.post('/admin/residents', residentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update resident status
  updateResidentStatus: async (residentId, status) => {
    try {
      const response = await apiClient.patch(`/admin/residents/${residentId}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get reports data
  getReports: async (filters = {}) => {
    try {
      const response = await apiClient.get('/admin/reports', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Export reports
  exportReports: async (format = 'pdf', filters = {}) => {
    try {
      const response = await apiClient.get('/admin/reports/export', {
        params: { format, ...filters },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get watchlist alerts
  getWatchlistAlerts: async () => {
    try {
      const response = await apiClient.get('/admin/watchlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add to watchlist
  addToWatchlist: async (visitorId, reason) => {
    try {
      const response = await apiClient.post('/admin/watchlist', { visitorId, reason });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove from watchlist
  removeFromWatchlist: async (visitorId) => {
    try {
      const response = await apiClient.delete(`/admin/watchlist/${visitorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
