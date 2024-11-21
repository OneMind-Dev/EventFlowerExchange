import React from 'react'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Button, Popconfirm, Image } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { toast } from "react-toastify";
import api from "../../components/config/axios";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { logout, login } from "../../redux/features/userSlice";
import "../userProfile/userInfo/userInfo.css";

function order() {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const user = useSelector((store) => store.user);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64Image = reader.result;
                setAvatarUrl(base64Image); // Update local state with new avatar URL
                sessionStorage.setItem("userAvatar", base64Image); // Save to session storage

                // Dispatch custom event to notify Header
                window.dispatchEvent(new Event("avatarUpdated"));

                try {
                    const response = await api.put(`/users/${user.userId}`, {
                        avatar: base64Image,
                    });
                    dispatch(login(response.data)); // Update user info in global state
                    toast.success("Ảnh đại diện đã được cập nhật thành công!");
                } catch (error) {
                    console.error("Error updating avatar:", error);
                    toast.error("Cập nhật ảnh đại diện thất bại");
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to trigger the file input click
    const triggerFileInput = () => {
        document.getElementById("fileInput").click();
    };

    const fetchOrders = async () => {
        try {
            const response = await api.get(`/order/${user.userId}`);
            console.log(response.data); // Kiểm tra dữ liệu trả về

            // Trích xuất mảng "result" từ đối tượng trả về
            if (response.data && Array.isArray(response.data.result)) {
                setOrders(response.data.result); // Gán mảng "result" vào state
            } else {
                console.error("Dữ liệu trả về không đúng định dạng:", response.data);
                setOrders([]); // Gán mảng trống nếu dữ liệu không hợp lệ
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setOrders([]); // Gán mảng trống khi lỗi xảy ra
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user.userId]);

    // Cột hiển thị cho bảng
    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "orderId",
            key: "orderId",
        },
        {
            title: "Ngày đặt hàng",
            dataIndex: "orderDate",
            key: "orderDate",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (price) => `${price.toLocaleString()} VNĐ`, // Định dạng tiền tệ
        },
        {
            title: "Thanh toán",
            dataIndex: "method",
            key: "method",
            render: (method) => {
                switch (method) {
                    case "CASH":
                        return "Tiền mặt";
                    case "vnpay":
                        return "Đang xử lý";
                    default:
                        return "vnpay";
                }
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (status) => {
                switch (status) {
                    case "SUCCESS":
                        return "Hoàn thành";
                    case "PENDING":
                        return "Đang xử lý";
                    default:
                        return status;
                }
            },
        },
        {
            title: "Hành động",
            key: "actions",
            render: (record) => (
                <Button type="link" onClick={() => navigate(`/orders/orderDetails/${record.orderId}`)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Header />
            <div className="wrapper">
                <div className="background">
                    <div className="user_container">
                        <div className="user_infor">
                            {avatarUrl ? (
                                <Image src={avatarUrl} alt="User Avatar" className="user_avatar" />
                            ) : (
                                <FaCircleUser className="user_icon" />
                            )}
                            <a className="username" onClick={triggerFileInput}>
                                Thay đổi ảnh
                            </a>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="user_interact">
                            <p onClick={() => navigate("/profile/userinfo")}>
                                Hồ sơ cá nhân
                            </p>
                            {user.role?.includes("ADMIN") && (
                                <>
                                    <p onClick={() => navigate("/dashboard")}>Bảng thống kê</p>
                                    <p onClick={() => navigate("/manager")}>Danh sách người dùng</p>
                                    <p onClick={() => navigate("/approve")}>Danh sách đăng ký seller</p>
                                </>
                            )}
                            <p
                                onClick={() => navigate("/profile/changePassword")}
                            >
                                Thay đổi mật khẩu
                            </p>

                            {user.role && user.role.includes("SELLER") && (
                                <p onClick={() => navigate("/profile/sellermanage")}>
                                    Quản lý sự kiện
                                </p>
                            )}
                            <h3 className="privateInfor">
                                <p onClick={() => navigate("/orders")}>Đơn hàng</p>
                            </h3>
                            <Popconfirm
                                onConfirm={() => dispatch(logout())}
                                title="Bạn muốn đăng xuất ?"
                            >
                                <Button type="primary" danger>
                                    ĐĂNG XUẤT
                                </Button>
                            </Popconfirm>
                        </div>
                    </div>
                    <div className="infor_container">
                        <h1>Đơn hàng của bạn</h1>
                        <Table
                            dataSource={orders}
                            columns={columns}
                            rowKey="orderId"
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default order
