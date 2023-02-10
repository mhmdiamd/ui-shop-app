import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('getAllCategories', async () => {
  const response = await axios.get('http://localhost:3001/api/v1/categories');
  return response;
});

export const categoriesSlice = createSlice({
  name: 'categoires',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = 'loading';
    },
    [fetchCategories.fulfilled]: (state, action) => {
      (state.loading = 'succeded'), (state.data = action.payload.data);
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = 'failed';
    },
  },
});

export default categoriesSlice.reducer;

