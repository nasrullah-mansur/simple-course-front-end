import { baseApi } from "@/redux/baseApi";
import { authToken } from "@/utils/authToken";


export const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        courses: builder.query({
            query: (page) => ({
                url: `/courses?page=${page}`,
                method: "GET",
            }),
            providesTags: ["COURSE"]
        }),

        courseView: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "GET",
            }),
        }),

        myCourse: builder.query({
            query: () => ({
                url: `my-courses`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
            providesTags: ["MY_COURSE"]
        }),

        createCourse: builder.mutation({
            query: (data) => ({
                url: `/courses`,
                method: "POST",
                data,
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
            invalidatesTags: ["COURSE"],
        }),

        updateCourse: builder.mutation({
            query: ({ formData, id }) => ({
                url: `/courses/${id}`,
                method: "POST",
                data: formData,
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
            invalidatesTags: ["COURSE"],
        }),

        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authToken.getTokenFromLocalStorage()}`
                },
            }),
            invalidatesTags: ["COURSE"],
        }),


    })
})


export const {
    useCoursesQuery,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useCourseViewQuery,
    useUpdateCourseMutation,
    useMyCourseQuery
} = courseApi;