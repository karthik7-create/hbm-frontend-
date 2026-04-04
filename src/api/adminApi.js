import axiosInstance from './axiosInstance';

// GET /admin/stats — Dashboard statistics
export const fetchStats = () =>
  axiosInstance.get('/admin/stats');

// GET /admin/users — All users (paged)
export const fetchUsers = (page = 0, size = 10, sortBy = 'createdAt', direction = 'desc') =>
  axiosInstance.get('/admin/users', { params: { page, size, sortBy, direction } });

// PATCH /admin/users/:id/ban — Toggle ban/unban user
export const toggleBanUser = (id) =>
  axiosInstance.patch(`/admin/users/${id}/ban`);

// GET /admin/hotels — All hotels (paged)
export const fetchHotels = (page = 0, size = 10, sortBy = 'createdAt', direction = 'desc') =>
  axiosInstance.get('/admin/hotels', { params: { page, size, sortBy, direction } });

// PATCH /admin/hotels/:id/approve — Approve or reject hotel
export const approveHotel = (id, status) =>
  axiosInstance.patch(`/admin/hotels/${id}/approve`, null, { params: { status } });

// GET /admin/bookings — All bookings (paged)
export const fetchBookings = (page = 0, size = 10, sortBy = 'bookedAt', direction = 'desc') =>
  axiosInstance.get('/admin/bookings', { params: { page, size, sortBy, direction } });
