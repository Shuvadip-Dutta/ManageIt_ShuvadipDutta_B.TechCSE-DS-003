import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:4000', // Replace with your base URL
//   headers: {
//     'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // Replace with your auth token
//     'Content-Type': 'application/json'
//   }
// });

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your base URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to set the Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Registration & OTP
export const sendOtpForRegistration = (data: { email: string }) => api.post('/register/send-otp', data);
export const verifyOtpForRegistration = (data: { email: string, otp: string }) => api.post('/register/verify-otp', data);
export const completeRegistration = (data: { email: string, name: string, dob: string, phoneNum: string, password: string, confirmPassword: string }) =>
  api.post('/register/complete', data);

// Auth
export const login = (data: { email: string, password: string }) => api.post('/login', data);
export const logout = () => api.post('/logout');

// Profile
export const getProfile = () => api.get('/profile');
export const updateProfile = (data: { name?: string, email?: string, dob?: string, phoneNum?: string }) => api.put('/profile', data);

// User Deletion
export const deleteUser = () => api.delete('/delete');

// Password Reset
export const sendOtpForPasswordReset = (data: { email: string }) => api.post('/forgot-password/send-otp', data);
export const verifyOtpForPasswordReset = (data: { email: string, otp: string }) => api.post('/reset-password/verify-otp', data);
export const changePassword = (data: { email: string, newPassword: string, confirmPassword: string }) =>
  api.post('/reset-password/change-password', data);

// Organization API functions
export const getOrganizations = () => api.get('/organizations');
export const createOrganization = (data: { name: string; description?: string }) => api.post('/organizations', data);
export const updateOrganization = (orgId: string, data: { name: string; description?: string }) => api.put(`/organizations/${orgId}`, data);
export const deleteOrganization = (orgId: string) => api.delete(`/organizations/${orgId}`);

// Invite functions
export const inviteUserToOrganization = (orgId: string, userId: string) => api.post(`/organizations/${orgId}/invite`, { userId });
export const getUserInvites = () => api.get('/invites');
export const getOrganizationInvites = (orgId: string) => api.get(`/organizations/${orgId}/invites`);
export const updateInviteStatus = (inviteId: string, status: 'Accepted' | 'Declined') => api.post(`/invites/${inviteId}`, { status });

// Organization Member Management
export const getOrganizationMembers = (orgId: string) => api.get(`/organizations/${orgId}/members`);
export const removeMemberFromOrganization = (orgId: string, userId: string) => api.delete(`/organizations/${orgId}/members/${userId}`);
export const leaveOrganization = (orgId: string) => api.post(`/organizations/${orgId}/leave`);

// Media Uploads
export const uploadImageToOrganization = (orgId: string, formData: FormData) => api.post(`/organizations/${orgId}/upload-image`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const uploadVideoToOrganization = (orgId: string, formData: FormData) => api.post(`/organizations/${orgId}/upload-video`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateMediaInOrganization = (orgId: string, mediaId: string, formData: FormData) => api.put(`/organizations/${orgId}/update-media/${mediaId}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteMediaFromOrganization = (orgId: string, mediaId: string) => api.delete(`/organizations/${orgId}/delete-media/${mediaId}`);
export const adminDeleteMediaFromOrganization = (orgId: string, mediaId: string) => api.delete(`/organizations/${orgId}/media/${mediaId}`);

// Board
export const getBoards = (orgId: string) =>
  api.get(`/organizations/${orgId}/boards`);

export const createBoard = (orgId: string, data: { title: string }) =>
  api.post(`/organizations/${orgId}/boards`, data);

export const deleteBoard = (orgId: string, boardId: string) =>
  api.delete(`/organizations/${orgId}/boards/${boardId}`);

// Card
export const getCards = (orgId: string, boardId: string) =>
  api.get(`/organizations/${orgId}/boards/${boardId}/cards`);

export const createCard = (orgId: string, boardId: string, data: { title: string, position: number }) =>
  api.post(`/organizations/${orgId}/boards/${boardId}/cards`, data);

export const updateCardTitle = (orgId: string, boardId: string, cardId: string, data: { newTitle: string }) =>
  api.put(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/title`, data);

export const updateCardPosition = (orgId: string, boardId: string, cardId: string, data: { newPosition: number }) =>
  api.put(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/position`, data);

export const deleteCard = (orgId: string, boardId: string, cardId: string) =>
  api.delete(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}`);

// Item
export const getItems = (orgId: string, boardId: string, cardId: string) =>
  api.get(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items`);

export const createItem = (orgId: string, boardId: string, cardId: string, data: { title: string, assignedTo: string }) =>
  api.post(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items`, data);

export const updateItem = (orgId: string, boardId: string, cardId: string, itemId: string, data: { title: string, assignedTo: string }) =>
  api.put(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items/${itemId}`, data);

export const deleteItem = (orgId: string, boardId: string, cardId: string, itemId: string) =>
  api.delete(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items/${itemId}`);


export default api;