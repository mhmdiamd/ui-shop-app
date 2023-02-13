import { apiSlice } from '../../app/api/authApi';

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrderByIdCustomer: builder.query({
      query: (data) => {
        if (data.status) {
          return `orders/customers/${data.id}?status=${data.status}`;
        }
        return `orders/customers/${data?.id}`;
      },
      transformResponse: (response, meta, arg) => response.data,
      providesTags: (result, error, arg) => (result ? [...result.map((data) => ({ type: 'Order', data }))] : ['Order']),
    }),
    updateOrderById: builder.mutation({
      query: (data) => ({
        url: 'orders',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Order'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: 'orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdCustomerQuery, useUpdateOrderByIdMutation } = orderApi;
