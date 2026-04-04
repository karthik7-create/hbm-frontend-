import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import hotelReducer from '../features/hotel/hotelSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    hotel: hotelReducer,
    // Other module slices will be added during merge:
    // auth: authReducer,
    // booking: bookingReducer,
  },
});

export default store;
