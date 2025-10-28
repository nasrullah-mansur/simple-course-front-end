import { baseApi } from "@/redux/baseApi";


export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/register",
                method: "POST",
                data,
            }),
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                data,
            }),
        }),
        logout: builder.mutation({
            query: (token) => ({
                url: "/logout",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),
        userInfo: builder.query({
            query: (token) => ({
                url: "/me",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
        }),

    })
})


export const {
    useRegisterMutation,
    useLoginMutation,
    useUserInfoQuery,
    useLogoutMutation
} = authApi;