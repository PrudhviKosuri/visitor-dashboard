import apiClient from '../config/api';

// Resident Portal API calls
export const residentService = {
  // Get resident summary statistics
  getSummary: async () => {
    try {
      const response = await apiClient.get('/residents/summary');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get visitor requests
  getRequests: async () => {
    try {
      const response = await apiClient.get('/residents/requests');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Approve visitor request
  approveRequest: async (requestId) => {
    try {
      const response = await apiClient.post(`/residents/requests/${requestId}/approve`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reject visitor request
  rejectRequest: async (requestId) => {
    try {
      const response = await apiClient.post(`/residents/requests/${requestId}/reject`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get recent invitations
  getInvites: async () => {
    try {
      const response = await apiClient.get('/residents/invites');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send new invitation
  sendInvite: async (inviteData) => {
    try {
      const response = await apiClient.post('/residents/invites', inviteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get analytics charts data
  getCharts: async () => {
    try {
      const response = await apiClient.get('/residents/charts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get resident profile
  getProfile: async () => {
    try {
      const response = await apiClient.get('/residents/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update resident profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.put('/residents/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
