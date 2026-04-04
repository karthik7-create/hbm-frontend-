import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    // Other module slices will be added during merge:
    // auth: authReducer,
    // hotel: hotelReducer,
    // booking: bookingReducer,
  },
});

export default store;
