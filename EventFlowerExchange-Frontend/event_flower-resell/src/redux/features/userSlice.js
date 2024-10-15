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

        updateUser: (state, action) => {
            return { ...state, ...action.payload }; 
        },
    },
});

// export const logoutUser = () => async (dispatch) => {
//     try {
//         const token = localStorage.getItem("token");

//         if (token) {
//             // Gửi request lên API /auth/logout
//             const response = await api.post("/auth/logout", { token });

//             if (response.status === 200) {
//                 // Xóa token khỏi localStorage
//                 localStorage.removeItem("token");

//                 // Dispatch action để cập nhật state
//                 dispatch(logout());

//                 console.log("Đăng xuất thành công");
//             }
//         }
//     } catch (error) {
//         console.log("Đăng xuất thất bại", error);
//     }
// };

// export const updateUserProfile = (userId, userData) => async (dispatch) => {
//     try {
//         const token = localStorage.getItem("token"); // Lấy token từ localStorage
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${token}`, // Thêm token vào headers nếu cần
//                 "Content-Type": "application/json",
//             },
//         };

//         const response = await api.put(`/users/${userId}`, userData, config); // Gọi API PUT để update user

//         if (response.status === 200) {
//             // Dispatch action updateUser để cập nhật thông tin người dùng trong Redux
//             dispatch(updateUser(response.data));
//             console.log("Cập nhật thông tin thành công");
//         }
//     } catch (error) {
//         console.error("Cập nhật thông tin thất bại", error);
//     }
// };

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;