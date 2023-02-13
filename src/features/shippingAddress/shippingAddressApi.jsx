import { apiSlice } from '../../app/api/authApi';

export const shippingAddressApi = apiSlice.injectEndpoints({
  tagTypes: ['ShippingAddress'],

  endpoints: (builder) => ({
    // Get All Product
    // getAllProduct: builder.query({
    //   query: (query) => {
    //     if (query) {
    //       return `products?${query}`;
    //     } else {
    //       return 'products?sortBy=created_at&sort=desc&limit=10';
    //     }
    //   },
    //   transformResponse: (response, meta, arg) => response,
    //   providesTags: (result, error, arg) => (result ? [...result.data.map((data) => ({ type: 'Product', data }))] : ['Product']),
    // }),

    // Get All Product
    getShippingAddressByIdCustomer: builder.query({
      query: (id) => `shipping-address/customers/${id}`,
      transformResponse: (response, meta, arg) => {
        const primaryAddress = response?.data?.filter((data) => data.status == 1);
        return { ...response, primaryAddress: primaryAddress[0] };
      },
      providesTags: (result, error, arg) => (result ? [...result.data.map((data) => ({ type: 'ShippingAddress', data }))] : ['ShippingAddress']),
    }),

    // Update shipping address by id
    updateShippingAddressById: builder.mutation({
      query: (data) => {
        const { id, body } = data;
        return {
          url: `shipping-address/${id}`,
          method: 'PUT',
          body,
        };
      },
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      invalidatesTags: ['ShippingAddress'],
    }),

    // Add ShippingAddress
    createShippingAddressCustomer: builder.mutation({
      query: (body) => {
        return {
          url: 'shipping-address',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['ShippingAddress'],
    }),

    // Delete Product
    deleteShippingAddressById: builder.mutation({
      query: (id) => ({
        url: `shipping-address/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      invalidatesTags: ['ShippingAddress'],
    }),

    // Update Shipping Address By Id
  }),
});

export const { useGetShippingAddressByIdCustomerQuery, useCreateShippingAddressCustomerMutation, useUpdateShippingAddressByIdMutation, useDeleteShippingAddressByIdMutation } = shippingAddressApi;
