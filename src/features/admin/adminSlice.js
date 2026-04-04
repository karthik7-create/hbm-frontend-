import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as adminApi from '../../api/adminApi';

// ──── Async Thunks ────

export const getStats = createAsyncThunk(
  'admin/getStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await adminApi.fetchStats();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async ({ page, size, sortBy, direction } = {}, { rejectWithValue }) => {
    try {
      const res = await adminApi.fetchUsers(page, size, sortBy, direction);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const banUser = createAsyncThunk(
  'admin/banUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await adminApi.toggleBanUser(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to toggle user ban');
    }
  }
);

export const getHotels = createAsyncThunk(
  'admin/getHotels',
  async ({ page, size, sortBy, direction } = {}, { rejectWithValue }) => {
    try {
      const res = await adminApi.fetchHotels(page, size, sortBy, direction);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch hotels');
    }
  }
);

export const approveHotel = createAsyncThunk(
  'admin/approveHotel',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await adminApi.approveHotel(id, status);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update hotel status');
    }
  }
);

export const getBookings = createAsyncThunk(
  'admin/getBookings',
  async ({ page, size, sortBy, direction } = {}, { rejectWithValue }) => {
    try {
      const res = await adminApi.fetchBookings(page, size, sortBy, direction);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

// ──── Slice ────

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    users: { content: [], page: 0, totalPages: 0, totalElements: 0 },
    hotels: { content: [], page: 0, totalPages: 0, totalElements: 0 },
    bookings: { content: [], page: 0, totalPages: 0, totalElements: 0 },
    loading: {
      stats: false,
      users: false,
      hotels: false,
      bookings: false,
    },
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Stats
      .addCase(getStats.pending, (state) => { state.loading.stats = true; state.error = null; })
      .addCase(getStats.fulfilled, (state, action) => { state.loading.stats = false; state.stats = action.payload; })
      .addCase(getStats.rejected, (state, action) => { state.loading.stats = false; state.error = action.payload; })
      // Users
      .addCase(getUsers.pending, (state) => { state.loading.users = true; state.error = null; })
      .addCase(getUsers.fulfilled, (state, action) => { state.loading.users = false; state.users = action.payload; })
      .addCase(getUsers.rejected, (state, action) => { state.loading.users = false; state.error = action.payload; })
      // Ban user — update the user in the list
      .addCase(banUser.fulfilled, (state, action) => {
        const updated = action.payload;
        state.users.content = state.users.content.map(u =>
          u.id === updated.id ? updated : u
        );
      })
      .addCase(banUser.rejected, (state, action) => { state.error = action.payload; })
      // Hotels
      .addCase(getHotels.pending, (state) => { state.loading.hotels = true; state.error = null; })
      .addCase(getHotels.fulfilled, (state, action) => { state.loading.hotels = false; state.hotels = action.payload; })
      .addCase(getHotels.rejected, (state, action) => { state.loading.hotels = false; state.error = action.payload; })
      // Approve hotel — update hotel in the list
      .addCase(approveHotel.fulfilled, (state, action) => {
        const updated = action.payload;
        state.hotels.content = state.hotels.content.map(h =>
          h.id === updated.id ? updated : h
        );
      })
      .addCase(approveHotel.rejected, (state, action) => { state.error = action.payload; })
      // Bookings
      .addCase(getBookings.pending, (state) => { state.loading.bookings = true; state.error = null; })
      .addCase(getBookings.fulfilled, (state, action) => { state.loading.bookings = false; state.bookings = action.payload; })
      .addCase(getBookings.rejected, (state, action) => { state.loading.bookings = false; state.error = action.payload; });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
