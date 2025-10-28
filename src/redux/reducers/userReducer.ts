import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: "",
    name: "",
    email: "",
    role: "",
}

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        }
    }
});

export const { loginUser } = userReducer.actions;
export default userReducer.reducer;
