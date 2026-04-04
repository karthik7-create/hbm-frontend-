import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Other modules will add their slices here:
    // hotel: hotelReducer,
    // booking: bookingReducer,
    // admin: adminReducer,
  },
});

export default store;
