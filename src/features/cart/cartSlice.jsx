import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useGetAllCartQuery, useGetCartByIdCustomerQuery } from './cartApi';

export const getCarts = createAsyncThunk(`carts`, async (id, { rejectWithValue }) => {
  const { data: carts, isError, error } = useGetCartByIdCustomerQuery(id);
  if (isError) {
    return rejectWithValue(error);
  }

  return carts;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartLength: 0,
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarts.fulfilled, (state, { payload }) => {
      state.cartCount = payload.length;
    });
    builder.addCase(getCarts.rejected, (state, { payload }) => {
      state.error = payload;
    });
    builder.addCase(getCarts.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export default cartSlice.actions;
