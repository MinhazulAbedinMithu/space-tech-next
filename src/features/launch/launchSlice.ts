import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  loading: boolean;
  launches: any[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  launches: [],
  error: ''
};

export const fetchLaunches = createAsyncThunk('launch/fetchLaunches', () => {
  return axios.get('https://api.spacexdata.com/v3/launches').then((response) => response.data);
});

const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLaunches.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLaunches.fulfilled, (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.launches = action.payload;
      state.error = '';
    });
    builder.addCase(fetchLaunches.rejected, (state, action) => {
      state.loading = false;
      state.launches = [];
      state.error = action.error.message || 'Cannot fetch data';
    });
  }
});

export default launchSlice.reducer;
