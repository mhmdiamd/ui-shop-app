import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../../app/api/authApi';

export const categoryApi = apiSlice.injectEndpoints({
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: 'categories?limit=20',
      }),
      providesTags: (result, error, arg) => {
        return result ? [...result.map((data) => ({ type: 'Categories', data })), 'Categories'] : ['Categories'];
      },
      transformResponse: (response, meta, arg) => response.data,
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: 'categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi;
