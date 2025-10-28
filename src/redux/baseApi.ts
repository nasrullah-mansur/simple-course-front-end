import axiosBaseQuery from "@/redux/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";


const tagTypes: string[] = [
    "COURSE",
    "MY_COURSE"
]

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes,
    endpoints: () => ({})
});



