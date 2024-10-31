//import api from "..";
import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your base URL
  headers: {
    'Content-Type': 'application/json'
  }
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
  }
  return config;
}, error => {
  return Promise.reject(error);
});


// export const loginUser = async ({
//   email,
//   pass,
// }: {
//   email: string;
//   pass: string;
// }) => {
//   const res = await api.post("/login", { email, pass });
//   return res;
// };

export const sendOtpForRegistration = async (data: { email: string }) =>{
  return await api.post('/register/send-otp', data);
};

export const verifyOtpForRegistration = async (data: { email: string; otp: string }) =>
  await api.post('/register/verify-otp', data);

export const completeRegistration = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => await api.post('/register/complete', data);

// Auth
export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post('/login', data); // Ensure the correct endpoint
    return response.data; // Return the response data
  } catch (error) {
    // Handle error appropriately
    console.log('Login error:', error); // Log error for debugging
    throw error; // Re-throw the error for further handling if necessary
  }
};

export const logout = async (token: string) =>
  await api.post('/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Profile
export const getProfile = async (token: string) =>{
  await api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (token: string, data: {
  name?: string;
  email?: string;
  dob?: string;
  phoneNum?: string;
}) =>
  await api.put('/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteUser = async (token: string) =>
  await api.delete('/delete', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Password Reset
export const sendOtpForPasswordReset = async (data: { email: string }) =>{
  return await api.post('/forgot-password/send-otp', data);
};
export const verifyOtpForPasswordReset = async (data: { email: string; otp: string }) =>
  await api.post('/reset-password/verify-otp', data);

export const changePassword = async (data: {
  email: string;
  newPassword: string;
  confirmPassword: string;
}) =>
  await api.post('/reset-password/change-password', data);

// Organizations
export const createOrganization = async (token: string, data: {
  name: string;
  description: string;
}) =>
  await api.post('/organizations', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// (Continue modifying other functions similarly)
// Organizations
export const getOrganizations = async (token: string) =>
  await api.get('/organizations', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateOrganization = async (token: string, orgId: string, data: {
  name: string;
  description: string;
}) =>
  await api.put(`/organizations/${orgId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteOrganization = async (token: string, orgId: string) =>
  await api.delete(`/organizations/${orgId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Invite functions
export const inviteUserToOrganization = async (token: string, orgId: string, userId: string) =>
  await api.post(`/organizations/${orgId}/invite`, { userId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserInvites = async (token: string) =>
  await api.get('/invites', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getOrganizationInvites = async (token: string, orgId: string) =>
  await api.get(`/organizations/${orgId}/invites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateInviteStatus = async (token: string, inviteId: string, status: 'Accepted' | 'Declined') =>
  await api.post(`/invites/${inviteId}`, { status }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Organization Member Management
export const getOrganizationMembers = async (token: string, orgId: string) =>
  await api.get(`/organizations/${orgId}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const removeMemberFromOrganization = async (token: string, orgId: string, userId: string) =>
  await api.delete(`/organizations/${orgId}/members/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const leaveOrganization = async (token: string, orgId: string) =>
  await api.post(`/organizations/${orgId}/leave`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Media Uploads
export const uploadImageToOrganization = async (orgId: string, file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  return await api.post(`/organizations/${orgId}/upload-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadVideoToOrganization = async (orgId: string, file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  return await api.post(`/organizations/${orgId}/upload-video`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMediaInOrganization = async (orgId: string, mediaId: string, file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);
  return await api.put(`/organizations/${orgId}/update-media/${mediaId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteMediaFromOrganization = async (orgId: string, mediaId: string, token: string) =>
  await api.delete(`/organizations/${orgId}/delete-media/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const adminDeleteMediaFromOrganization = async (orgId: string, mediaId: string, token: string) =>
  await api.delete(`/organizations/${orgId}/media/${mediaId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Boards
export const getBoards = async (orgId: string, token: string) =>
  await api.get(`/organizations/${orgId}/boards`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createBoard = async (orgId: string, data: { title: string }, token: string) =>
  await api.post(`/organizations/${orgId}/boards`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBoard = async (orgId: string, boardId: string, token: string) =>
  await api.delete(`/organizations/${orgId}/boards/${boardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Cards
export const getCards = async (orgId: string, boardId: string, token: string) =>
  await api.get(`/organizations/${orgId}/boards/${boardId}/cards`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createCard = async (orgId: string, boardId: string, data: { title: string; position: number }, token: string) =>
  await api.post(`/organizations/${orgId}/boards/${boardId}/cards`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCardTitle = async (orgId: string, boardId: string, cardId: string, data: { newTitle: string }, token: string) =>
  await api.put(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/title`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateCardPosition = async (orgId: string, boardId: string, cardId: string, data: { newPosition: number }, token: string) =>
  await api.put(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/position`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteCard = async (orgId: string, boardId: string, cardId: string, token: string) =>
  await api.delete(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Items
export const getItems = async (orgId: string, boardId: string, cardId: string, token: string) =>
  await api.get(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createItem = async (orgId: string, boardId: string, cardId: string, data: { title: string; assignedTo: string }, token: string) =>
  await api.post(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateItem = async (orgId: string, boardId: string, cardId: string, itemId: string, data: { title: string; assignedTo: string }, token: string) =>
  await api.put(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items/${itemId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteItem = async (orgId: string, boardId: string, cardId: string, itemId: string, token: string) =>
  await api.delete(`/organizations/${orgId}/boards/${boardId}/cards/${cardId}/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
