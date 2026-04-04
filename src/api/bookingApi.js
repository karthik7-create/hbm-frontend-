import axiosInstance from './axiosInstance';

// Create a new booking
export const createBooking = async (data) => {
  const response = await axiosInstance.post('/bookings', data);
  return response.data;
};

// Get all my bookings
export const getMyBookings = async () => {
  const response = await axiosInstance.get('/bookings');
  return response.data;
};

// Get booking by ID
export const getBookingById = async (id) => {
  const response = await axiosInstance.get(`/bookings/${id}`);
  return response.data;
};

// Cancel a booking
export const cancelBooking = async (id) => {
  const response = await axiosInstance.patch(`/bookings/${id}/cancel`);
  return response.data;
};

// Process payment for a booking
export const processPayment = async (data) => {
  const response = await axiosInstance.post('/payments', data);
  return response.data;
};

// Get payment status for a booking
export const getPaymentStatus = async (bookingId) => {
  const response = await axiosInstance.get(`/payments/${bookingId}`);
  return response.data;
};
