import { apiSlice } from "../../app/api/authApi";

const sellerApi = apiSlice.injectEndpoints({
  endpoints:builder => ({
    updateSeller : builder.mutation({
      query:({id, data}) =>({
        url: `sellers/${id}`,
        method: 'PUT',
        body: data
      })
    })
  })
})

export const { useUpdateSellerMutation } = sellerApi