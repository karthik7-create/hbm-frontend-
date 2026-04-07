import axiosInstance from './axiosInstance';

// ── Public Endpoints ──

// GET /hotels/search — Search hotels
export const searchHotels = (params = {}) =>
  axiosInstance.get('/hotels/search', { params });

// GET /hotels/:id — Hotel detail
export const fetchHotelById = (id) =>
  axiosInstance.get(`/hotels/${id}`);

// GET /hotels/:id/rooms — Hotel rooms
export const fetchHotelRooms = (id) =>
  axiosInstance.get(`/hotels/${id}/rooms`);

// ── Admin Endpoints ──

// POST /admin/hotels — Create hotel
export const createHotel = (data) =>
  axiosInstance.post('/admin/hotels', data);

// PUT /admin/hotels/:id — Update hotel
export const updateHotel = (id, data) =>
  axiosInstance.put(`/admin/hotels/${id}`, data);

// DELETE /admin/hotels/:id — Delete hotel
export const deleteHotel = (id) =>
  axiosInstance.delete(`/admin/hotels/${id}`);

// POST /admin/hotels/:id/rooms — Add room
export const addRoom = (hotelId, data) =>
  axiosInstance.post(`/admin/hotels/${hotelId}/rooms`, data);
