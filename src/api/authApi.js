import axiosInstance from './axiosInstance';

// Register a new user
export const registerUser = async (data) => {
  const response = await axiosInstance.post('/auth/register', data);
  return response.data;
};

// Login user
export const loginUser = async (data) => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

// Refresh token
export const refreshToken = async (refreshToken) => {
  const response = await axiosInstance.post('/auth/refresh', { refreshToken });
  return response.data;
};

// Get current user profile
export const getProfile = async () => {
  const response = await axiosInstance.get('/users/me');
  return response.data;
};

// Update current user profile
export const updateProfile = async (data) => {
  const response = await axiosInstance.put('/users/me', data);
  return response.data;
};
