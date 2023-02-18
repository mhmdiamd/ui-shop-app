import { apiSlice } from '../../app/api/authApi';

export const productApi = apiSlice.injectEndpoints({
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // Get All Product
    getAllProduct: builder.query({
      query: (query) => {
        if (query) {
          return `products?${query}`;
        } else {
          return 'products?sortBy=created_at&sort=desc&limit=10';
        }
      },
      transformResponse: (response, meta, arg) => response,
      providesTags: (result, error, arg) => (result ? [...result.data.map((data) => ({ type: 'Product', data }))] : ['Product']),
    }),

    // Get Product By Id
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ['Product'],
      // (result, error, arg) => (result ? [...result.data.map((data) => ({ type: 'Product', data }))] : ['Product']),
    }),

    // Get Product By Id Seller
    getProductByIdSeller: builder.query({
      query: (id) => `products/${id}/sellers`,

      transformResponse: (response, meta, arg) => response.data,
      providesTags: (result, error, arg) => (result ? [...result.map((data) => ({ type: 'Product', data }))] : ['Product']),
    }),

    // Add Product
    createProduct: builder.mutation({
      query: (body) => {
        console.log(body);
        return {
          url: 'products',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response, meta, arg) => response.data,
      invalidatesTags: ['Product'],
    }),

    // Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      invalidatesTags: ['Product'],
    }),

    // Delete Product
    updateProduct: builder.mutation({
      query: (data) => {
        const { id, body } = data;
        return {
          url: `products/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Product'],
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetAllProductQuery, useGetProductByIdQuery, useGetProductByIdSellerQuery, useCreateProductMutation, useDeleteProductMutation, useUpdateProductMutation } = productApi;
