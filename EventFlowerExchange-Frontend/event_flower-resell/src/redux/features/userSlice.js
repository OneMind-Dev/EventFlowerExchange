import { createSlice } from "@reduxjs/toolkit";
import api from "../../components/config/axios";

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

export const logoutUser = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");

        if (token) {
            // Gửi request lên API /auth/logout
            const response = await api.post("/auth/logout", { token });

            if (response.status === 200) {
                // Xóa token khỏi localStorage
                localStorage.removeItem("token");

                // Dispatch action để cập nhật state
                dispatch(logout());

                console.log("Đăng xuất thành công");
            }
        }
    } catch (error) {
        console.log("Đăng xuất thất bại", error);
    }
};

export const { login, logout, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;