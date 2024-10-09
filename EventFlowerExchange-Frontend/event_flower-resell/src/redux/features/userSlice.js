import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        login: (state, actions) => {
            state = actions.payload;
            return state;
        },

        logout: () => {
            return null;
        },

        // Action mới để cập nhật thông tin người dùng
        updateUserInfo: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;