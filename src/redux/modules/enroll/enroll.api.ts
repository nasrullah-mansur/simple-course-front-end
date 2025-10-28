import { baseApi } from "@/redux/baseApi";
import { authToken } from "@/utils/authToken";


export const enrollApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        enroll: builder.mutation({
            query: (id) => ({
                url: `/enroll/${id}`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
            invalidatesTags: ["MY_COURSE", "DASHBOARD"],
        }),

    })
})


export const {
    useEnrollMutation
} = enrollApi;