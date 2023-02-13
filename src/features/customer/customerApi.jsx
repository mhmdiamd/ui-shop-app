import { apiSlice } from "../../app/api/authApi";

const customerApi = apiSlice.injectEndpoints({
  endpoints:builder => ({
    updateCustomer : builder.mutation({
      query:({id, data}) =>({
        url: `customers/${id}`,
        method: 'PUT',
        body: data
      })
    })
  })
})