import { apiSlice } from '../../app/api/authApi';

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCart: builder.query({
      query: () => 'carts',
      transformResponse: (response, meta, args) => response.data,
      providesTags: (result, error, arg) => (result ? [...result.map((data) => ({ type: 'Cart', data }))] : ['Cart']),
    }),
    getCartByIdCustomer: builder.query({
      query: (id) => `carts/${id}/customers`,
      transformResponse: (response, meta, args) => response.data,
      providesTags: (result, error, arg) => (result ? [...result.map((data) => ({ type: 'Cart', data }))] : ['Cart']),
    }),
    createCart: builder.mutation({
      query: (data) => {
        return {
          url: 'carts',
          method: 'POST',
          body: data,
        };
      },
    }),

    // Update cart by id
    updateCart: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `carts/${data.id}`,
          method: 'PUT',
          body: { quantity: data.quantity },
        };
      },

      invalidatesTags: ['Cart'],
    }),

    // Delete Cart by Id
    deleteCartById: builder.mutation({
      query: (id) => {
        return {
          url: `carts/${id}`,
          method: 'DELETE',
        };
      },

      invalidatesTags: ['Cart'],
    }),

    // Delete Cart by id customer
    deleteCartByIdCustomer: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `carts/customers/${id}`,
          method: 'DELETE',
        };
      },

      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useCreateCartMutation, useGetAllCartQuery, useGetCartByIdCustomerQuery, useDeleteCartByIdMutation, useUpdateCartMutation, useDeleteCartByIdCustomerMutation } = cartApi;
