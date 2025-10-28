import { baseApi } from "@/redux/baseApi";
import { authToken } from "@/utils/authToken";


export const enrollApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        dashboard: builder.query({
            query: () => ({
                url: `/dashboard`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
            providesTags: ["DASHBOARD"]
        }),

    })
})


export const {
    useDashboardQuery,
} = enrollApi;