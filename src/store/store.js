import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookingReducer from '../features/booking/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // hotel: hotelReducer,    // Module 2 — Jeyanth
    booking: bookingReducer,   // Module 3 — Kavi
    // admin: adminReducer,    // Module 4 — Karthik
  },
});

export default store;
