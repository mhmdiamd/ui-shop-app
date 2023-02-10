import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const fetchCategories = createAsyncThunk('getCategories', async (data) => {
  const response = await axios.get(`http://localhost:3001/api/v1/categories`);
  return response;
});

export const createCategories = createAsyncThunk('createCategory', async (data) => {
  const response = await axios.post(`http://localhost:3001/api/v1/categories`, data);

  return data;
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      console.log(state.data.data);
    });
  },
});

export default categoriesSlice.reducer;
