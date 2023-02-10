import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useGetAllProductQuery } from './productApi';

export const getProductPagination = createAsyncThunk('products', async (data, { rejectWithValue }) => {
  const { currentPage, sort = 'created_at', sortBy = 'asc' } = data;
  try {
    const { data: products, isLoading, error } = useGetAllProductQuery(`page=${page}&sort=${sort}&sortBy=${sortBy}`);
    return products;
  } catch (err) {
    console.log(err);
    console.log(err);
    return rejectWithValue(err.message);
  }
});

const initialState = {
  products: [],
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducer: (builder) => {
    builder.addCase(getProductPagination.fulfilled, (state, { payload }) => {
      state.products = payload;
    });
    builder.addCase(getProductPagination.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      } else {
        state.error = action.error;
      }
    });
  },
});

export default productSlice.reducer;
