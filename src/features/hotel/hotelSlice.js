import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as hotelApi from '../../api/hotelApi';

// ──── Async Thunks ────

export const searchHotels = createAsyncThunk(
  'hotel/searchHotels',
  async (params, { rejectWithValue }) => {
    try {
      const res = await hotelApi.searchHotels(params);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to search hotels');
    }
  }
);

export const fetchHotelDetail = createAsyncThunk(
  'hotel/fetchHotelDetail',
  async (id, { rejectWithValue }) => {
    try {
      const res = await hotelApi.fetchHotelById(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch hotel');
    }
  }
);

export const fetchHotelRooms = createAsyncThunk(
  'hotel/fetchHotelRooms',
  async (id, { rejectWithValue }) => {
    try {
      const res = await hotelApi.fetchHotelRooms(id);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch rooms');
    }
  }
);

export const createHotel = createAsyncThunk(
  'hotel/createHotel',
  async (data, { rejectWithValue }) => {
    try {
      const res = await hotelApi.createHotel(data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create hotel');
    }
  }
);

export const updateHotel = createAsyncThunk(
  'hotel/updateHotel',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await hotelApi.updateHotel(id, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update hotel');
    }
  }
);

export const removeHotel = createAsyncThunk(
  'hotel/removeHotel',
  async (id, { rejectWithValue }) => {
    try {
      await hotelApi.deleteHotel(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete hotel');
    }
  }
);

export const addRoom = createAsyncThunk(
  'hotel/addRoom',
  async ({ hotelId, data }, { rejectWithValue }) => {
    try {
      const res = await hotelApi.addRoom(hotelId, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add room');
    }
  }
);

// ──── Slice ────

const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    searchResults: { content: [], page: 0, totalPages: 0, totalElements: 0 },
    selectedHotel: null,
    rooms: [],
    loading: {
      search: false,
      detail: false,
      rooms: false,
      create: false,
      update: false,
      delete: false,
      addRoom: false,
    },
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSelectedHotel: (state) => { state.selectedHotel = null; state.rooms = []; },
  },
  extraReducers: (builder) => {
    builder
      // Search
      .addCase(searchHotels.pending, (state) => { state.loading.search = true; state.error = null; })
      .addCase(searchHotels.fulfilled, (state, action) => { state.loading.search = false; state.searchResults = action.payload; })
      .addCase(searchHotels.rejected, (state, action) => { state.loading.search = false; state.error = action.payload; })
      // Detail
      .addCase(fetchHotelDetail.pending, (state) => { state.loading.detail = true; state.error = null; })
      .addCase(fetchHotelDetail.fulfilled, (state, action) => { state.loading.detail = false; state.selectedHotel = action.payload; })
      .addCase(fetchHotelDetail.rejected, (state, action) => { state.loading.detail = false; state.error = action.payload; })
      // Rooms
      .addCase(fetchHotelRooms.pending, (state) => { state.loading.rooms = true; })
      .addCase(fetchHotelRooms.fulfilled, (state, action) => { state.loading.rooms = false; state.rooms = action.payload; })
      .addCase(fetchHotelRooms.rejected, (state, action) => { state.loading.rooms = false; state.error = action.payload; })
      // Create
      .addCase(createHotel.pending, (state) => { state.loading.create = true; })
      .addCase(createHotel.fulfilled, (state) => { state.loading.create = false; })
      .addCase(createHotel.rejected, (state, action) => { state.loading.create = false; state.error = action.payload; })
      // Update
      .addCase(updateHotel.fulfilled, (state, action) => { state.selectedHotel = action.payload; })
      // Delete — remove from search results
      .addCase(removeHotel.fulfilled, (state, action) => {
        state.searchResults.content = state.searchResults.content.filter(h => h.id !== action.payload);
      })
      // Add room — append to detail rooms
      .addCase(addRoom.fulfilled, (state, action) => {
        if (state.selectedHotel?.rooms) {
          state.selectedHotel.rooms.push(action.payload);
        }
        state.rooms.push(action.payload);
      });
  },
});

export const { clearError, clearSelectedHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
