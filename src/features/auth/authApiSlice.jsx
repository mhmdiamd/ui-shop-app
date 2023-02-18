import { apiSlice } from '../../app/api/authApi';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    findMe: builder.query({
      query: () => ({
        url: '/me',
      }),
      transformResponse: function (response, meta, args) {
        return response.data;
      },
    }),
    sellerRegister: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/sellers/register',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response, meta, args) => response,
    }),
    sellerLogin: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/sellers/login',
          method: 'POST',
          body: credentials,
        };
      },
      transformResponse: (response, meta, args) => response,
    }),
    customerLogin: builder.mutation({
      query: (credentials) => {
        return {
          url: '/auth/customers/login',
          method: 'POST',
          body: credentials,
        };
      },
      transformResponse: (response, meta, args) => response,
    }),
    customerRegister: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/customers/register',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response, meta, args) => response,
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Cart'],
      transformResponse: (response, meta, args) => response,
    }),
  }),
});

export const { useSellerLoginMutation, useUserLogoutMutation, useFindMeQuery, useCustomerLoginMutation, useCustomerRegisterMutation, useSellerRegisterMutation } = authApiSlice;
