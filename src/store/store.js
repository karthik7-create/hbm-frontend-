import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import authReducer from '../features/auth/authSlice';
import hotelReducer from '../features/hotel/hotelSlice';
import bookingReducer from '../features/booking/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    booking: bookingReducer,
    admin: adminReducer,
  },
});

export default store;
