import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../components/config/axios";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function orderDetails() {
    const { orderId } = useParams(); // Lấy orderId từ URL
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await api.get(`/order/detail/${orderId}`);
                setOrderDetails(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div>Đang tải...</div>; // Hiển thị khi dữ liệu đang được tải
    }

    return (
        <>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Chi tiết đơn hàng #{orderId}</h1>
                {orderDetails.length > 0 ? (
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>ID Chi tiết</th>
                                <th>Sự kiện</th>
                                <th>Tên hoa</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.map((detail) => (
                                <tr key={detail.orderDetailId}>
                                    <td>{detail.orderDetailId}</td>
                                    <td>{detail.eventName}</td>
                                    <td>{detail.flowerName}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.price.toLocaleString()} VNĐ</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Không có dữ liệu chi tiết cho đơn hàng này.</div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default orderDetails
