import { baseApi } from "@/redux/baseApi";
import { authToken } from "@/utils/authToken";


export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        students: builder.query({
            query: () => ({
                url: `/students`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
        }),

    })
})


export const {
    useStudentsQuery
} = studentApi;