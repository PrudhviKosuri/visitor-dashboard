import apiClient from '../config/api';

// Visitor Portal API calls
export const visitorService = {
  // Get visitor summary statistics
  getSummary: async () => {
    try {
      const response = await apiClient.get('/visitor-summary');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get list of visitors
  getVisitors: async () => {
    try {
      const response = await apiClient.get('/visitors');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get visitor check-ins
  getCheckIns: async () => {
    try {
      const response = await apiClient.get('/visitors/check-ins');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get visitor charts data
  getCharts: async () => {
    try {
      const response = await apiClient.get('/visitor-charts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new visit
  registerVisit: async (visitData) => {
    try {
      const response = await apiClient.post('/visitors/register', visitData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get visit history
  getHistory: async () => {
    try {
      const response = await apiClient.get('/visitors/history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get visitor profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/visitors/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update visitor profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/visitors/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
