import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  processPayment,
  getPaymentStatus,
} from '../../api/bookingApi';

// ── Async Thunks ─────────────────────────────────────────

export const createNewBooking = createAsyncThunk(
  'booking/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createBooking(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create booking');
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  'booking/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyBookings();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const fetchBookingDetail = createAsyncThunk(
  'booking/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBookingById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking');
    }
  }
);

export const cancelMyBooking = createAsyncThunk(
  'booking/cancel',
  async (id, { rejectWithValue }) => {
    try {
      const response = await cancelBooking(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel booking');
    }
  }
);

export const payForBooking = createAsyncThunk(
  'booking/pay',
  async (data, { rejectWithValue }) => {
    try {
      const response = await processPayment(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Payment failed');
    }
  }
);

export const fetchPaymentStatus = createAsyncThunk(
  'booking/paymentStatus',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await getPaymentStatus(bookingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch payment status');
    }
  }
);

// ── Slice ────────────────────────────────────────────────

const initialState = {
  bookings: [],
  currentBooking: null,
  currentPayment: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBookingError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.currentPayment = null;
    },
  },
  extraReducers: (builder) => {
    // Create booking
    builder
      .addCase(createNewBooking.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createNewBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        state.bookings.unshift(action.payload);
      })
      .addCase(createNewBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch all bookings
    builder
      .addCase(fetchMyBookings.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch booking detail
    builder
      .addCase(fetchBookingDetail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
      })
      .addCase(fetchBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Cancel booking
    builder
      .addCase(cancelMyBooking.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(cancelMyBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBooking = action.payload;
        // Update in the list too
        const idx = state.bookings.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) state.bookings[idx] = action.payload;
      })
      .addCase(cancelMyBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Pay for booking
    builder
      .addCase(payForBooking.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(payForBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(payForBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch payment status
    builder
      .addCase(fetchPaymentStatus.pending, (state) => { state.loading = true; })
      .addCase(fetchPaymentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
      })
      .addCase(fetchPaymentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
