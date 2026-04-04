import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage on every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hotel_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || 'An error occurred';

    // On 401, optionally redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('hotel_token');
      // window.location.href = '/login';
    }

    return Promise.reject({ ...error, message });
  }
);

export default axiosInstance;
